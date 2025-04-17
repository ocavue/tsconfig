import prettier from "prettier";

const js = String.raw;

function genCompilerOptionsEnvironment(environment: "es" | "dom"): string {
  switch (environment) {
    case "es":
      return js`
        "lib": [
          "ESNext",
          "ESNext.AsyncIterable",
        ],
      `;
    case "dom":
      return js`
        "lib": [
          "ESNext",
          "ESNext.AsyncIterable",
          "DOM",
          "DOM.Iterable",
          "DOM.AsyncIterable",
        ],
      `;
    default:
      throw new Error(`Invalid environment: ${environment}`);
  }
}

function genCompilerOptionsModule(module: "node" | "bundler"): string {
  switch (module) {
    case "node":
      return js`
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
      `;
    case "bundler":
      return js`
        "module": "preserve",
        "moduleResolution": "bundler",
        "emitDeclarationOnly": true,
      `;
  }
}

function genCompilerOptionsRootDir(include: "all" | "root" | "src"): string {
  let configDir = "${configDir}";

  switch (include) {
    case "all":
      return "";
    case "root":
      return "";
    case "src":
      return js`
        // Set the root directory to src/ so that the output file structure
        // in dist/ matches the file structure in src/.
        "rootDir": "${configDir}/src",
      `;
  }
}

function getCompilerOptionsOutDir(
  environment: "es" | "dom",
  module: "node" | "bundler",
  include: "all" | "root" | "src"
): string {
  let configDir = "${configDir}";
  if (include === "src") {
    return js`
      // Set the output directory to dist/.
      "outDir": "${configDir}/dist",
      // By default, ._* paths are ignored by npm publish.
      "tsBuildInfoFile": "${configDir}/dist/._cache/tsconfig_${environment}_${module}_${include}/tsconfig.tsbuildinfo",
    `;
  } else {
    return js`
      // Set the output directory to a directory that would be ignored by almost all tools.
      "outDir": "${configDir}/node_modules/.cache/tsconfig_${environment}_${module}_${include}/out"
    `;
  }
}

function genCompilerOptions(
  environment: "es" | "dom",
  module: "node" | "bundler",
  include: "all" | "root" | "src"
): string {
  return js`
    "compilerOptions": {
      "target": "ES2020",

      // Enable all strict type-checking options.
      "strict": true,
      // Disable unused local variables.
      "noUnusedLocals": true,
      // Force you to use "override" keyword when overriding a method.
      "noImplicitOverride": true,
      // Disable fallthrough cases in switch statements.
      "noFallthroughCasesInSwitch": true,
      // Emit additional JavaScript to ease support for importing CommonJS
      // modules. This is necessary for some libraries with CommonJS/AMD/UMD
      // modules.
      "esModuleInterop": true,
      // Skip type checking all .d.ts files. This improves performance and
      // reduces the number of errors that you cannot fix directly.
      "skipLibCheck": true,
      // Allow JavaScript files to be included in the project.
      "allowJs": true,
      // Allow JSON files to be imported as modules.
      "resolveJsonModule": true,
      // Force TypeScript to consider all files as modules. This helps to avoid
      // ['cannot redeclare block-scoped variable'](https://www.totaltypescript.com/cannot-redeclare-block-scoped-variable)
      // errors.
      "moduleDetection": "force",
      // Prevents a few TS features which are unsafe when treating modules as
      // isolated files.
      "isolatedModules": true,
      // Force you to use import type and export type
      "verbatimModuleSyntax": true,
      // Ensure that casing is correct in imports.
      "forceConsistentCasingInFileNames": true,
      // Allow TypeScript to cache build information and skip compilation
      // when no changes are detected.
      "composite": true,

      ${genCompilerOptionsEnvironment(environment)}

      ${genCompilerOptionsModule(module)}

      ${genCompilerOptionsRootDir(include)}

      ${getCompilerOptionsOutDir(environment, module, include)}
    },
  `;
}

function genInclude(include: "all" | "root" | "src"): string {
  switch (include) {
    case "all":
      return '"include": ["${configDir}/**/*"],';
    case "root":
      return '"include": ["${configDir}/*"],';
    case "src":
      return '"include": ["${configDir}/src/**/*"],';
  }
}

function genConfig(
  environment: "es" | "dom",
  module: "node" | "bundler",
  include: "all" | "root" | "src"
): string {
  return js`
    {
      "$schema": "https://json.schemastore.org/tsconfig",
      ${genCompilerOptions(environment, module, include)}
      ${genInclude(include)}
    }
  `;
}

async function writeConfig(
  environment: "es" | "dom",
  module: "node" | "bundler",
  include: "all" | "root" | "src",
  filePath: string
) {
  let code = genConfig(environment, module, include);

  try {
    code = await prettier.format(code, {
      parser: "json",
    });
  } catch (error) {
    console.error(
      `Unable to format the code with prettier:\n===== code =====\n${code}\n===== error =====\n${error}`,
      { cause: error }
    );
  }

  await Bun.write(filePath, code);
}

async function main() {
  await writeConfig("es", "bundler", "all", "es/app.json");
  await writeConfig("es", "bundler", "src", "es/build-bundler.json");
  await writeConfig("es", "node", "src", "es/build-tsc.json");
  await writeConfig("es", "bundler", "root", "es/root.json");

  await writeConfig("dom", "bundler", "all", "dom/app.json");
  await writeConfig("dom", "bundler", "src", "dom/build-bundler.json");
  await writeConfig("dom", "node", "src", "dom/build-tsc.json");
  await writeConfig("dom", "bundler", "root", "dom/root.json");
}

main();
