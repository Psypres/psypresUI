# PsypresUI <img src="https://img.shields.io/badge/status-in%20development-blue" alt="Status: In Development">

<div align="center">
  
  <!-- Replace with your actual logo once you have one -->
  <img src="https://via.placeholder.com/200x200?text=PsypresUI" width="180px" alt="PsypresUI Logo"/>
  
  <h3>A cross-platform UI component library with framework-agnostic core</h3>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue)
![Built with Web Components](https://img.shields.io/badge/Built%20with-Web%20Components-orange)

</div>

<hr />

## 📖 Overview

PsypresUI is a comprehensive UI component library for building modern, accessible user interfaces. Following a framework-agnostic approach with web components at its core, PsypresUI offers seamless integration with React and Vue through dedicated wrappers.

<table>
  <tr>
    <td>
      <strong>🧩 Framework-Agnostic</strong><br />
      Core components built as web components that work across frameworks
    </td>
    <td>
      <strong>📱 Responsive Design</strong><br />
      All components adapt beautifully to desktop and mobile
    </td>
  </tr>
  <tr>
    <td>
      <strong>♿ Accessibility</strong><br />
      ARIA support and keyboard navigation built-in
    </td>
    <td>
      <strong>🎨 Themeable</strong><br />
      Easily customizable with CSS variables
    </td>
  </tr>
  <tr>
    <td>
      <strong>🌓 Dark Mode</strong><br />
      Beautiful animated theme toggle that morphs between sun and moon icons
    </td>
    <td>
      <strong>🔄 Framework Wrappers</strong><br />
      Dedicated React and Vue wrappers for seamless integration
    </td>
  </tr>
</table>

## 🚀 Quick Start

### Install the package

```bash
# React
npm install @psypres/react

# Vue
npm install @psypres/vue

# Core (framework-agnostic)
npm install @psypres/shared-ui
```

### React Usage

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

### Vue Usage

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

## 🧩 Component Status

<table>
  <tr>
    <th>Category</th>
    <th>Component</th>
    <th>Status</th>
    <th>Description</th>
  </tr>
  <!-- Buttons & Actions -->
  <tr>
    <td rowspan="6"><strong>Buttons & Actions</strong></td>
    <td>Button</td>
    <td>✅ Ready</td>
    <td>Customizable button with variants and sizes</td>
  </tr>
  <tr>
    <td>IconButton</td>
    <td>🔄 Planned</td>
    <td>Button with icon only</td>
  </tr>
  <tr>
    <td>ToggleButton</td>
    <td>🔄 Planned</td>
    <td>Button with toggle state</td>
  </tr>
  <tr>
    <td>SplitButton</td>
    <td>🔄 Planned</td>
    <td>Button with dropdown for additional actions</td>
  </tr>
  <tr>
    <td>ActionGroup</td>
    <td>🔄 Planned</td>
    <td>Group of related action buttons</td>
  </tr>
  <tr>
    <td>FloatingActionButton</td>
    <td>🔄 Planned</td>
    <td>Floating action button (FAB)</td>
  </tr>
  <!-- Forms & Inputs - Main components -->
  <tr>
    <td rowspan="8"><strong>Forms & Inputs</strong><br/>(Main)</td>
    <td>Form</td>
    <td>✅ Ready</td>
    <td>Form component with validation support</td>
  </tr>
  <tr>
    <td>Input</td>
    <td>✅ Ready</td>
    <td>Text input field</td>
  </tr>
  <tr>
    <td>Textarea</td>
    <td>✅ Ready</td>
    <td>Multi-line text input</td>
  </tr>
  <tr>
    <td>Checkbox</td>
    <td>✅ Ready</td>
    <td>Checkbox input</td>
  </tr>
  <tr>
    <td>RadioGroup</td>
    <td>✅ Ready</td>
    <td>Group of radio buttons</td>
  </tr>
  <tr>
    <td>Switch</td>
    <td>✅ Ready</td>
    <td>Toggle switch</td>
  </tr>
  <tr>
    <td>Select</td>
    <td>✅ Ready</td>
    <td>Select/dropdown</td>
  </tr>
  <tr>
    <td>MultiSelect</td>
    <td>✅ Ready</td>
    <td>Multiple selection dropdown</td>
  </tr>
  <!-- Forms & Inputs - Additional components -->
  <tr>
    <td rowspan="8"><strong>Forms & Inputs</strong><br/>(Advanced)</td>
    <td>Autocomplete</td>
    <td>🔄 Planned</td>
    <td>Input with autocomplete suggestions</td>
  </tr>
  <tr>
    <td>Combobox</td>
    <td>🔄 Planned</td>
    <td>Combined input and dropdown</td>
  </tr>
  <tr>
    <td>DatePicker</td>
    <td>🔄 Planned</td>
    <td>Date selection component</td>
  </tr>
  <tr>
    <td>Slider</td>
    <td>🔄 Planned</td>
    <td>Slider for selecting a value</td>
  </tr>
  <tr>
    <td>ColorPicker</td>
    <td>🔄 Planned</td>
    <td>Color selection component</td>
  </tr>
  <tr>
    <td>RatingStars</td>
    <td>🔄 Planned</td>
    <td>Star rating input</td>
  </tr>
  <tr>
    <td>Upload</td>
    <td>🔄 Planned</td>
    <td>File upload component</td>
  </tr>
  <tr>
    <td>PasswordStrengthMeter</td>
    <td>🔄 Planned</td>
    <td>Visual indicator of password strength</td>
  </tr>
  <!-- Navigation -->
  <tr>
    <td rowspan="4"><strong>Navigation</strong></td>
    <td>Header</td>
    <td>✅ Ready</td>
    <td>Application header with navigation</td>
  </tr>
  <tr>
    <td>Navbar</td>
    <td>🔄 Planned</td>
    <td>Navigation bar</td>
  </tr>
  <tr>
    <td>Tabs</td>
    <td>🔄 Planned</td>
    <td>Tabbed navigation</td>
  </tr>
  <tr>
    <td>Drawer</td>
    <td>🔄 Planned</td>
    <td>Sidebar drawer navigation</td>
  </tr>
  <!-- Overlays & Modals -->
  <tr>
    <td rowspan="2"><strong>Overlays & Modals</strong></td>
    <td>Modal</td>
    <td>✅ Ready</td>
    <td>Modal dialog</td>
  </tr>
  <tr>
    <td>Tooltip</td>
    <td>🔄 Planned</td>
    <td>Contextual information tooltip</td>
  </tr>
  <!-- Utility & Helpers -->
  <tr>
    <td rowspan="2"><strong>Utility & Helpers</strong></td>
    <td>ThemeProvider</td>
    <td>✅ Ready</td>
    <td>Theme context provider</td>
  </tr>
  <tr>
    <td>ThemeToggle</td>
    <td>✅ Ready</td>
    <td>Theme toggle with sun/moon animation</td>
  </tr>
</table>

## 📋 Component Roadmap

PsypresUI aims to be a comprehensive component library with everything you need to build modern web applications. Below is our full component roadmap:

<details>
<summary><strong>Typography</strong></summary>
  
- Text
- Heading
- Link
- CodeBlock
- Quote
- List
- ListItem
- Highlight
</details>

<details>
<summary><strong>Feedback & Status</strong></summary>
  
- Alert
- Toast / Snackbar
- ProgressBar
- Spinner / Loader
- SkeletonLoader
- EmptyState
- ErrorBoundary
- FormError / ValidationSummary
</details>

<details>
<summary><strong>Layout & Grid</strong></summary>
  
- Container
- Grid
- Stack
- FlexRow / FlexColumn
- AspectRatio
- Spacer
- Divider
- Section
- PageWrapper
- ResponsiveWrapper
- ZStack
</details>

<details>
<summary><strong>Navigation (Extended)</strong></summary>
  
- Breadcrumbs
- Pagination
- Stepper
- DropdownMenu
- CommandMenu
- ContextMenu
- Scrollspy
- AnchorLinks
</details>

<details>
<summary><strong>Overlays & Modals (Extended)</strong></summary>
  
- Dialog
- Popover
- Lightbox
- Sheet
</details>

<details>
<summary><strong>Tables & Data Display</strong></summary>
  
- Table
- DataGrid
- ListView
- CardView
- DetailView
- DescriptionList
- Timeline
- KanbanBoard
- TreeView
- Calendar
- Chart
- TagCloud
- Badge
</details>

<details>
<summary><strong>Media & Files</strong></summary>
  
- Avatar
- Image
- ImageGroup / Gallery
- VideoEmbed
- FileCard
- AudioPlayer
</details>

<details>
<summary><strong>Utility & Helpers (Extended)</strong></summary>
  
- ThemeConfigurator
- BreakpointsHelper
- FocusTrap
- Portal
- ScrollArea
- ScrollToTop
- ClipboardButton
- CopyToClipboard
</details>

<details>
<summary><strong>Dev & Preview Tools</strong></summary>
  
- ComponentPreview
- PropsTable
- LiveEditor
- DesignTokenViewer
- DebugPanel
- ColorContrastChecker
- BreakpointViewer
- AccessibilityReport
</details>

<details>
<summary><strong>Authentication / Security</strong></summary>
  
- LoginForm
- SignupForm
- OTPInput
- PasswordResetForm
- 2FA Setup / Code Entry
</details>

<details>
<summary><strong>E-commerce</strong></summary>
  
- ProductCard
- ProductGrid
- AddToCartButton
- QuantitySelector
- CheckoutSteps
- PriceTag
</details>

<details>
<summary><strong>CMS/Dashboard-style</strong></summary>
  
- SidebarNavItem
- MetricCard
- ActivityFeed
- QuickActions
- UserCard
- NotificationsDropdown
- SettingsPanel
</details>

<details>
<summary><strong>Experimental/Future Ideas</strong></summary>
  
- MotionWrapper
- AIChatBubble
- CommandPalette
- KeyboardShortcutsHint
- MultiplayerPresenceIndicator
</details>

## 🎨 Theme Support

PsypresUI supports light and dark themes through the `ThemeProvider` component. The theme provider sets a `data-theme` attribute on the root element that can be used for CSS theme customization.

```css
:root {
  /* Light theme variables */
  --bg-color: #ffffff;
  --text-color: #333333;
  /* ... other variables */
}

[data-theme="dark"] {
  /* Dark theme variables */
  --bg-color: #1a202c;
  --text-color: #e2e8f0;
  /* ... other variables */
}
```

## 🏗️ Architecture

PsypresUI follows a monorepo architecture with the following packages:

```
packages/
  ├── shared-ui/     # Core web components
  ├── react/         # React wrappers
  ├── vue/           # Vue wrappers
  └── docs/          # Documentation site
```

<table>
  <tr>
    <th>Package</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>@psypres/shared-ui</code></td>
    <td>Core package with framework-agnostic web components</td>
  </tr>
  <tr>
    <td><code>@psypres/react</code></td>
    <td>React wrappers for PsypresUI components</td>
  </tr>
  <tr>
    <td><code>@psypres/vue</code></td>
    <td>Vue wrappers for PsypresUI components</td>
  </tr>
  <tr>
    <td><code>@psypres/docs</code></td>
    <td>Documentation site built with React</td>
  </tr>
</table>

## 💻 Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/psypresui.git
   cd psypresui
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm start
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

[MIT](LICENSE) © [Your Name or Organization]

---

<div align="center">
  <sub>Built with ❤️ by the PsypresUI team</sub>
</div>
