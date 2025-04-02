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
    const checkbox = this._shadow.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.checked = this._currentTheme === DARK_THEME;
    }
  }

  _addEventListeners() {
    this._shadow.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
      const newTheme = e.target.checked ? DARK_THEME : LIGHT_THEME;
      dispatchThemeChangeEvent(newTheme);
    });
  }

  _getStyles() {
    return `
      :host {
        display: inline-block;
      }
      
      .toggle-container {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .toggle {
        position: relative;
        display: inline-block;
      }
      
      .toggle.small {
        width: 36px;
        height: 20px;
      }
      
      .toggle.medium {
        width: 48px;
        height: 24px;
      }
      
      .toggle.large {
        width: 60px;
        height: 30px;
      }
      
      input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 34px;
      }
      
      .slider:before {
        position: absolute;
        content: "";
        height: calc(100% - 4px);
        width: calc(50% - 4px);
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }
      
      input:checked + .slider {
        background-color: #2196F3;
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
      
      input:checked + .slider:before {
        transform: translateX(100%);
      }
      
      /* Icons */
      .icon {
        font-size: ${this.size === 'small' ? '14px' : this.size === 'large' ? '20px' : '16px'};
        color: #555;
      }
      
      .sun-icon::after {
        content: "☀️";
      }
      
      .moon-icon::after {
        content: "🌙";
      }
    `;
  }

  _render() {
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <div class="toggle-container">
        <span class="icon sun-icon"></span>
        <label class="toggle ${this.size}">
          <input type="checkbox" ${this._currentTheme === DARK_THEME ? 'checked' : ''}>
          <span class="slider"></span>
        </label>
        <span class="icon moon-icon"></span>
      </div>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-theme-toggle')) {
  customElements.define('psypres-theme-toggle', PsypresThemeToggle);
} 