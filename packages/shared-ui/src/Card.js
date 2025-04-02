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

  _getStyles() {
    return `
      :host {
        display: block;
      }
      
      .card {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        overflow: hidden;
      }
      
      .card.primary {
        border-top: 4px solid #4299e1;
      }
      
      .card.secondary {
        border-top: 4px solid #a0aec0;
      }
      
      .card.success {
        border-top: 4px solid #48bb78;
      }
      
      .card.danger {
        border-top: 4px solid #f56565;
      }
    `;
  }

  _render() {
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
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