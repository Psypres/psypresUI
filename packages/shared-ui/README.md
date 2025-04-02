# @psypres/ui - Shared UI Components

This package contains the core, framework-agnostic UI components used by the PsypresUI component library. These components are built as web components and can be used directly or wrapped by framework-specific implementations.

## Components

### Button

A customizable button component with different variants and sizes.

**Props:**

- `variant`: 'primary' | 'secondary' | 'success' | 'danger' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `disabled`: boolean (default: false)

**Example:**

```html
<psypres-button variant="primary" size="medium">Click Me</psypres-button>
```

### Header

A navigation header component with customizable title and navigation items.

**Props:**

- `title`: string - The title to display in the header
- `navItems`: Array of { label: string, url: string } - Navigation links

**Example:**

```html
<psypres-header title="My App"></psypres-header>

<!-- With navigation -->
<psypres-header
  title="My App"
  navItems='[{"label":"Home","url":"#home"},{"label":"About","url":"#about"}]'
></psypres-header>
```

### ThemeProvider

A provider component that adds theme support to your application, allowing for easy switching between light and dark themes.

**Props:**

- `theme`: string | null - The theme to apply ('light', 'dark', or null for system default)

**Example:**

```html
<psypres-theme-provider>
  <!-- Your app content here -->
</psypres-theme-provider>

<!-- With specified theme -->
<psypres-theme-provider theme="dark">
  <!-- Your app content here -->
</psypres-theme-provider>
```

### ThemeToggle

An elegant toggle component with smooth animations that morph between sun and moon icons when switching between light and dark themes.

**Props:**

- `size`: 'small' | 'medium' | 'large' (default: 'medium')

**Features:**

- Beautiful sun-to-moon icon morphing animation
- Seamless transition between light and dark states
- Subtle hover and click effects
- Accessibility support with keyboard navigation
- Automatically syncs with the current theme state

**Example:**

```html
<psypres-theme-toggle size="medium"></psypres-theme-toggle>
```

## Using with Framework Wrappers

While these components can be used directly as web components, we recommend using our framework-specific wrappers for a more seamless developer experience:

- React: `@psypres/react`
- Vue: `@psypres/vue`

## Theme Support

The ThemeProvider component adds a `data-theme` attribute to the root element that can be used for CSS theme customization. It automatically handles:

1. User preference detection via `prefers-color-scheme` media query
2. Local storage persistence of the user's theme choice
3. Real-time theme switching

### Custom CSS Variables

You can define your own CSS variables for light and dark themes:

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

To develop or extend these components:

1. Clone the repository
2. Navigate to this package: `cd packages/shared-ui`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
