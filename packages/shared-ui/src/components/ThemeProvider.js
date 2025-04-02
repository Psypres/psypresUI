// Theme event for communication between components
import '../themes/theme.css';
import { ThemeUtils } from '../themes/ThemeUtils.js';

export const THEME_CHANGE_EVENT = 'psypres-theme-change';

// Theme constants
export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

// Send theme change events
export function dispatchThemeChangeEvent(theme) {
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
    this._setupListeners();
  }

  static get observedAttributes() {
    return ['theme'];
  }

  get theme() {
    return this.getAttribute('theme') || LIGHT_THEME;
  }

  set theme(value) {
    this.setAttribute('theme', value);
    this._theme = value;
    this._updateTheme(value);
  }

  _getInitialTheme() {
    // Check for stored preference
    const storedTheme = localStorage.getItem('psypres-theme');
    if (storedTheme) {
      return storedTheme;
    }
    
    // Check for system preference using ThemeUtils
    if (ThemeUtils.systemPrefersDarkMode()) {
      return DARK_THEME;
    }
    
    // Default to light
    return LIGHT_THEME;
  }

  _setupListeners() {
    // Listen to theme change events from other components
    document.addEventListener(THEME_CHANGE_EVENT, (event) => {
      this.theme = event.detail.theme;
    });

    // Listen for system preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('psypres-theme')) {
          // Only update if user hasn't manually set a preference
          this.theme = e.matches ? DARK_THEME : LIGHT_THEME;
        }
      });
    }
  }

  _updateTheme(theme) {
    // Store preference
    localStorage.setItem('psypres-theme', theme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply contrast colors using ThemeUtils
    setTimeout(() => ThemeUtils.applyContrastColors(), 0);
    
    // Dispatch event for other components
    dispatchThemeChangeEvent(theme);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'theme' && oldValue !== newValue) {
      this._updateTheme(newValue);
    }
    this._render();
  }

  connectedCallback() {
    // Set initial theme
    this._updateTheme(this._theme);
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