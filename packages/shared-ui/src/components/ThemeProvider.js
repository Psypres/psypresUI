// Theme event for communication between components
import '../themes/theme.css';
import { ThemeUtils } from '../themes/ThemeUtils.js';

export const THEME_CHANGE_EVENT = 'psypres-theme-change';

// Theme constants
export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

// Send theme change events
export function dispatchThemeChangeEvent(theme) {
  console.log('Dispatching theme change event:', theme);
  const event = new CustomEvent(THEME_CHANGE_EVENT, { 
    bubbles: true, 
    composed: true,
    detail: { theme }
  });
  document.dispatchEvent(event);
}

// Class to provide theme functionality
export class PsypresThemeProvider extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._theme = this._getInitialTheme();
    this._render();
  }

  connectedCallback() {
    this._setupListeners();
    // Set initial theme
    this._updateTheme(this._theme);
    console.log('ThemeProvider connected, initial theme:', this._theme);
  }

  disconnectedCallback() {
    // Clean up event listeners
    document.removeEventListener(THEME_CHANGE_EVENT, this._handleThemeChange);
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this._handleSystemPreferenceChange);
    }
  }

  static get observedAttributes() {
    return ['theme'];
  }

  get theme() {
    return this.getAttribute('theme') || LIGHT_THEME;
  }

  set theme(value) {
    this.setAttribute('theme', value);
  }

  _handleThemeChange = (event) => {
    console.log('ThemeProvider received theme change event:', event.detail.theme);
    this.theme = event.detail.theme;
    this._theme = event.detail.theme;
    this._updateTheme(event.detail.theme);
  }

  _handleSystemPreferenceChange = (e) => {
    if (!localStorage.getItem('psypres-theme')) {
      // Only update if user hasn't manually set a preference
      const newTheme = e.matches ? DARK_THEME : LIGHT_THEME;
      console.log('System preference changed, updating to:', newTheme);
      this.theme = newTheme;
    }
  }

  _getInitialTheme() {
    // Check for stored preference
    const storedTheme = localStorage.getItem('psypres-theme');
    if (storedTheme) {
      console.log('Using stored theme preference:', storedTheme);
      return storedTheme;
    }
    
    // Check for system preference using ThemeUtils
    if (ThemeUtils.systemPrefersDarkMode()) {
      console.log('Using system dark mode preference');
      return DARK_THEME;
    }
    
    // Default to light
    console.log('Using default light theme');
    return LIGHT_THEME;
  }

  _setupListeners() {
    // Listen to theme change events from other components
    document.addEventListener(THEME_CHANGE_EVENT, this._handleThemeChange);

    // Listen for system preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this._handleSystemPreferenceChange);
    }
  }

  _updateTheme(theme) {
    console.log('ThemeProvider updating theme to:', theme);
    
    // Store preference
    localStorage.setItem('psypres-theme', theme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply contrast colors using ThemeUtils
    setTimeout(() => ThemeUtils.applyContrastColors(), 0);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'theme' && oldValue !== newValue) {
      console.log('ThemeProvider attribute changed from', oldValue, 'to', newValue);
      this._theme = newValue;
      this._updateTheme(newValue);
    }
    this._render();
  }

  _getStyles() {
    return `
      :host {
        display: contents;
      }
    `;
  }

  _render() {
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <slot></slot>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-theme-provider')) {
  customElements.define('psypres-theme-provider', PsypresThemeProvider);
} 