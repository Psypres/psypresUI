import { 
  getContrastColor,
  createColorPalette
} from '../utils/color.js';
import { ThemeUtils } from '../themes/ThemeUtils.js';

export default class DynamicThemeDemo extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._baseColor = '#4299e1';
    this._colorPalette = createColorPalette(this._baseColor);
    this._render();
    this._setupEventListeners();
  }

  _setupEventListeners() {
    const colorPicker = this._shadow.querySelector('#color-picker');
    const applyButton = this._shadow.querySelector('.apply-button');
    
    colorPicker.addEventListener('input', (e) => {
      this._baseColor = e.target.value;
      this._colorPalette = createColorPalette(this._baseColor);
      this._updateColorPalette();
    });
    
    applyButton.addEventListener('click', () => {
      console.log('Apply button clicked, setting color to:', this._baseColor);
      
      // Set CSS variables dynamically
      document.documentElement.style.setProperty('--psypres-primary-color', this._baseColor);
      // Recalculate contrast colors
      ThemeUtils.applyContrastColors();
      
      // Dispatch theme change event
      console.log('Dispatching psypres-theme-change event');
      window.dispatchEvent(new CustomEvent('psypres-theme-change', {
        detail: { 
          primaryColor: this._baseColor,
          colorPalette: this._colorPalette
        }
      }));
      
      // Also try to directly update the buttons
      this._directlyUpdateButtons();
    });
  }
  
  _directlyUpdateButtons() {
    console.log('Directly updating buttons');
    const buttons = this._shadow.querySelectorAll('psypres-button');
    console.log('Found buttons:', buttons.length);
    
    buttons.forEach(button => {
      console.log('Updating button:', button);
      // Force a re-render by temporarily changing and restoring an attribute
      const currentVariant = button.variant;
      button.setAttribute('variant', 'temp');
      setTimeout(() => {
        button.setAttribute('variant', currentVariant);
      }, 0);
    });
  }
  
  _updateColorPalette() {
    const blocks = this._shadow.querySelectorAll('.color-block');
    const colors = [
      this._colorPalette.lighter,
      this._colorPalette.light,
      this._colorPalette.base,
      this._colorPalette.dark,
      this._colorPalette.darker
    ];
    const names = ['Lighter', 'Light', 'Base', 'Dark', 'Darker'];
    
    blocks.forEach((block, index) => {
      const color = colors[index];
      const textColor = getContrastColor(color);
      block.style.backgroundColor = color;
      block.style.color = textColor;
      block.textContent = names[index];
    });
  }

  _getStyles() {
    return `
      :host {
        display: block;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        color: var(--psypres-text-color, #333);
        max-width: 600px;
        margin: 0 auto;
      }
      
      h3, h4 {
        margin-top: 0;
        color: var(--psypres-heading-color, #222);
      }
      
      .section {
        margin-bottom: 1.5rem;
      }
      
      label {
        display: block;
        margin-bottom: 0.5rem;
      }
      
      .color-picker-row {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      #color-picker {
        width: 50px;
        height: 50px;
        border: none;
        cursor: pointer;
      }
      
      .apply-button {
        background-color: var(--psypres-primary-color, #4299e1);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        font-weight: 600;
        cursor: pointer;
      }
      
      .apply-button:hover {
        filter: brightness(0.9);
      }
      
      .color-palette {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 1rem;
      }
      
      .color-block {
        background-color: #f0f0f0;
        padding: 1rem;
        border-radius: 4px;
        text-align: center;
        width: 100px;
        font-weight: bold;
      }
      
      .button-examples {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }
    `;
  }

  _render() {
    const colorPalette = this._colorPalette;
    
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <div class="dynamic-theme-demo">
        <h3>Dynamic Contrast Demo</h3>
        
        <div class="section">
          <label for="color-picker">Choose a primary color:</label>
          <div class="color-picker-row">
            <input 
              type="color" 
              id="color-picker"
              value="${this._baseColor}"
            />
            <button class="apply-button">Apply to Theme</button>
          </div>
        </div>
        
        <div class="section">
          <h4>Color Palette Preview:</h4>
          <div class="color-palette">
            <div class="color-block" style="background-color: ${colorPalette.lighter}; color: ${getContrastColor(colorPalette.lighter)};">Lighter</div>
            <div class="color-block" style="background-color: ${colorPalette.light}; color: ${getContrastColor(colorPalette.light)};">Light</div>
            <div class="color-block" style="background-color: ${colorPalette.base}; color: ${getContrastColor(colorPalette.base)};">Base</div>
            <div class="color-block" style="background-color: ${colorPalette.dark}; color: ${getContrastColor(colorPalette.dark)};">Dark</div>
            <div class="color-block" style="background-color: ${colorPalette.darker}; color: ${getContrastColor(colorPalette.darker)};">Darker</div>
          </div>
        </div>
        
        <div class="section">
          <h4>Button Examples:</h4>
          <div class="button-examples">
            <psypres-button variant="primary">Primary</psypres-button>
            <psypres-button variant="secondary">Secondary</psypres-button>
            <psypres-button variant="success">Success</psypres-button>
            <psypres-button variant="danger">Danger</psypres-button>
          </div>
        </div>
        
        <div class="section" style="margin-top: 2rem;">
          <h4>Theme Toggle:</h4>
          <psypres-theme-toggle size="medium"></psypres-theme-toggle>
        </div>
      </div>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-dynamic-theme-demo')) {
  customElements.define('psypres-dynamic-theme-demo', DynamicThemeDemo);
} 