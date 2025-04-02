import '../themes/theme.css';

export class PsypresHeader extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
  }

  static get observedAttributes() {
    return ['title', 'navItems'];
  }

  get title() {
    return this.getAttribute('title') || '';
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get navItems() {
    const navItemsAttr = this.getAttribute('navItems');
    if (!navItemsAttr) return [];
    
    try {
      return JSON.parse(navItemsAttr);
    } catch (e) {
      console.error('Invalid navItems format', e);
      return [];
    }
  }

  set navItems(value) {
    if (Array.isArray(value)) {
      this.setAttribute('navItems', JSON.stringify(value));
    } else {
      this.removeAttribute('navItems');
    }
  }

  attributeChangedCallback() {
    this._render();
  }

  _getStyles() {
    return `
      :host {
        display: block;
        width: 100%;
      }
      
      .header {
        font-family: 'Arial', sans-serif;
        background-color: var(--psypres-header-bg);
        color: var(--psypres-header-text);
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--psypres-header-border);
        box-shadow: 0 2px 4px var(--psypres-shadow-color);
      }
      
      .header-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
      }
      
      .nav {
        display: flex;
        gap: 1.5rem;
      }
      
      .nav-item {
        text-decoration: none;
        color: var(--psypres-header-text);
        font-weight: 500;
        transition: color 0.2s ease;
      }
      
      .nav-item:hover {
        color: var(--psypres-primary-color);
      }
      
      @media (max-width: 768px) {
        .header {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .nav {
          flex-direction: column;
          width: 100%;
          gap: 0.5rem;
        }
        
        .nav-item {
          padding: 0.5rem 0;
        }
      }
    `;
  }

  _render() {
    const navItemsHTML = this.navItems.length 
      ? `
        <nav class="nav">
          ${this.navItems.map(item => `
            <a href="${item.url}" class="nav-item">${item.label}</a>
          `).join('')}
        </nav>
      ` 
      : '';
    
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <header class="header">
        <h1 class="header-title">${this.title}</h1>
        ${navItemsHTML}
      </header>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-header')) {
  customElements.define('psypres-header', PsypresHeader);
} 