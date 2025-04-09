import './form-textarea.css';

export class PsypresFormTextarea extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
    this._addEventListeners();
  }

  static get observedAttributes() {
    return ['name', 'placeholder', 'value', 'disabled', 'rows', 'cols'];
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

  get rows() {
    return this.getAttribute('rows') || '4';
  }

  set rows(value) {
    this.setAttribute('rows', value);
  }

  get cols() {
    return this.getAttribute('cols') || '50';
  }

  set cols(value) {
    this.setAttribute('cols', value);
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    this._shadow.innerHTML = `
      <div class="form-textarea-container">
        <textarea
          class="form-textarea"
          name="${this.name}"
          placeholder="${this.placeholder}"
          rows="${this.rows}"
          cols="${this.cols}"
          ${this.disabled ? 'disabled' : ''}
        >${this.value}</textarea>
      </div>
    `;
  }

  _addEventListeners() {
    const textarea = this._shadow.querySelector('textarea');
    textarea.addEventListener('input', (event) => {
      this.value = event.target.value;
      this.dispatchEvent(new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: event.target.value }
      }));
    });

    textarea.addEventListener('change', (event) => {
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
if (!customElements.get('psypres-form-textarea')) {
  customElements.define('psypres-form-textarea', PsypresFormTextarea);
} 