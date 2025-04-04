import './formInput.css';

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

  _render() {
    const hasError = this.error && this.error.length > 0;
    const helpText = this.helpText;
    
    this._shadow.innerHTML = `
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