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

  _getStyles() {
    return `
      :host {
        display: inline-block;
      }
      
      .button {
        font-family: 'Arial', sans-serif;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 600;
      }
      
      .button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
      }
      
      .button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      /* Variants */
      .button.primary {
        background-color: #4299e1;
        color: white;
      }
      
      .button.primary:hover:not(:disabled) {
        background-color: #3182ce;
      }
      
      .button.secondary {
        background-color: #a0aec0;
        color: white;
      }
      
      .button.secondary:hover:not(:disabled) {
        background-color: #718096;
      }
      
      .button.outline {
        background-color: transparent;
        color: #4299e1;
        border: 1px solid #4299e1;
      }
      
      .button.outline:hover:not(:disabled) {
        background-color: rgba(66, 153, 225, 0.1);
      }
      
      /* Sizes */
      .button.small {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
      
      .button.medium {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
      
      .button.large {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      }
    `;
  }

  _render() {
    const text = this.textContent || '';
    
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
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