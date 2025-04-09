import { PsypresThemedButton } from '../components/actions/ThemedButton';

export default class ButtonDemo extends HTMLElement {
  constructor() {
    super();
    console.log('ButtonDemo constructor');
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
  }

  _getStyles() {
    return `
      <style>
        :host {
          display: block;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .demo-section {
          margin-bottom: 30px;
        }
        
        h2 {
          margin-top: 0;
          margin-bottom: 15px;
          color: var(--psypres-text-color, #333);
        }
        
        .button-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .demo-label {
          font-weight: bold;
          margin-bottom: 5px;
          color: var(--psypres-text-color, #333);
        }
      </style>
    `;
  }

  connectedCallback() {
    console.log('ButtonDemo connected to DOM');
    // Ensure the component is re-rendered when connected to DOM
    this._render();
  }

  _render() {
    console.log('Rendering ButtonDemo');
    this._shadow.innerHTML = `
      ${this._getStyles()}
      
      <div class="demo-section">
        <h2>Themed Button Variants</h2>
        <div class="button-row">
          <psypres-themed-button variant="primary">Primary</psypres-themed-button>
          <psypres-themed-button variant="secondary">Secondary</psypres-themed-button>
          <psypres-themed-button variant="success">Success</psypres-themed-button>
          <psypres-themed-button variant="danger">Danger</psypres-themed-button>
          <psypres-themed-button variant="outline">Outline</psypres-themed-button>
        </div>
      </div>
      
      <div class="demo-section">
        <h2>Themed Button Sizes</h2>
        <div class="button-row">
          <psypres-themed-button variant="primary" size="small">Small</psypres-themed-button>
          <psypres-themed-button variant="primary" size="medium">Medium</psypres-themed-button>
          <psypres-themed-button variant="primary" size="large">Large</psypres-themed-button>
        </div>
      </div>
      
      <div class="demo-section">
        <h2>Disabled Buttons</h2>
        <div class="button-row">
          <psypres-themed-button variant="primary" disabled>Disabled Primary</psypres-themed-button>
          <psypres-themed-button variant="outline" disabled>Disabled Outline</psypres-themed-button>
        </div>
      </div>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-button-demo')) {
  console.log('Registering psypres-button-demo');
  customElements.define('psypres-button-demo', ButtonDemo);
} else {
  console.log('psypres-button-demo already registered');
} 