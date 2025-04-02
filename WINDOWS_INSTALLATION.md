# Windows Installation Guide for PsypresUI

Follow these steps to install and run the PsypresUI component library for development on Windows.

## Step 1: Clean Installation

Since you're experiencing dependency issues, let's start with a clean installation. Use these PowerShell commands:

```powershell
# First, remove any node_modules folders and lock files
Remove-Item -Path node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path packages/*/node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path pnpm-lock.yaml -Force -ErrorAction SilentlyContinue

# Now install dependencies using the workspace protocol
pnpm install
```

## Step 2: Build the Components

Once the installation is complete, build the components in the correct order:

```powershell
# Build shared components first
pnpm build:shared

# Then build the framework-specific implementations
pnpm build:react
pnpm build:vue
```

## Step 3: Run the Documentation Site

Now you can start the documentation site to see your components in action:

```powershell
pnpm dev:docs
```

This will start a development server at http://localhost:3000 where you can see and interact with your components.

## Troubleshooting Common Issues

### If you still encounter dependency issues:

1. **Make sure pnpm is using workspaces correctly:**
   Check that your pnpm-workspace.yaml file includes all your packages:

   ```yaml
   packages:
     - packages/*
   ```

2. **Check package references:**
   All local package references should use the `workspace:*` protocol:

   ```json
   "dependencies": {
     "@psypres/shared-ui": "workspace:*"
   }
   ```

3. **If one package has build errors:**
   You can try building it individually with detailed logs:

   ```powershell
   cd packages/shared-ui
   pnpm build --verbose
   ```

4. **Check for circular dependencies:**
   Make sure your packages don't have circular dependencies.

### Alternative Approach: Use npm link

If you're still having trouble, you can try using `npm link` as an alternative:

```powershell
# In the shared-ui package
cd packages/shared-ui
npm link

# In the react package
cd ../react
npm link @psypres/shared-ui

# In the vue package
cd ../vue
npm link @psypres/shared-ui

# In the docs package
cd ../docs
npm link @psypres/react @psypres/vue
```

Then build and run as usual.

## Running the Full Development Environment

For convenience, you can use the `start` script which does everything in one command:

```powershell
pnpm start
```

This builds all packages and starts the documentation site.
