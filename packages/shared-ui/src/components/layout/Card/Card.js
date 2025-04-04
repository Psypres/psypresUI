import './card.css';

export class PsypresCard extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
  }

  static get observedAttributes() {
    return ['variant'];
  }

  get variant() {
    return this.getAttribute('variant') || 'default';
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    this._shadow.innerHTML = `
      <div class="card ${this.variant}">
        <slot></slot>
      </div>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-card')) {
  customElements.define('psypres-card', PsypresCard);
} 