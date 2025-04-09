import './button.css';

export class PsypresButton extends HTMLElement {
  constructor() {
    super();
    console.log('PsypresButton constructor');
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
    console.log(`Attribute changed: ${name} from ${oldValue} to ${newValue}`);
    this._render();
  }

  _render() {
    console.log('Rendering button with variant:', this.variant);
    this._shadow.innerHTML = `
      <button 
        class="button ${this.variant} ${this.size}" 
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
        this.dispatchEvent(new CustomEvent('click', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: event }
        }));
      }
    });
  }
  
  _setupThemeListener() {
    console.log('Setting up theme listener');
    // Listen for theme changes
    window.addEventListener('psypres-theme-change', (event) => {
      console.log('Theme change event received:', event.detail);
      this._applyThemeColors();
    });
  }
  
  _applyThemeColors() {
    console.log('Applying theme colors');
    const button = this._shadow.querySelector('button');
    if (!button) {
      console.log('No button found to apply colors to');
      return;
    }
    
    // Get current theme colors
    const rootStyles = window.getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--psypres-primary-color').trim();
    const primaryText = rootStyles.getPropertyValue('--psypres-primary-text').trim();
    const secondaryColor = rootStyles.getPropertyValue('--psypres-secondary-color').trim();
    const secondaryText = rootStyles.getPropertyValue('--psypres-secondary-text').trim();
    const successColor = rootStyles.getPropertyValue('--psypres-success-color').trim();
    const successText = rootStyles.getPropertyValue('--psypres-success-text').trim();
    const dangerColor = rootStyles.getPropertyValue('--psypres-danger-color').trim();
    const dangerText = rootStyles.getPropertyValue('--psypres-danger-text').trim();
    
    console.log('Current theme colors:', {
      primaryColor,
      primaryText,
      secondaryColor,
      secondaryText,
      successColor,
      successText,
      dangerColor,
      dangerText
    });
    
    // Apply colors based on variant
    switch (this.variant) {
      case 'primary':
        console.log('Applying primary colors');
        button.style.backgroundColor = primaryColor;
        button.style.color = primaryText;
        break;
      case 'secondary':
        console.log('Applying secondary colors');
        button.style.backgroundColor = secondaryColor;
        button.style.color = secondaryText;
        break;
      case 'success':
        console.log('Applying success colors');
        button.style.backgroundColor = successColor;
        button.style.color = successText;
        break;
      case 'danger':
        console.log('Applying danger colors');
        button.style.backgroundColor = dangerColor;
        button.style.color = dangerText;
        break;
      case 'outline':
        console.log('Applying outline colors');
        button.style.backgroundColor = 'transparent';
        button.style.color = primaryColor;
        button.style.border = `1px solid ${primaryColor}`;
        break;
    }
  }
}

// Define the custom element
if (!customElements.get('psypres-button')) {
  customElements.define('psypres-button', PsypresButton);
} 