import '../themes/theme.css';

export class PsypresFormTextarea extends HTMLElement {
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
      'required',
      'disabled',
      'readonly',
      'rows',
      'cols',
      'maxlength',
      'size',
      'error',
      'help-text',
      'resize'
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
    const textarea = this._shadow.querySelector('textarea');
    return textarea ? textarea.value : this.getAttribute('value') || '';
  }

  set value(value) {
    this.setAttribute('value', value);
    const textarea = this._shadow.querySelector('textarea');
    if (textarea) {
      textarea.value = value;
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

  get rows() {
    return this.getAttribute('rows') || '4';
  }

  set rows(value) {
    this.setAttribute('rows', value);
  }

  get cols() {
    return this.getAttribute('cols') || '';
  }

  set cols(value) {
    if (value) {
      this.setAttribute('cols', value);
    } else {
      this.removeAttribute('cols');
    }
  }

  get resize() {
    return this.getAttribute('resize') || 'vertical';
  }

  set resize(value) {
    this.setAttribute('resize', value);
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
    const textarea = this._shadow.querySelector('textarea');
    if (!textarea) return true;

    const isValid = textarea.checkValidity();
    if (!isValid) {
      this.error = textarea.validationMessage;
    } else {
      this.error = '';
    }
    return isValid;
  }

  reset() {
    const textarea = this._shadow.querySelector('textarea');
    if (textarea) {
      textarea.value = '';
    }
    this.error = '';
  }

  _setupEventListeners() {
    const textarea = this._shadow.querySelector('textarea');
    if (!textarea) return;

    textarea.addEventListener('input', (e) => {
      this.dispatchEvent(new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: e.target.value }
      }));
    });

    textarea.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: e.target.value }
      }));
    });

    textarea.addEventListener('focus', () => {
      this.dispatchEvent(new CustomEvent('focus', {
        bubbles: true,
        composed: true
      }));
    });

    textarea.addEventListener('blur', (e) => {
      this.validate();
      this.dispatchEvent(new CustomEvent('blur', {
        bubbles: true,
        composed: true,
        detail: { value: e.target.value }
      }));
    });
  }

  _getStyles() {
    const resizeCSS = this.resize === 'none' ? 'none' : 
                      this.resize === 'horizontal' ? 'horizontal' : 
                      this.resize === 'both' ? 'both' : 'vertical';
    
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
      
      textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--psypres-input-border-color, var(--psypres-border-color, #e2e8f0));
        border-radius: var(--psypres-input-border-radius, 4px);
        font-size: 1rem;
        background-color: var(--psypres-input-bg, var(--psypres-surface-color, #fff));
        color: var(--psypres-input-text, var(--psypres-text-color, #333));
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        resize: ${resizeCSS};
        font-family: inherit;
      }
      
      textarea:focus {
        outline: none;
        border-color: var(--psypres-input-focus-border-color, var(--psypres-primary-color, #4299e1));
        box-shadow: 0 0 0 3px var(--psypres-input-focus-ring-color, rgba(66, 153, 225, 0.3));
      }
      
      textarea:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: var(--psypres-input-disabled-bg, #f7fafc);
      }
      
      textarea:read-only {
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
      
      /* Textarea sizes */
      textarea.small {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
      }
      
      textarea.medium {
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
      }
      
      textarea.large {
        padding: 0.75rem 1rem;
        font-size: 1.125rem;
      }
      
      .has-error textarea {
        border-color: var(--psypres-danger-color, #f56565);
      }
      
      .has-error textarea:focus {
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
          <label for="textarea-${this.name}">
            ${this.label}
            ${this.required ? '<span class="required-mark">*</span>' : ''}
          </label>
        ` : ''}
        
        <textarea
          id="textarea-${this.name}"
          name="${this.name}"
          placeholder="${this.placeholder}"
          class="${this.size}"
          rows="${this.rows}"
          ${this.cols ? `cols="${this.cols}"` : ''}
          ${this.required ? 'required' : ''}
          ${this.disabled ? 'disabled' : ''}
          ${this.readonly ? 'readonly' : ''}
          ${this.getAttribute('maxlength') ? `maxlength="${this.getAttribute('maxlength')}"` : ''}
        >${this.value || ''}</textarea>
        
        ${hasError ? `<div class="error-text">${this.error}</div>` : ''}
        ${helpText ? `<div class="help-text">${helpText}</div>` : ''}
      </div>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-form-textarea')) {
  customElements.define('psypres-form-textarea', PsypresFormTextarea);
} 