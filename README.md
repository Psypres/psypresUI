# PsypresUI - Cross-Platform UI Component Library

A modern, customizable UI component library that works across multiple frontend frameworks.

## Features

- 🚀 Cross-framework compatibility (React, Vue, Nuxt)
- 📱 Support for web and native platforms
- 🔄 Shared core functionality
- 🎨 Consistent styling and behavior
- 📦 Easy to import and use

## Project Structure

```
packages/
├── core/          # Core utilities and functions
├── shared-ui/     # Framework-agnostic UI components
├── react/         # React-specific implementations
├── vue/           # Vue-specific implementations
├── nuxt/          # Nuxt-specific implementations
└── native/        # React Native implementations
```

## Getting Started

### Installation

```bash
# Install the React components
npm install @psypres/react

# Install the Vue components
npm install @psypres/vue

# Install the Nuxt components
npm install @psypres/nuxt

# Install the React Native components
npm install @psypres/native
```

### Usage

#### React

```jsx
import { Button } from "@psypres/react";

function App() {
  return <Button onClick={() => alert("Clicked!")}>Click Me</Button>;
}
```

#### Vue

```vue
<template>
  <PsypresButton @click="handleClick"> Click Me </PsypresButton>
</template>

<script>
import { PsypresButton } from "@psypres/vue";

export default {
  components: {
    PsypresButton,
  },
  methods: {
    handleClick() {
      alert("Clicked!");
    },
  },
};
</script>
```

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build
```

### Adding New Components

1. First, add the component to the appropriate package
2. Update the package's index.js to export the new component
3. Build the package: `pnpm run build --filter=@psypres/[package-name]`

## License

MIT
