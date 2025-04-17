import * as fs from 'fs';
import * as path from 'path';
import { parse as parseJsonc } from 'jsonc-parser';

/**
 * Recursively merges JSON objects
 */
function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (
        key !== 'extends' &&
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof result[key] === 'object' &&
        result[key] !== null &&
        !Array.isArray(result[key])
      ) {
        // Deep merge objects
        result[key] = deepMerge(result[key], source[key]);
      } else if (key === 'extends') {
        // Skip extends property
        continue;
      } else {
        // Replace or add value
        result[key] = source[key];
      }
    }
  }

  return result;
}

/**
 * Loads and processes a JSON config file
 */
function loadConfig(filePath: string, basePath: string): Record<string, any> {
  // Resolve the absolute path
  const absolutePath = path.resolve(basePath, filePath);
  const configDir = path.dirname(absolutePath);
  
  // Read and parse the file as JSONC (JSON with comments)
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const config = parseJsonc(content);
  
  // Process extends
  if (config.extends) {
    let mergedConfig = {};
    
    // Handle both string and array extends
    const extensions = Array.isArray(config.extends) 
      ? config.extends 
      : [config.extends];
    
    // Load and merge each extended config
    for (const ext of extensions) {
      const extendedConfig = loadConfig(ext, configDir);
      mergedConfig = deepMerge(mergedConfig, extendedConfig);
    }
    
    // Merge the current config on top of the extended ones
    const { extends: _, ...configWithoutExtends } = config;
    mergedConfig = deepMerge(mergedConfig, configWithoutExtends);
    
    return mergedConfig;
  }
  
  return config;
}

/**
 * Process variables in config values
 */
function processConfigVariables(config: Record<string, any>, configDir: string): Record<string, any> {
  const result = { ...config };
  
  // Process the object recursively
  function processValue(obj: any): any {
    if (typeof obj === 'string') {
      // Replace ${configDir} with the actual path
      return obj.replace(/\${configDir}/g, configDir);
    } else if (Array.isArray(obj)) {
      return obj.map(processValue);
    } else if (typeof obj === 'object' && obj !== null) {
      const processed: Record<string, any> = {};
      for (const key in obj) {
        processed[key] = processValue(obj[key]);
      }
      return processed;
    }
    return obj;
  }
  
  return processValue(result);
}

// Main function
function main() {
  const sourceConfigPath = 'es/_app.json';
  const outputConfigPath = 'es/app.json';
  
  // Get absolute paths
  const cwd = process.cwd();
  const absoluteSourcePath = path.resolve(cwd, sourceConfigPath);
  const sourceDir = path.dirname(absoluteSourcePath);
  
  // Load and process the config
  const mergedConfig = loadConfig(sourceConfigPath, cwd);
  
  // Process variables like ${configDir}
  const processedConfig = processConfigVariables(mergedConfig, sourceDir);
  
  // Write the output
  const outputPath = path.resolve(cwd, outputConfigPath);
  fs.writeFileSync(outputPath, JSON.stringify(processedConfig, null, 4));
  
  console.log(`Merged config written to ${outputConfigPath}`);
}

main();