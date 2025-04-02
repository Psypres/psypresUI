import { THEME_CHANGE_EVENT, LIGHT_THEME, DARK_THEME, dispatchThemeChangeEvent } from './ThemeProvider.js';
import '../themes/theme.css';

export class PsypresThemeToggle extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._currentTheme = LIGHT_THEME;
    this._render();
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
    this._addEventListeners();
  }

  connectedCallback() {
    // Check initial theme
    const theme = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
    this._currentTheme = theme;
    this._updateToggleState();
    this._addEventListeners();
    
    // Listen for theme changes
    document.addEventListener(THEME_CHANGE_EVENT, this._handleThemeChange.bind(this));
    
    // Debug info
    console.log('ThemeToggle connected, current theme:', this._currentTheme);
  }
  
  disconnectedCallback() {
    // Clean up event listeners
    const wrapper = this._shadow.querySelector('.toggle-wrapper');
    if (wrapper) {
      wrapper.removeEventListener('click', this._handleClick);
      wrapper.removeEventListener('keydown', this._handleKeyDown);
    }
    document.removeEventListener(THEME_CHANGE_EVENT, this._handleThemeChange);
  }

  _handleThemeChange = (event) => {
    console.log('Theme change event received:', event.detail.theme);
    this._currentTheme = event.detail.theme;
    this._updateToggleState();
  }
  
  _handleClick = () => {
    console.log('Toggle clicked, current theme:', this._currentTheme);
    const newTheme = this._currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    console.log('Switching to:', newTheme);
    this._currentTheme = newTheme; // Update local state immediately
    this._updateToggleState(); // Update UI
    dispatchThemeChangeEvent(newTheme); // Notify others
  }
  
  _handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  }
  
  _updateToggleState() {
    const toggler = this._shadow.querySelector('.toggle-icon');
    const wrapper = this._shadow.querySelector('.toggle-wrapper');
    if (toggler && wrapper) {
      console.log('Updating toggle state to:', this._currentTheme);
      toggler.classList.toggle('toggled', this._currentTheme === DARK_THEME);
      wrapper.classList.toggle('dark', this._currentTheme === DARK_THEME);
      wrapper.setAttribute('aria-pressed', this._currentTheme === DARK_THEME ? 'true' : 'false');
    }
  }

  _addEventListeners() {
    const wrapper = this._shadow.querySelector('.toggle-wrapper');
    if (wrapper) {
      // Remove old listeners if they exist
      wrapper.removeEventListener('click', this._handleClick);
      wrapper.removeEventListener('keydown', this._handleKeyDown);
      
      // Add fresh listeners
      wrapper.addEventListener('click', this._handleClick);
      wrapper.addEventListener('keydown', this._handleKeyDown);
    }
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
        background: linear-gradient(40deg, #f8f8f8, #ffffff);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        overflow: hidden;
        user-select: none;
      }
      
      .toggle-wrapper.dark {
        background: linear-gradient(40deg, #2b3c5a, #3c4f6d);
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
        background: repeating-conic-gradient(
          #FFB700 0deg,
          #FFB700 10deg,
          transparent 10deg,
          transparent 50deg
        );
        opacity: 0.8;
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      
      /* Dark mode - Morphing to Moon */
      .toggle-icon.toggled::before {
        background-color: #D8D8D8;
        box-shadow: 0 0 10px rgba(216, 216, 216, 0.5);
        transform: scale(0.85) translateX(15%);
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
        transition: opacity 0.3s ease 0.2s;
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
      <div class="toggle-wrapper ${this._currentTheme === DARK_THEME ? 'dark' : ''}" role="button" tabindex="0" aria-label="Toggle dark mode" aria-pressed="${this._currentTheme === DARK_THEME ? 'true' : 'false'}">
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