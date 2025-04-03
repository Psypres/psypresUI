import '../themes/theme.css';

export class PsypresModal extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._render();
  }

  static get observedAttributes() {
    return ['open', 'size', 'title', 'close-on-overlay', 'hide-close-button'];
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  get size() {
    return this.getAttribute('size') || 'medium';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get title() {
    return this.getAttribute('title') || '';
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get closeOnOverlay() {
    return this.hasAttribute('close-on-overlay');
  }

  set closeOnOverlay(value) {
    if (value) {
      this.setAttribute('close-on-overlay', '');
    } else {
      this.removeAttribute('close-on-overlay');
    }
  }

  get hideCloseButton() {
    return this.hasAttribute('hide-close-button');
  }

  set hideCloseButton(value) {
    if (value) {
      this.setAttribute('hide-close-button', '');
    } else {
      this.removeAttribute('hide-close-button');
    }
  }

  showModal() {
    this.open = true;
    document.body.style.overflow = 'hidden';
    this._dispatchEvent('open');
    document.addEventListener('keydown', this._handleKeyDown);
  }

  closeModal() {
    this.open = false;
    document.body.style.overflow = '';
    this._dispatchEvent('close');
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  _dispatchEvent(name) {
    this.dispatchEvent(new CustomEvent(`modal-${name}`, {
      bubbles: true,
      composed: true
    }));
  }

  _handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  }

  _setupEventListeners() {
    const overlay = this._shadow.querySelector('.modal-overlay');
    const closeButton = this._shadow.querySelector('.modal-close');
    
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay && this.closeOnOverlay) {
          this.closeModal();
        }
      });
    }
    
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.closeModal();
      });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
    this._setupEventListeners();
  }

  connectedCallback() {
    if (this.open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', this._handleKeyDown);
    }
  }

  disconnectedCallback() {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  _getStyles() {
    const width = this.size === 'small' ? '300px' : 
                 this.size === 'medium' ? '500px' : 
                 this.size === 'large' ? '800px' : 'auto';
    
    return `
      :host {
        display: contents;
      }
      
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .modal-overlay.open {
        opacity: 1;
        visibility: visible;
      }
      
      .modal-container {
        width: ${width};
        max-width: 90%;
        max-height: 80vh;
        background-color: var(--psypres-surface-color, #ffffff);
        border-radius: 8px;
        box-shadow: var(--psypres-shadow-lg);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      
      .modal-header {
        padding: 1rem;
        border-bottom: 1px solid var(--psypres-border-color, #e2e8f0);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .modal-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }
      
      .modal-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
      }
      
      .modal-body {
        padding: 1rem;
        overflow-y: auto;
        flex: 1;
      }
      
      .modal-footer {
        padding: 1rem;
        border-top: 1px solid var(--psypres-border-color, #e2e8f0);
        display: flex;
        justify-content: flex-end;
      }
      
      @media (max-width: 480px) {
        .modal-container {
          width: 100%;
          height: 100%;
          max-height: 100%;
          border-radius: 0;
        }
      }
    `;
  }

  _render() {
    const hasHeader = this.title || !this.hideCloseButton;
    
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <div class="modal-overlay ${this.open ? 'open' : ''}">
        <div class="modal-container" role="dialog" aria-modal="true">
          ${hasHeader ? `
            <div class="modal-header">
              ${this.title ? `<h3 class="modal-title">${this.title}</h3>` : '<div></div>'}
              ${!this.hideCloseButton ? `
                <button class="modal-close" aria-label="Close modal">✕</button>
              ` : ''}
            </div>
          ` : ''}
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-modal')) {
  customElements.define('psypres-modal', PsypresModal);
} 