import './themedButton.css';
import { ThemeUtils } from '../../../themes/ThemeUtils.js';

export class PsypresThemedButton extends HTMLElement {
  constructor() {
    super();
    console.log('PsypresThemedButton constructor');
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
    this._addEventListeners();
    this._setupThemeListener();
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

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`ThemedButton: Attribute changed: ${name} from ${oldValue} to ${newValue}`);
    this._render();
  }

  _render() {
    console.log('ThemedButton: Rendering button with variant:', this.variant);
    
    // Get current color variables for debugging
    const rootStyles = window.getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--psypres-primary-color').trim() || '#4299e1';
    console.log('ThemedButton: Using primaryColor:', primaryColor);
    
    // Default styles to ensure button is visible
    const defaultStyles = `
      .themed-button {
        font-family: 'Arial', sans-serif;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;
        margin: 4px;
        min-width: 80px;
        text-align: center;
      }
      
      .themed-button.primary {
        background-color: ${primaryColor || '#4299e1'};
        color: white;
      }
      
      .themed-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .themed-button.small {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
      
      .themed-button.medium {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
      
      .themed-button.large {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      }
    `;
    
    this._shadow.innerHTML = `
      <style>
        ${defaultStyles}
      </style>
      <button 
        class="themed-button ${this.variant} ${this.size}" 
        ${this.disabled ? 'disabled' : ''}
      >
        <slot></slot>
      </button>
    `;
    
    // Apply current theme colors
    this._applyThemeColors();
  }

  _addEventListeners() {
    const button = this._shadow.querySelector('button');
    button.addEventListener('click', (event) => {
      if (!this.disabled) {
        console.log('ThemedButton: Click event fired');
        this.dispatchEvent(new CustomEvent('click', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: event }
        }));
      }
    });
  }
  
  _setupThemeListener() {
    console.log('ThemedButton: Setting up theme listener');
    // Listen for theme changes
    window.addEventListener('psypres-theme-change', (event) => {
      console.log('ThemedButton: Theme change event received:', event.detail);
      this._applyThemeColors();
    });
  }
  
  _applyThemeColors() {
    console.log('ThemedButton: Applying theme colors');
    const button = this._shadow.querySelector('button');
    if (!button) {
      console.log('ThemedButton: No button found to apply colors to');
      return;
    }
    
    // Get current theme colors
    const rootStyles = window.getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--psypres-primary-color').trim() || '#4299e1';
    const primaryText = rootStyles.getPropertyValue('--psypres-primary-text').trim() || '#ffffff';
    const secondaryColor = rootStyles.getPropertyValue('--psypres-secondary-color').trim() || '#a0aec0';
    const secondaryText = rootStyles.getPropertyValue('--psypres-secondary-text').trim() || '#ffffff';
    const successColor = rootStyles.getPropertyValue('--psypres-success-color').trim() || '#48bb78';
    const successText = rootStyles.getPropertyValue('--psypres-success-text').trim() || '#ffffff';
    const dangerColor = rootStyles.getPropertyValue('--psypres-danger-color').trim() || '#f56565';
    const dangerText = rootStyles.getPropertyValue('--psypres-danger-text').trim() || '#ffffff';
    
    console.log('ThemedButton: Current theme colors:', {
      primaryColor,
      primaryText,
      secondaryColor,
      secondaryText,
      successColor,
      successText,
      dangerColor,
      dangerText
    });
    
    // Apply colors based on variant with fallbacks
    switch (this.variant) {
      case 'primary':
        console.log('ThemedButton: Applying primary colors');
        button.style.backgroundColor = primaryColor || '#4299e1';
        button.style.color = primaryText || '#ffffff';
        break;
      case 'secondary':
        console.log('ThemedButton: Applying secondary colors');
        button.style.backgroundColor = secondaryColor || '#a0aec0';
        button.style.color = secondaryText || '#ffffff';
        break;
      case 'success':
        console.log('ThemedButton: Applying success colors');
        button.style.backgroundColor = successColor || '#48bb78';
        button.style.color = successText || '#ffffff';
        break;
      case 'danger':
        console.log('ThemedButton: Applying danger colors');
        button.style.backgroundColor = dangerColor || '#f56565';
        button.style.color = dangerText || '#ffffff';
        break;
      case 'outline':
        console.log('ThemedButton: Applying outline colors');
        button.style.backgroundColor = 'transparent';
        button.style.color = primaryColor || '#4299e1';
        button.style.border = `1px solid ${primaryColor || '#4299e1'}`;
        break;
      default:
        // Apply default styles just in case
        button.style.backgroundColor = '#4299e1';
        button.style.color = '#ffffff';
        break;
    }
  }

  connectedCallback() {
    console.log('ThemedButton: Connected to DOM');
    // Force a re-render when connected to DOM
    this._render();
  }
}

// Define the custom element
if (!customElements.get('psypres-themed-button')) {
  console.log('ThemedButton: Registering custom element');
  customElements.define('psypres-themed-button', PsypresThemedButton);
} else {
  console.log('ThemedButton: Custom element already registered');
} 