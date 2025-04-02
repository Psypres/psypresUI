# PsypresUI

A cross-platform UI component library for building modern, accessible user interfaces. PsypresUI follows a framework-agnostic approach with shared UI components and framework-specific wrappers for React and Vue.

## Components

The library includes the following components:

- **Button**: Customizable button component with different variants and sizes
- **Header**: Navigation header with customizable title and navigation items
- **ThemeProvider**: Provider component for theme context and dark/light mode switching
- **ThemeToggle**: Toggle component for switching between light and dark themes

## Architecture

PsypresUI follows a monorepo architecture with the following packages:

- **@psypres/ui**: Core package with framework-agnostic web components
- **@psypres/react**: React wrappers for PsypresUI components
- **@psypres/vue**: Vue wrappers for PsypresUI components
- **@psypres/docs**: Documentation site built with React
- **@psypres/docs-vue**: Documentation site built with Vue

## Usage

### React

```jsx
import {
  PsypresButton,
  PsypresHeader,
  PsypresThemeProvider,
  PsypresThemeToggle,
} from "@psypres/react";

function App() {
  return (
    <PsypresThemeProvider>
      <div className="app">
        <PsypresHeader title="My App" />
        <div className="theme-control">
          <PsypresThemeToggle size="medium" />
        </div>
        <main>
          <PsypresButton variant="primary">Click Me</PsypresButton>
        </main>
      </div>
    </PsypresThemeProvider>
  );
}
```

### Vue

```vue
<template>
  <PsypresThemeProvider>
    <div class="app">
      <PsypresHeader title="My App" />
      <div class="theme-control">
        <PsypresThemeToggle size="medium" />
      </div>
      <main>
        <PsypresButton variant="primary">Click Me</PsypresButton>
      </main>
    </div>
  </PsypresThemeProvider>
</template>

<script>
import {
  PsypresButton,
  PsypresHeader,
  PsypresThemeProvider,
  PsypresThemeToggle,
} from "@psypres/vue";

export default {
  components: {
    PsypresButton,
    PsypresHeader,
    PsypresThemeProvider,
    PsypresThemeToggle,
  },
};
</script>
```

## Theme Support

PsypresUI supports light and dark themes through the `ThemeProvider` component. The theme provider sets a `data-theme` attribute on the root element that can be used for CSS theme customization.

Example CSS variables in your application:

```css
:root {
  /* Light theme variables */
  --bg-color: #ffffff;
  --text-color: #333333;
}

[data-theme="dark"] {
  /* Dark theme variables */
  --bg-color: #1a202c;
  --text-color: #e2e8f0;
}
```

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`

## License

MIT
