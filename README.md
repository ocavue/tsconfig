# @ocavue/tsconfig

[![NPM version](https://img.shields.io/npm/v/@ocavue/tsconfig?color=a1b858&label=)](https://www.npmjs.com/package/@ocavue/tsconfig)

## Installation

```bash
npm install @ocavue/tsconfig
```

## Usage

### Application

If you are building an application, create a `tsconfig.json` in the root of your project.

```
my-app/
├── node_modules/
├── components/
│   └── button.ts
├── pages/
│   └── home.ts
├── eslint.config.js
├── vitest.config.ts
├── package.json
└── tsconfig.json
```

In `tsconfig.json`, add the following content based on your target environment.

```jsonc
// tsconfig.json
{
  // If you're building for the browser:
  "extends": "@ocavue/tsconfig/dom/app.json",

  // If you're building for non-browser environment:
  "extends": "@ocavue/tsconfig/es/app.json"
}
```

### Library

If you are building a library, put all your source code in the `src` directory, and create `tsconfig.json` and `tsconfig.build.json` in the root of your project.

```
my-lib/
├── dist/
│   └── index.js
├── src/
│   └── index.ts
├── eslint.config.js
├── vitest.config.ts
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```

In `tsconfig.json`, add the following content:

```jsonc
// tsconfig.json
{
  "extends": "@ocavue/tsconfig/es/root.json",
  "references": [{ "path": "./tsconfig.build.json" }]
}
```

In `tsconfig.build.json`, add the following content based on your build tool and your target environment.

```jsonc
// tsconfig.build.json
{
  // If you're building for the browser and using a bundler like esbuild, vite, tsup etc:
  "extends": "@ocavue/tsconfig/dom/build-bundler.json",

  // If you're building for the browser and using tsc:
  "extends": "@ocavue/tsconfig/dom/build-tsc.json",

  // If you're building for non-browser environment and using a bundler like esbuild, vite, tsup etc:
  "extends": "@ocavue/tsconfig/es/build-bundler.json",

  // If you're building for non-browser environment and using tsc:
  "extends": "@ocavue/tsconfig/es/build-tsc.json"
}
```

### Monorepo

If you are using a monorepo that might have multiple packages and applications, you should have a file structure like this:

```
my-monorepo/
├── node_modules/
├── packages/
│   └── my-lib/
│       ├── src/
│       ├── dist/
│       ├── vitest.config.ts
│       ├── package.json
│       └── tsconfig.json
├── apps/
│   └── my-app/
│       ├── pages/
│       ├── components/
│       ├── vitest.config.ts
│       ├── package.json
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── eslint.config.js
├── package.json
└── tsconfig.json
```

In the root `tsconfig.json`, add the following content:

```jsonc
// tsconfig.json
{
  "extends": "@ocavue/tsconfig/es/root.json",
  "references": [
    { "path": "./apps/my-app/tsconfig.json" },
    { "path": "./packages/my-lib/tsconfig.json" }
  ]
}
```

Configure each package and application's `tsconfig.json` based on the instructions above.

## Version Requirements

The [`${configDir}`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#the-configdir-template-variable-for-configuration-files) template variable is used so you need to install TypeScript v5.5 or higher.

## License

MIT
