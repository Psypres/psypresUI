import '../themes/theme.css';

export class PsypresFormInput extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
    this._setupEventListeners();
  }

  static get observedAttributes() {
    return [
      'label',
      'placeholder',
      'value',
      'name',
      'type',
      'required',
      'disabled',
      'readonly',
      'pattern',
      'min',
      'max',
      'maxlength',
      'size',
      'error',
      'help-text'
    ];
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get placeholder() {
    return this.getAttribute('placeholder') || '';
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }

  get value() {
    const input = this._shadow.querySelector('input');
    return input ? input.value : this.getAttribute('value') || '';
  }

  set value(value) {
    this.setAttribute('value', value);
    const input = this._shadow.querySelector('input');
    if (input) {
      input.value = value;
    }
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get type() {
    return this.getAttribute('type') || 'text';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  get required() {
    return this.hasAttribute('required');
  }

  set required(value) {
    if (value) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get readonly() {
    return this.hasAttribute('readonly');
  }

  set readonly(value) {
    if (value) {
      this.setAttribute('readonly', '');
    } else {
      this.removeAttribute('readonly');
    }
  }

  get error() {
    return this.getAttribute('error') || '';
  }

  set error(value) {
    if (value) {
      this.setAttribute('error', value);
    } else {
      this.removeAttribute('error');
    }
  }

  get helpText() {
    return this.getAttribute('help-text') || '';
  }

  set helpText(value) {
    if (value) {
      this.setAttribute('help-text', value);
    } else {
      this.removeAttribute('help-text');
    }
  }

  get size() {
    return this.getAttribute('size') || 'medium';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
    this._setupEventListeners();
  }

  validate() {
    const input = this._shadow.querySelector('input');
    if (!input) return true;

    const isValid = input.checkValidity();
    if (!isValid) {
      this.error = input.validationMessage;
    } else {
      this.error = '';
    }
    return isValid;
  }

  reset() {
    const input = this._shadow.querySelector('input');
    if (input) {
      input.value = '';
    }
    this.error = '';
  }

  _setupEventListeners() {
    const input = this._shadow.querySelector('input');
    if (!input) return;

    input.addEventListener('input', (e) => {
      this.dispatchEvent(new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: e.target.value }
      }));
    });

    input.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: e.target.value }
      }));
    });

    input.addEventListener('focus', () => {
      this.dispatchEvent(new CustomEvent('focus', {
        bubbles: true,
        composed: true
      }));
    });

    input.addEventListener('blur', (e) => {
      this.validate();
      this.dispatchEvent(new CustomEvent('blur', {
        bubbles: true,
        composed: true,
        detail: { value: e.target.value }
      }));
    });
  }

  _getStyles() {
    return `
      :host {
        display: block;
        font-family: 'Arial', sans-serif;
        margin-bottom: 1rem;
      }
      
      .form-control {
        width: 100%;
      }
      
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--psypres-label-color, var(--psypres-text-color, #333));
      }
      
      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--psypres-input-border-color, var(--psypres-border-color, #e2e8f0));
        border-radius: var(--psypres-input-border-radius, 4px);
        font-size: 1rem;
        background-color: var(--psypres-input-bg, var(--psypres-surface-color, #fff));
        color: var(--psypres-input-text, var(--psypres-text-color, #333));
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      
      input:focus {
        outline: none;
        border-color: var(--psypres-input-focus-border-color, var(--psypres-primary-color, #4299e1));
        box-shadow: 0 0 0 3px var(--psypres-input-focus-ring-color, rgba(66, 153, 225, 0.3));
      }
      
      input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: var(--psypres-input-disabled-bg, #f7fafc);
      }
      
      input:read-only {
        background-color: var(--psypres-input-readonly-bg, #f7fafc);
      }
      
      .required-mark {
        color: var(--psypres-danger-color, #f56565);
        margin-left: 0.2rem;
      }
      
      .error-text {
        color: var(--psypres-danger-color, #f56565);
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }
      
      .help-text {
        color: var(--psypres-secondary-text, #718096);
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }
      
      /* Input sizes */
      input.small {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
      }
      
      input.medium {
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
      }
      
      input.large {
        padding: 0.75rem 1rem;
        font-size: 1.125rem;
      }
      
      .has-error input {
        border-color: var(--psypres-danger-color, #f56565);
      }
      
      .has-error input:focus {
        box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.3);
      }
    `;
  }

  _render() {
    const hasError = this.error && this.error.length > 0;
    const helpText = this.helpText;
    
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <div class="form-control ${hasError ? 'has-error' : ''}">
        ${this.label ? `
          <label for="input-${this.name}">
            ${this.label}
            ${this.required ? '<span class="required-mark">*</span>' : ''}
          </label>
        ` : ''}
        
        <input
          id="input-${this.name}"
          type="${this.type}"
          name="${this.name}"
          value="${this.value || ''}"
          placeholder="${this.placeholder}"
          class="${this.size}"
          ${this.required ? 'required' : ''}
          ${this.disabled ? 'disabled' : ''}
          ${this.readonly ? 'readonly' : ''}
          ${this.getAttribute('pattern') ? `pattern="${this.getAttribute('pattern')}"` : ''}
          ${this.getAttribute('min') ? `min="${this.getAttribute('min')}"` : ''}
          ${this.getAttribute('max') ? `max="${this.getAttribute('max')}"` : ''}
          ${this.getAttribute('maxlength') ? `maxlength="${this.getAttribute('maxlength')}"` : ''}
        />
        
        ${hasError ? `<div class="error-text">${this.error}</div>` : ''}
        ${helpText ? `<div class="help-text">${helpText}</div>` : ''}
      </div>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-form-input')) {
  customElements.define('psypres-form-input', PsypresFormInput);
} 