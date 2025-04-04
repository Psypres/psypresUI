import './button.css';

export class PsypresButton extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
    this._addEventListeners();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
  }

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get size() {
    return this.getAttribute('size') || 'medium';
  }

  set size(value) {
    this.setAttribute('size', value);
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
      <button 
        class="button ${this.variant} ${this.size}" 
        ${this.disabled ? 'disabled' : ''}
      >
        <slot></slot>
      </button>
    `;
  }

  _addEventListeners() {
    const button = this._shadow.querySelector('button');
    button.addEventListener('click', (event) => {
      if (!this.disabled) {
        this.dispatchEvent(new CustomEvent('click', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: event }
        }));
      }
    });
  }
}

// Define the custom element
if (!customElements.get('psypres-button')) {
  customElements.define('psypres-button', PsypresButton);
} 