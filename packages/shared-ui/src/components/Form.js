import '../themes/theme.css';

export class PsypresForm extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._formElements = [];
    this._formData = {};
    this._render();
    this._setupEventListeners();
  }

  static get observedAttributes() {
    return [
      'disabled',
      'loading',
      'layout'
    ];
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
    this._updateChildrenState();
  }

  get loading() {
    return this.hasAttribute('loading');
  }

  set loading(value) {
    if (value) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
    this._updateChildrenState();
  }

  get layout() {
    return this.getAttribute('layout') || 'vertical';
  }

  set layout(value) {
    if (value === 'vertical' || value === 'horizontal' || value === 'grid') {
      this.setAttribute('layout', value);
    } else {
      console.error('Layout must be "vertical", "horizontal", or "grid"');
    }
  }
  
  connectedCallback() {
    // Once the component is connected to the DOM, observe child mutations
    this._observer = new MutationObserver(() => this._updateFormElements());
    this._observer.observe(this, { childList: true, subtree: true });
    
    // Initial form elements collection
    this._updateFormElements();
  }

  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._render();
    if (name === 'disabled' || name === 'loading') {
      this._updateChildrenState();
    }
  }

  submit() {
    // Programmatically submit the form
    const form = this._shadow.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit'));
    }
  }

  reset() {
    // Reset all form elements
    this._formElements.forEach(element => {
      if (typeof element.reset === 'function') {
        element.reset();
      }
    });
    
    this._formData = {};
    
    // Dispatch a reset event
    this.dispatchEvent(new CustomEvent('reset', {
      bubbles: true,
      composed: true
    }));
  }

  validate() {
    // Validate all form elements
    let isValid = true;
    const formData = {};
    
    this._formElements.forEach(element => {
      // Check if element has a validate method
      if (typeof element.validate === 'function') {
        const elementValid = element.validate();
        isValid = isValid && elementValid;
      }
      
      // Collect form data
      if (element.name) {
        if (element.tagName.toLowerCase() === 'psypres-form-checkbox') {
          // Handle checkboxes differently
          if (element.type === 'checkbox') {
            if (element.checked) {
              if (formData[element.name] === undefined) {
                formData[element.name] = element.value || true;
              } else if (Array.isArray(formData[element.name])) {
                formData[element.name].push(element.value || true);
              } else {
                formData[element.name] = [formData[element.name], element.value || true];
              }
            }
          } else if (element.type === 'radio' && element.checked) {
            formData[element.name] = element.value;
          }
        } else {
          // Handle regular inputs, textareas, and selects
          formData[element.name] = element.value;
        }
      }
    });
    
    this._formData = formData;
    return isValid;
  }

  getFormData() {
    // Return the current form data
    return { ...this._formData };
  }

  _updateFormElements() {
    // Find all form elements in the Light DOM (as children of this component)
    this._formElements = Array.from(this.querySelectorAll([
      'psypres-form-input',
      'psypres-form-textarea',
      'psypres-form-select',
      'psypres-form-checkbox'
    ].join(',')));
    
    // Update their state based on form's disabled/loading state
    this._updateChildrenState();
  }

  _updateChildrenState() {
    const isDisabled = this.disabled || this.loading;
    
    this._formElements.forEach(element => {
      element.disabled = isDisabled;
    });
  }

  _setupEventListeners() {
    const form = this._shadow.querySelector('form');
    if (!form) return;
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      // Don't submit if form is disabled or loading
      if (this.disabled || this.loading) {
        return;
      }
      
      const isValid = this.validate();
      
      if (isValid) {
        // Form is valid, dispatch submit event with form data
        this.dispatchEvent(new CustomEvent('submit', {
          bubbles: true,
          composed: true,
          detail: { 
            formData: this.getFormData() 
          }
        }));
      } else {
        // Form is invalid, dispatch invalid event
        this.dispatchEvent(new CustomEvent('invalid', {
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  _getStyles() {
    return `
      :host {
        display: block;
        font-family: 'Arial', sans-serif;
      }
      
      form {
        width: 100%;
      }
      
      .content-slot {
        display: block;
      }
      
      .form-${this.layout} {
        width: 100%;
      }
      
      .form-horizontal {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: flex-end;
      }
      
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }
    `;
  }

  _render() {
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <form class="form-${this.layout}" novalidate>
        <div class="content-slot">
          <slot></slot>
        </div>
      </form>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-form')) {
  customElements.define('psypres-form', PsypresForm);
} 