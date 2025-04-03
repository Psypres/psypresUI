import '../themes/theme.css';

export class PsypresFormSelect extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
    this._setupEventListeners();
  }

  static get observedAttributes() {
    return [
      'label',
      'value',
      'name',
      'required',
      'disabled',
      'size',
      'error',
      'help-text',
      'multiple',
      'options'
    ];
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get value() {
    const select = this._shadow.querySelector('select');
    if (!select) return this.getAttribute('value') || '';
    
    if (this.multiple) {
      const selectedOptions = Array.from(select.selectedOptions);
      return selectedOptions.map(option => option.value);
    }
    
    return select.value;
  }

  set value(value) {
    if (Array.isArray(value) && this.multiple) {
      // Don't set the attribute for arrays, handle in render
      const select = this._shadow.querySelector('select');
      if (select) {
        Array.from(select.options).forEach(option => {
          option.selected = value.includes(option.value);
        });
      }
    } else {
      this.setAttribute('value', value);
      const select = this._shadow.querySelector('select');
      if (select) {
        select.value = value;
      }
    }
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value);
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

  get multiple() {
    return this.hasAttribute('multiple');
  }

  set multiple(value) {
    if (value) {
      this.setAttribute('multiple', '');
    } else {
      this.removeAttribute('multiple');
    }
  }

  get options() {
    const optionsAttr = this.getAttribute('options');
    if (!optionsAttr) return [];
    
    try {
      return JSON.parse(optionsAttr);
    } catch (e) {
      console.error('Invalid options format, should be JSON array:', e);
      return [];
    }
  }

  set options(value) {
    if (Array.isArray(value)) {
      this.setAttribute('options', JSON.stringify(value));
    } else {
      console.error('Options must be an array');
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
    const select = this._shadow.querySelector('select');
    if (!select) return true;

    const isValid = select.checkValidity();
    if (!isValid) {
      this.error = select.validationMessage;
    } else {
      this.error = '';
    }
    return isValid;
  }

  reset() {
    const select = this._shadow.querySelector('select');
    if (select) {
      select.selectedIndex = 0;
    }
    this.error = '';
  }

  _setupEventListeners() {
    const select = this._shadow.querySelector('select');
    if (!select) return;

    select.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      }));
    });

    select.addEventListener('focus', () => {
      this.dispatchEvent(new CustomEvent('focus', {
        bubbles: true,
        composed: true
      }));
    });

    select.addEventListener('blur', (e) => {
      this.validate();
      this.dispatchEvent(new CustomEvent('blur', {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
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
      
      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--psypres-input-border-color, var(--psypres-border-color, #e2e8f0));
        border-radius: var(--psypres-input-border-radius, 4px);
        font-size: 1rem;
        background-color: var(--psypres-input-bg, var(--psypres-surface-color, #fff));
        color: var(--psypres-input-text, var(--psypres-text-color, #333));
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.5rem center;
        padding-right: 2rem;
      }
      
      select[multiple] {
        background-image: none;
        padding-right: 0.5rem;
      }
      
      select:focus {
        outline: none;
        border-color: var(--psypres-input-focus-border-color, var(--psypres-primary-color, #4299e1));
        box-shadow: 0 0 0 3px var(--psypres-input-focus-ring-color, rgba(66, 153, 225, 0.3));
      }
      
      select:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: var(--psypres-input-disabled-bg, #f7fafc);
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
      
      /* Select sizes */
      select.small {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
      }
      
      select.medium {
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
      }
      
      select.large {
        padding: 0.75rem 1rem;
        font-size: 1.125rem;
      }
      
      .has-error select {
        border-color: var(--psypres-danger-color, #f56565);
      }
      
      .has-error select:focus {
        box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.3);
      }
    `;
  }

  _renderOptions() {
    const options = this.options;
    const value = this.getAttribute('value') || '';
    
    if (!options || !options.length) {
      return '<option value="">No options available</option>';
    }
    
    return options.map(option => {
      // Handle different option formats (string, { value, label, disabled })
      let optionValue, optionLabel, optionDisabled;
      
      if (typeof option === 'string') {
        optionValue = option;
        optionLabel = option;
        optionDisabled = false;
      } else {
        optionValue = option.value !== undefined ? option.value : '';
        optionLabel = option.label || option.value;
        optionDisabled = !!option.disabled;
      }
      
      const selected = value === optionValue.toString() ? 'selected' : '';
      const disabled = optionDisabled ? 'disabled' : '';
      
      return `<option value="${optionValue}" ${selected} ${disabled}>${optionLabel}</option>`;
    }).join('');
  }

  _render() {
    const hasError = this.error && this.error.length > 0;
    const helpText = this.helpText;
    const options = this._renderOptions();
    
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <div class="form-control ${hasError ? 'has-error' : ''}">
        ${this.label ? `
          <label for="select-${this.name}">
            ${this.label}
            ${this.required ? '<span class="required-mark">*</span>' : ''}
          </label>
        ` : ''}
        
        <select
          id="select-${this.name}"
          name="${this.name}"
          class="${this.size}"
          ${this.required ? 'required' : ''}
          ${this.disabled ? 'disabled' : ''}
          ${this.multiple ? 'multiple' : ''}
        >
          ${options}
        </select>
        
        ${hasError ? `<div class="error-text">${this.error}</div>` : ''}
        ${helpText ? `<div class="help-text">${helpText}</div>` : ''}
      </div>
    `;
    
    // Handle multiple select values after rendering
    if (this.multiple) {
      const select = this._shadow.querySelector('select');
      const valueAttr = this.getAttribute('value');
      
      if (valueAttr) {
        try {
          const selectedValues = JSON.parse(valueAttr);
          if (Array.isArray(selectedValues) && select) {
            Array.from(select.options).forEach(option => {
              option.selected = selectedValues.includes(option.value);
            });
          }
        } catch (e) {
          console.error('Invalid value format for multiple select', e);
        }
      }
    }
  }
}

// Define the custom element
if (!customElements.get('psypres-form-select')) {
  customElements.define('psypres-form-select', PsypresFormSelect);
} 