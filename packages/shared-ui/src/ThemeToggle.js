import { THEME_CHANGE_EVENT, LIGHT_THEME, DARK_THEME, dispatchThemeChangeEvent } from './ThemeProvider.js';

export class PsypresThemeToggle extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._currentTheme = LIGHT_THEME;
    this._render();
    this._addEventListeners();
  }

  static get observedAttributes() {
    return ['size'];
  }

  get size() {
    return this.getAttribute('size') || 'medium';
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  attributeChangedCallback() {
    this._render();
  }

  connectedCallback() {
    // Check initial theme
    const theme = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
    this._currentTheme = theme;
    this._updateToggleState();
    
    // Listen for theme changes
    document.addEventListener(THEME_CHANGE_EVENT, this._handleThemeChange.bind(this));
  }
  
  disconnectedCallback() {
    document.removeEventListener(THEME_CHANGE_EVENT, this._handleThemeChange.bind(this));
  }

  _handleThemeChange(event) {
    this._currentTheme = event.detail.theme;
    this._updateToggleState();
  }
  
  _updateToggleState() {
    const toggler = this._shadow.querySelector('.toggle-icon');
    if (toggler) {
      toggler.classList.toggle('toggled', this._currentTheme === DARK_THEME);
    }
  }

  _addEventListeners() {
    this._shadow.querySelector('.toggle-wrapper').addEventListener('click', () => {
      const newTheme = this._currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
      dispatchThemeChangeEvent(newTheme);
    });
  }

  _getStyles() {
    // Size calculations
    const sizeMap = {
      small: { size: '36px', iconSize: '22px' },
      medium: { size: '44px', iconSize: '28px' },
      large: { size: '54px', iconSize: '34px' }
    };
    
    const { size, iconSize } = sizeMap[this.size] || sizeMap.medium;
    
    return `
      :host {
        display: inline-block;
      }
      
      .toggle-wrapper {
        position: relative;
        width: ${size};
        height: ${size};
        border-radius: 50%;
        background: #f1f1f1;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        overflow: hidden;
      }
      
      .toggle-wrapper:hover {
        transform: scale(1.05);
      }
      
      .toggle-wrapper:active {
        transform: scale(0.95);
      }
      
      .toggle-icon {
        position: relative;
        width: ${iconSize};
        height: ${iconSize};
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      /* Sun icon with rays */
      .toggle-icon::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #FFB700;
        top: 0;
        left: 0;
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 0 20px #FFB700;
      }
      
      /* Sun rays */
      .toggle-icon::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        background: radial-gradient(
          circle, 
          transparent 45%, 
          #FFB700 45%, 
          #FFB700 55%, 
          transparent 55%
        );
        background-size: 20% 20%;
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      /* Dark mode - Morphing to Moon */
      .toggle-wrapper {
        background: linear-gradient(40deg, #2b3c5a, #3c4f6d);
      }
      
      .toggle-icon.toggled::before {
        background-color: #D8D8D8;
        box-shadow: 0 0 10px #D8D8D8;
        transform: scale(0.85);
      }
      
      .toggle-icon.toggled::after {
        opacity: 0;
        transform: scale(0.5) rotate(45deg);
      }
      
      /* Moon crater */
      .crater {
        position: absolute;
        background-color: #BBBBBB;
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .crater-1 {
        width: 20%;
        height: 20%;
        top: 25%;
        left: 25%;
      }
      
      .crater-2 {
        width: 14%;
        height: 14%;
        top: 55%;
        left: 65%;
      }
      
      .crater-3 {
        width: 12%;
        height: 12%;
        top: 40%;
        left: 60%;
      }
      
      .toggle-icon.toggled .crater {
        opacity: 1;
      }
    `;
  }

  _render() {
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <div class="toggle-wrapper" role="button" tabindex="0" aria-label="Toggle dark mode">
        <div class="toggle-icon ${this._currentTheme === DARK_THEME ? 'toggled' : ''}">
          <div class="crater crater-1"></div>
          <div class="crater crater-2"></div>
          <div class="crater crater-3"></div>
        </div>
      </div>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-theme-toggle')) {
  customElements.define('psypres-theme-toggle', PsypresThemeToggle);
} 