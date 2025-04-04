import './themeToggle.css';
import { THEME_CHANGE_EVENT, LIGHT_THEME, DARK_THEME, dispatchThemeChangeEvent } from '../ThemeProvider';

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

  _render() {
    this._shadow.innerHTML = `
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