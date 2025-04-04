import './header.css';

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