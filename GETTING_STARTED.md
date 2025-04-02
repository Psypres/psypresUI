# Getting Started with PsypresUI Development

This guide will walk you through running and testing your PsypresUI component library during development.

## Running the Project

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [pnpm](https://pnpm.io/installation) (v7+ recommended)

### Installation

1. Install all dependencies:

```bash
pnpm install
```

### Development Workflow

We've set up several helpful scripts to make development easier:

#### Quick Start

To build all packages and launch the documentation site in one command:

```bash
pnpm start
```

This will:

1. Build the shared UI components
2. Build the React package
3. Build the Vue package
4. Start the documentation site in development mode

The documentation site will open in your browser at http://localhost:3000, showing all your components in action.

#### Building Individual Packages

If you only want to build specific packages:

```bash
# Build only the shared UI components
pnpm build:shared

# Build only the React components
pnpm build:react

# Build only the Vue components
pnpm build:vue

# Build all packages
pnpm build:all
```

#### Running the Documentation Site

To run only the documentation site (without rebuilding the components):

```bash
pnpm dev:docs
```

## Developing New Components

### Workflow

1. Create the base web component in `packages/shared-ui/src/`
2. Export it in `packages/shared-ui/src/index.js`
3. Create framework wrappers in `packages/react/src/` and `packages/vue/src/components/`
4. Export the wrappers in their respective index files
5. Add examples to the documentation site

### Testing Your Components

As you develop, use the documentation site to test your components. The site will hot reload when you make changes.

When adding a new component:

1. Build the shared UI package: `pnpm build:shared`
2. Build the framework packages: `pnpm build:react` and/or `pnpm build:vue`
3. Refresh the documentation site or restart it

## Troubleshooting

### Common Issues

- **Component not showing up**: Make sure it's properly exported in all index files
- **Styling issues**: Check the shadow DOM styles in your web component
- **Build errors**: Ensure all dependencies are installed and imports are correct

### Development Tips

- Use browser DevTools to inspect the shadow DOM of your components
- Check the console for any errors
- If changes aren't appearing, try a hard refresh or restart the dev server

## Next Steps

Once you've tested your components and are satisfied with them, you can:

1. Add more components to expand your library
2. Update the documentation with more examples
3. Publish your packages to npm using `pnpm publish-packages`
