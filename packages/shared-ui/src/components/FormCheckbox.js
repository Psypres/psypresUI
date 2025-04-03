import '../themes/theme.css';

export class PsypresFormCheckbox extends HTMLElement {
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
      'checked',
      'required',
      'disabled',
      'type',
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

  get value() {
    return this.getAttribute('value') || '';
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get checked() {
    const input = this._shadow.querySelector('input');
    return input ? input.checked : this.hasAttribute('checked');
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }

    const input = this._shadow.querySelector('input');
    if (input) {
      input.checked = !!value;
    }
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

  get type() {
    return this.getAttribute('type') || 'checkbox';
  }

  set type(value) {
    if (value === 'checkbox' || value === 'radio') {
      this.setAttribute('type', value);
    } else {
      console.error('Type must be "checkbox" or "radio"');
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
      input.checked = false;
    }
    this.error = '';
  }

  _setupEventListeners() {
    const input = this._shadow.querySelector('input');
    if (!input) return;

    input.addEventListener('change', (e) => {
      if (this.type === 'radio') {
        // Handle radio group behavior
        this.checked = true;
        this._notifyRadioGroupChange();
      } else {
        this.checked = e.target.checked;
      }
      
      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { 
          checked: this.checked,
          value: this.value 
        }
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
        detail: { checked: this.checked }
      }));
    });
  }

  _notifyRadioGroupChange() {
    // If this is a radio button that was checked, find other radio buttons with same name
    // and uncheck them (but don't trigger their change events)
    if (this.type === 'radio' && this.name && this.checked) {
      const form = this.closest('form') || document;
      const radios = form.querySelectorAll(`psypres-form-checkbox[type="radio"][name="${this.name}"]`);
      
      radios.forEach(radio => {
        if (radio !== this && radio.checked) {
          radio.checked = false;
        }
      });
    }
  }

  _getStyles() {
    return `
      :host {
        display: block;
        font-family: 'Arial', sans-serif;
        margin-bottom: 0.5rem;
      }
      
      .form-control {
        position: relative;
        display: flex;
        align-items: center;
      }
      
      label {
        display: flex;
        align-items: center;
        font-weight: 400;
        color: var(--psypres-label-color, var(--psypres-text-color, #333));
        cursor: pointer;
      }
      
      label.disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      .input-wrapper {
        position: relative;
        width: 20px;
        height: 20px;
        margin-right: 0.5rem;
      }
      
      input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        background-color: var(--psypres-input-bg, #fff);
        border: 1px solid var(--psypres-input-border-color, var(--psypres-border-color, #e2e8f0));
        transition: all 0.2s ease;
      }
      
      input[type="checkbox"] ~ .checkmark {
        border-radius: 4px;
      }
      
      input[type="radio"] ~ .checkmark {
        border-radius: 50%;
      }
      
      input:checked ~ .checkmark {
        background-color: var(--psypres-primary-color, #4299e1);
        border-color: var(--psypres-primary-color, #4299e1);
      }
      
      input:focus ~ .checkmark {
        box-shadow: 0 0 0 3px var(--psypres-input-focus-ring-color, rgba(66, 153, 225, 0.3));
        outline: none;
      }
      
      input:disabled ~ .checkmark {
        background-color: var(--psypres-input-disabled-bg, #f7fafc);
        border-color: var(--psypres-input-border-color, #e2e8f0);
        cursor: not-allowed;
      }
      
      input:checked:disabled ~ .checkmark {
        background-color: var(--psypres-input-disabled-bg, #f7fafc);
        border-color: var(--psypres-border-color, #e2e8f0);
      }
      
      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }
      
      input:checked ~ .checkmark:after {
        display: block;
      }
      
      input[type="checkbox"] ~ .checkmark:after {
        left: 7px;
        top: 3px;
        width: 4px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
      
      input[type="radio"] ~ .checkmark:after {
        top: 6px;
        left: 6px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
      }
      
      input:checked:disabled ~ .checkmark:after {
        border-color: var(--psypres-secondary-color, #a0aec0);
      }
      
      input[type="radio"]:checked:disabled ~ .checkmark:after {
        background-color: var(--psypres-secondary-color, #a0aec0);
      }
      
      .required-mark {
        color: var(--psypres-danger-color, #f56565);
        margin-left: 0.2rem;
      }
      
      .error-text {
        color: var(--psypres-danger-color, #f56565);
        font-size: 0.875rem;
        margin-top: 0.25rem;
        margin-left: 2rem;
      }
      
      .help-text {
        color: var(--psypres-secondary-text, #718096);
        font-size: 0.875rem;
        margin-top: 0.25rem;
        margin-left: 2rem;
      }
      
      .has-error .checkmark {
        border-color: var(--psypres-danger-color, #f56565);
      }
      
      .has-error input:focus ~ .checkmark {
        box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.3);
      }
    `;
  }

  _render() {
    const hasError = this.error && this.error.length > 0;
    const helpText = this.helpText;
    const type = this.type === 'radio' ? 'radio' : 'checkbox';
    const checked = this.hasAttribute('checked') ? 'checked' : '';
    
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <div class="form-control ${hasError ? 'has-error' : ''}">
        <label class="${this.disabled ? 'disabled' : ''}">
          <span class="input-wrapper">
            <input
              type="${type}"
              name="${this.name}"
              value="${this.value}"
              ${checked}
              ${this.required ? 'required' : ''}
              ${this.disabled ? 'disabled' : ''}
            />
            <span class="checkmark"></span>
          </span>
          ${this.label}
          ${this.required ? '<span class="required-mark">*</span>' : ''}
        </label>
      </div>
      
      ${hasError ? `<div class="error-text">${this.error}</div>` : ''}
      ${helpText ? `<div class="help-text">${helpText}</div>` : ''}
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-form-checkbox')) {
  customElements.define('psypres-form-checkbox', PsypresFormCheckbox);
} 