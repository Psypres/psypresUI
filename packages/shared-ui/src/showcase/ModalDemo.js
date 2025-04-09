import { PsypresButton } from '../components/actions/Button';
import { PsypresModal } from '../components/overlays/Modal/Modal.js';

export default class ModalDemo extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._basicModalOpen = false;
    this._customModalOpen = false;
    this._formModalOpen = false;
    this._render();
    this._setupEventListeners();
  }

  _setupEventListeners() {
    // Basic modal
    const openBasicBtn = this._shadow.querySelector('#open-basic-modal');
    const basicModal = this._shadow.querySelector('#basic-modal');
    
    openBasicBtn.addEventListener('click', () => {
      basicModal.showModal();
      this._basicModalOpen = true;
    });
    
    basicModal.addEventListener('modal-close', () => {
      this._basicModalOpen = false;
    });
    
    // Custom modal
    const openCustomBtn = this._shadow.querySelector('#open-custom-modal');
    const customModal = this._shadow.querySelector('#custom-modal');
    
    openCustomBtn.addEventListener('click', () => {
      customModal.showModal();
      this._customModalOpen = true;
    });
    
    customModal.addEventListener('modal-close', () => {
      this._customModalOpen = false;
    });
    
    // Form modal
    const openFormBtn = this._shadow.querySelector('#open-form-modal');
    const formModal = this._shadow.querySelector('#form-modal');
    const formSubmitBtn = this._shadow.querySelector('#form-submit');
    
    openFormBtn.addEventListener('click', () => {
      formModal.showModal();
      this._formModalOpen = true;
    });
    
    formModal.addEventListener('modal-close', () => {
      this._formModalOpen = false;
    });
    
    formSubmitBtn.addEventListener('click', () => {
      const name = this._shadow.querySelector('#name-input').value;
      const email = this._shadow.querySelector('#email-input').value;
      
      if (name && email) {
        alert(`Form submitted with: ${name} (${email})`);
        formModal.closeModal();
      } else {
        alert('Please fill out all fields');
      }
    });
  }

  _getStyles() {
    return `
      :host {
        display: block;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        color: var(--psypres-text-color, #333);
        max-width: 800px;
        margin: 0 auto;
      }
      
      section {
        margin-bottom: 2rem;
      }
      
      h3 {
        margin-top: 0;
        color: var(--psypres-heading-color, #222);
      }
      
      .demo-buttons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 1rem;
      }
      
      .custom-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      
      .custom-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        color: var(--psypres-success-color, #48bb78);
      }
      
      .form-group {
        margin-bottom: 1rem;
      }
      
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      
      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--psypres-border-color, #e2e8f0);
        border-radius: 4px;
        font-size: 1rem;
      }
      
      .modal-footer-buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
    `;
  }

  _render() {
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <h3>Modal Examples</h3>
      
      <section>
        <h4>Basic Modal</h4>
        <p>A simple modal with a title and content.</p>
        <div class="demo-buttons">
          <psypres-button id="open-basic-modal" variant="primary">Open Basic Modal</psypres-button>
        </div>
        
        <psypres-modal 
          id="basic-modal" 
          title="Basic Modal" 
          size="medium"
          close-on-overlay
        >
          <p>This is a basic modal with some content.</p>
          <p>Click outside or the X to close.</p>
        </psypres-modal>
      </section>
      
      <section>
        <h4>Custom Modal</h4>
        <p>A modal with custom content and no close button.</p>
        <div class="demo-buttons">
          <psypres-button id="open-custom-modal" variant="secondary">Open Custom Modal</psypres-button>
        </div>
        
        <psypres-modal 
          id="custom-modal" 
          title="Success" 
          size="small"
          hide-close-button
        >
          <div class="custom-content">
            <div class="custom-icon">✓</div>
            <h3>Operation Successful!</h3>
            <p>Your changes have been saved successfully.</p>
          </div>
          
          <div slot="footer">
            <psypres-button variant="primary" id="custom-close-btn" onclick="this.closest('psypres-modal').closeModal()">Continue</psypres-button>
          </div>
        </psypres-modal>
      </section>
      
      <section>
        <h4>Form Modal</h4>
        <p>A modal containing a form with validation.</p>
        <div class="demo-buttons">
          <psypres-button id="open-form-modal" variant="primary">Open Form Modal</psypres-button>
        </div>
        
        <psypres-modal 
          id="form-modal" 
          title="Contact Form" 
          size="medium"
        >
          <form id="contact-form">
            <div class="form-group">
              <label for="name-input">Name</label>
              <input type="text" id="name-input" placeholder="Enter your name" required>
            </div>
            
            <div class="form-group">
              <label for="email-input">Email</label>
              <input type="email" id="email-input" placeholder="Enter your email" required>
            </div>
            
            <div class="form-group">
              <label for="message-input">Message</label>
              <textarea id="message-input" rows="4" placeholder="Your message" style="width: 100%; padding: 0.5rem; border: 1px solid var(--psypres-border-color, #e2e8f0); border-radius: 4px; font-size: 1rem;"></textarea>
            </div>
          </form>
          
          <div slot="footer" class="modal-footer-buttons">
            <psypres-button variant="secondary" onclick="this.closest('psypres-modal').closeModal()">Cancel</psypres-button>
            <psypres-button id="form-submit" variant="primary">Submit</psypres-button>
          </div>
        </psypres-modal>
      </section>
    `;
  }
}

// Define the custom element
if (!customElements.get('psypres-modal-demo')) {
  customElements.define('psypres-modal-demo', ModalDemo);
} 