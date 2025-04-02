# PsypresUI Quick Start Guide

This guide explains how to quickly get started with PsypresUI component library development.

## For Windows Users

We've created easy-to-use scripts to get you up and running quickly:

### First-Time Setup

For a complete first-time setup, simply double-click:

```
setup.bat
```

This will:

1. Check if Node.js and pnpm are installed
2. Clean up any existing installation
3. Install all dependencies
4. Build all packages
5. Ask if you want to start the documentation site

### Quick Start (Recommended)

For the most reliable development experience, use:

```
start-dev.bat
```

This improved script will:

1. Install all dependencies
2. Build each package in the correct order with error checking
3. Start the documentation site

### Fixing Build Issues

If you encounter build errors or package resolution issues, run:

```
fix-build.bat
```

This specialized troubleshooting script will:

1. Clean all dist directories
2. Rebuild packages one by one in the correct order
3. Check for errors at each step

## Using npm Scripts

If you prefer using npm scripts directly, we've added some convenient commands:

### Complete Setup and Start

```bash
pnpm setup-and-start
```

This single command:

1. Installs dependencies
2. Builds all packages
3. Starts the documentation site

### Clean Up Installation

We now have more granular cleanup commands:

```bash
# Clean everything
pnpm cleanup
# or
pnpm clean:all

# Clean specific packages
pnpm clean:shared
pnpm clean:react
pnpm clean:vue
pnpm clean:docs
```

These commands safely remove node_modules and dist directories without path issues.

### Individual Steps

```bash
# Install dependencies
pnpm install

# Build packages in the correct order
pnpm build:shared
pnpm build:react
pnpm build:vue

# Or build all at once
pnpm build:all

# Start the documentation site
pnpm dev:docs
```

## Troubleshooting Common Issues

### Failed to resolve entry for package "@psypres/react"

If you see this error, it means Vite can't find the built files for one of the packages. To fix:

1. Make sure to build packages in the correct order:

   ```bash
   pnpm build:shared
   pnpm build:react
   pnpm build:vue
   ```

2. Or run the troubleshooting script:

   ```
   fix-build.bat
   ```

3. Or use our most reliable script:
   ```
   start-dev.bat
   ```

### Illegal characters in path

If you see this error with rimraf:

1. Use our improved cleanup scripts instead:

   ```bash
   pnpm clean:all
   ```

2. Or run the commands for specific packages:
   ```bash
   pnpm clean:shared
   pnpm clean:react
   pnpm clean:vue
   ```

### Other common issues:

1. Try running a complete cleanup and reinstall:

   ```bash
   pnpm clean:all
   pnpm install
   pnpm build:all
   pnpm dev:docs
   ```

2. Make sure all local package dependencies use `workspace:*` in their package.json files.
