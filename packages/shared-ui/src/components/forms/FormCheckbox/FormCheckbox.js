import './form-checkbox.css';

export class PsypresFormCheckbox extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._render();
    this._addEventListeners();
  }

  static get observedAttributes() {
    return ['name', 'label', 'checked', 'disabled'];
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get label() {
    return this.getAttribute('label') || '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    this._shadow.innerHTML = `
      <div class="form-checkbox-container">
        <label class="form-checkbox-label">
          <input
            type="checkbox"
            class="form-checkbox"
            name="${this.name}"
            ${this.checked ? 'checked' : ''}
            ${this.disabled ? 'disabled' : ''}
          />
          <span class="form-checkbox-text">${this.label}</span>
        </label>
      </div>
    `;
  }

  _addEventListeners() {
    const checkbox = this._shadow.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', (event) => {
      this.checked = event.target.checked;
      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { checked: event.target.checked }
      }));
    });
  }
}

// Define the custom element
if (!customElements.get('psypres-form-checkbox')) {
  customElements.define('psypres-form-checkbox', PsypresFormCheckbox);
} 