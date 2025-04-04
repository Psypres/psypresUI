# Psypres Form Components

This directory contains a collection of Web Components for building forms in the Psypres UI library.

## Components

### PsypresForm

A form component that wraps form fields and provides form submission and validation functionality.

```html
<psypres-form id="my-form" action="/submit">
  <!-- Form fields go here -->
</psypres-form>
```

### PsypresFormInput

A custom input field component that supports various input types, validation, and styling.

```html
<psypres-form-input
  label="Username"
  name="username"
  required
  help-text="Enter your username"
>
</psypres-form-input>
```

### PsypresFormCheckbox

A custom checkbox/radio button component.

```html
<psypres-form-checkbox label="I agree to the terms" name="agree" required>
</psypres-form-checkbox>

<psypres-form-checkbox type="radio" label="Option 1" name="options" value="1">
</psypres-form-checkbox>
```

### PsypresFormSelect

A custom select/dropdown component that supports both single and multiple selections.

```html
<psypres-form-select
  label="Country"
  name="country"
  options='[{"value":"us","label":"United States"},{"value":"ca","label":"Canada"}]'
>
</psypres-form-select>
```

## Usage

Import the components:

```js
// Import all form components
import {
  PsypresForm,
  PsypresFormInput,
  PsypresFormCheckbox,
  PsypresFormSelect,
} from "@psypres/shared-ui/src/components/forms";

// Or import individual components
import { PsypresFormInput } from "@psypres/shared-ui/src/components/forms/FormInput";
```

## Events

All form field components emit the following events:

- `psypres-change`: Fired when the value changes
- `psypres-focus`: Fired when the field receives focus
- `psypres-blur`: Fired when the field loses focus

The form component emits:

- `psypres-submit`: Fired when the form is submitted
- `psypres-validate`: Fired when the form is validated

## Styling

All components use CSS custom properties for styling, allowing for easy theming. See the CSS files for each component for the available custom properties.
