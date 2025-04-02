export class PsypresHeader extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
  }

  static get observedAttributes() {
    return ['level', 'variant'];
  }

  get level() {
    const level = this.getAttribute('level');
    // Only allow levels 1-6, default to 1 if invalid
    return /^[1-6]$/.test(level) ? level : '1';
  }

  set level(value) {
    this.setAttribute('level', value);
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
      
      .header {
        font-family: 'Arial', sans-serif;
        margin-top: 0;
        margin-bottom: 0.5em;
        font-weight: 600;
        line-height: 1.2;
      }
      
      .header.h1 {
        font-size: 2.5rem;
      }
      
      .header.h2 {
        font-size: 2rem;
      }
      
      .header.h3 {
        font-size: 1.75rem;
      }
      
      .header.h4 {
        font-size: 1.5rem;
      }
      
      .header.h5 {
        font-size: 1.25rem;
      }
      
      .header.h6 {
        font-size: 1rem;
      }
      
      /* Variants */
      .header.primary {
        color: #4299e1;
      }
      
      .header.secondary {
        color: #718096;
      }
      
      .header.success {
        color: #48bb78;
      }
      
      .header.danger {
        color: #f56565;
      }
      
      .header.default {
        color: #2d3748;
      }
    `;
  }

  _render() {
    const TagName = `h${this.level}`;
    
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <${TagName} class="header h${this.level} ${this.variant}">
        <slot></slot>
      </${TagName}>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-header')) {
  customElements.define('psypres-header', PsypresHeader);
} 