import './form-select.css';

export class PsypresFormSelect extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
    this._addEventListeners();
  }

  static get observedAttributes() {
    return ['name', 'placeholder', 'value', 'disabled'];
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get placeholder() {
    return this.getAttribute('placeholder') || '';
  }

  set placeholder(value) {
    this.setAttribute('placeholder', value);
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  set value(value) {
    this.setAttribute('value', value);
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

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    this._shadow.innerHTML = `
      <div class="form-select-container">
        <select
          class="form-select"
          name="${this.name}"
          ${this.disabled ? 'disabled' : ''}
        >
          ${this.placeholder ? `<option value="" disabled selected>${this.placeholder}</option>` : ''}
          <slot></slot>
        </select>
      </div>
    `;
  }

  _addEventListeners() {
    const select = this._shadow.querySelector('select');
    select.addEventListener('change', (event) => {
      this.value = event.target.value;
      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: event.target.value }
      }));
    });
  }
}

// Define the custom element
if (!customElements.get('psypres-form-select')) {
  customElements.define('psypres-form-select', PsypresFormSelect);
} 