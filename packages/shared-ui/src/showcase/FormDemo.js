import { PsypresForm } from '../components/Form.js';
import { PsypresFormInput } from '../components/FormInput.js';
import { PsypresFormTextarea } from '../components/FormTextarea.js';
import { PsypresFormSelect } from '../components/FormSelect.js';
import { PsypresFormCheckbox } from '../components/FormCheckbox.js';
import { PsypresButton } from '../components/Button.js';

export default class FormDemo extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._formSubmissions = [];
    this._activeTab = 'basic';
    this._render();
    this._setupEventListeners();
  }

  _setupEventListeners() {
    // Handle form submissions
    this._attachFormListeners('basic-form');
    this._attachFormListeners('advanced-form');
    this._attachFormListeners('horizontal-form');
    this._attachFormListeners('grid-form');
    
    // Handle tab switching
    const tabs = this._shadow.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this._activeTab = tab.dataset.tab;
        this._updateTabs();
      });
    });
  }

  _attachFormListeners(formId) {
    const form = this._shadow.getElementById(formId);
    if (!form) return;
    
    // Reset button
    const resetBtn = this._shadow.querySelector(`#${formId} .reset-btn`);
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        this._updateSubmissionDisplay(formId, null);
      });
    }
    
    // Submit event
    form.addEventListener('submit', (e) => {
      const formData = e.detail.formData;
      this._formSubmissions[formId] = formData;
      this._updateSubmissionDisplay(formId, formData);
    });
    
    // Invalid event
    form.addEventListener('invalid', () => {
      console.log(`Form ${formId} is invalid`);
    });
  }

  _updateSubmissionDisplay(formId, formData) {
    const display = this._shadow.querySelector(`#${formId}-result`);
    if (!display) return;
    
    if (formData) {
      const formatted = JSON.stringify(formData, null, 2);
      display.textContent = formatted;
      display.parentElement.style.display = 'block';
    } else {
      display.textContent = '';
      display.parentElement.style.display = 'none';
    }
  }

  _updateTabs() {
    // Update active tab
    const tabs = this._shadow.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
      if (tab.dataset.tab === this._activeTab) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Show/hide content
    const contents = this._shadow.querySelectorAll('.tab-content');
    contents.forEach(content => {
      if (content.id === `${this._activeTab}-tab`) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
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
      
      .form-demo-container {
        border: 1px solid var(--psypres-border-color, #e2e8f0);
        border-radius: 8px;
        overflow: hidden;
      }
      
      .tabs {
        display: flex;
        background-color: var(--psypres-component-bg, #f7fafc);
        border-bottom: 1px solid var(--psypres-border-color, #e2e8f0);
      }
      
      .tab-item {
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .tab-item:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      
      .tab-item.active {
        border-bottom-color: var(--psypres-primary-color, #4299e1);
        color: var(--psypres-primary-color, #4299e1);
      }
      
      .tab-content {
        padding: 1.5rem;
        display: none;
      }
      
      .tab-content.active {
        display: block;
      }
      
      .form-section {
        margin-bottom: 1.5rem;
      }
      
      .form-title {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        color: var(--psypres-heading-color, #2d3748);
      }
      
      .form-description {
        margin-bottom: 1.5rem;
        color: var(--psypres-secondary-text, #718096);
      }
      
      .form-footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid var(--psypres-border-color, #e2e8f0);
      }
      
      .radio-group,
      .checkbox-group {
        margin-bottom: 1rem;
      }
      
      .form-group-label {
        font-weight: 500;
        display: block;
        margin-bottom: 0.5rem;
      }
      
      .result-container {
        margin-top: 1.5rem;
        padding: 1rem;
        background-color: var(--psypres-component-bg, #f7fafc);
        border-radius: 4px;
        display: none;
      }
      
      .result-title {
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      
      .result-data {
        font-family: monospace;
        white-space: pre-wrap;
        padding: 0.75rem;
        background-color: var(--psypres-code-bg, #edf2f7);
        border-radius: 4px;
        overflow-x: auto;
      }
    `;
  }

  _render() {
    this._shadow.innerHTML = `
      <style>${this._getStyles()}</style>
      <div class="form-demo-container">
        <div class="tabs">
          <div class="tab-item active" data-tab="basic">Basic Form</div>
          <div class="tab-item" data-tab="advanced">Advanced Form</div>
          <div class="tab-item" data-tab="layouts">Form Layouts</div>
        </div>
        
        <!-- Basic Form Tab -->
        <div id="basic-tab" class="tab-content" style="display: block;">
          <div class="form-section">
            <h3 class="form-title">Basic Form Example</h3>
            <p class="form-description">A simple form with common input types and validation.</p>
            
            <psypres-form id="basic-form">
              <psypres-form-input 
                label="Full Name" 
                name="fullName" 
                placeholder="Enter your full name"
                required
              ></psypres-form-input>
              
              <psypres-form-input 
                label="Email" 
                name="email" 
                type="email"
                placeholder="Enter your email address"
                required
                help-text="We'll never share your email with anyone else."
              ></psypres-form-input>
              
              <psypres-form-input 
                label="Password" 
                name="password" 
                type="password"
                placeholder="Enter a secure password"
                required
                help-text="Password must be at least 8 characters long"
                pattern=".{8,}"
              ></psypres-form-input>
              
              <psypres-form-checkbox
                label="I agree to the terms and conditions"
                name="agreeTerms"
                required
              ></psypres-form-checkbox>
              
              <div class="form-footer">
                <psypres-button class="reset-btn" variant="secondary">Reset</psypres-button>
                <psypres-button variant="primary" onclick="this.closest('psypres-form').submit()">Submit</psypres-button>
              </div>
            </psypres-form>
            
            <div class="result-container">
              <div class="result-title">Form Submission:</div>
              <pre id="basic-form-result" class="result-data"></pre>
            </div>
          </div>
        </div>
        
        <!-- Advanced Form Tab -->
        <div id="advanced-tab" class="tab-content">
          <div class="form-section">
            <h3 class="form-title">Advanced Form Example</h3>
            <p class="form-description">A more complex form with various input types.</p>
            
            <psypres-form id="advanced-form">
              <psypres-form-input 
                label="Full Name" 
                name="fullName" 
                required
              ></psypres-form-input>
              
              <psypres-form-input 
                label="Email" 
                name="email" 
                type="email"
                required
              ></psypres-form-input>
              
              <psypres-form-select
                label="Department"
                name="department"
                required
                options='[
                  {"value": "", "label": "Select a department", "disabled": true},
                  {"value": "engineering", "label": "Engineering"},
                  {"value": "marketing", "label": "Marketing"},
                  {"value": "sales", "label": "Sales"},
                  {"value": "support", "label": "Customer Support"}
                ]'
              ></psypres-form-select>
              
              <psypres-form-textarea
                label="Message"
                name="message"
                placeholder="Enter your message"
                rows="4"
                required
              ></psypres-form-textarea>
              
              <div class="form-group">
                <div class="form-group-label">Preferred Contact Method</div>
                <div class="radio-group">
                  <psypres-form-checkbox
                    type="radio"
                    name="contactMethod"
                    value="email"
                    label="Email"
                    checked
                  ></psypres-form-checkbox>
                  
                  <psypres-form-checkbox
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    label="Phone"
                  ></psypres-form-checkbox>
                  
                  <psypres-form-checkbox
                    type="radio"
                    name="contactMethod"
                    value="mail"
                    label="Mail"
                  ></psypres-form-checkbox>
                </div>
              </div>
              
              <div class="form-group">
                <div class="form-group-label">Interests</div>
                <div class="checkbox-group">
                  <psypres-form-checkbox
                    name="interests"
                    value="technology"
                    label="Technology"
                  ></psypres-form-checkbox>
                  
                  <psypres-form-checkbox
                    name="interests"
                    value="design"
                    label="Design"
                  ></psypres-form-checkbox>
                  
                  <psypres-form-checkbox
                    name="interests"
                    value="business"
                    label="Business"
                  ></psypres-form-checkbox>
                </div>
              </div>
              
              <div class="form-footer">
                <psypres-button class="reset-btn" variant="secondary">Reset</psypres-button>
                <psypres-button variant="primary" onclick="this.closest('psypres-form').submit()">Submit</psypres-button>
              </div>
            </psypres-form>
            
            <div class="result-container">
              <div class="result-title">Form Submission:</div>
              <pre id="advanced-form-result" class="result-data"></pre>
            </div>
          </div>
        </div>
        
        <!-- Form Layouts Tab -->
        <div id="layouts-tab" class="tab-content">
          <div class="form-section">
            <h3 class="form-title">Horizontal Layout</h3>
            <p class="form-description">Form elements arranged horizontally.</p>
            
            <psypres-form id="horizontal-form" layout="horizontal">
              <psypres-form-input 
                label="Name" 
                name="name" 
                placeholder="Name"
                required
              ></psypres-form-input>
              
              <psypres-form-input 
                label="Email" 
                name="email" 
                type="email"
                placeholder="Email"
                required
              ></psypres-form-input>
              
              <psypres-form-select
                label="Role"
                name="role"
                required
                options='["User", "Admin", "Editor"]'
              ></psypres-form-select>
              
              <div style="flex-basis: 100%; margin-bottom: 0.5rem;">
                <psypres-button class="reset-btn" variant="secondary" size="small">Reset</psypres-button>
                <psypres-button variant="primary" size="small" onclick="this.closest('psypres-form').submit()">Submit</psypres-button>
              </div>
            </psypres-form>
            
            <div class="result-container">
              <div class="result-title">Form Submission:</div>
              <pre id="horizontal-form-result" class="result-data"></pre>
            </div>
          </div>
          
          <div class="form-section">
            <h3 class="form-title">Grid Layout</h3>
            <p class="form-description">Form elements arranged in a responsive grid.</p>
            
            <psypres-form id="grid-form" layout="grid">
              <psypres-form-input 
                label="First Name" 
                name="firstName" 
                required
              ></psypres-form-input>
              
              <psypres-form-input 
                label="Last Name" 
                name="lastName" 
                required
              ></psypres-form-input>
              
              <psypres-form-input 
                label="Email" 
                name="email" 
                type="email"
                required
              ></psypres-form-input>
              
              <psypres-form-input 
                label="Phone" 
                name="phone" 
                type="tel"
              ></psypres-form-input>
              
              <psypres-form-select
                label="Country"
                name="country"
                required
                options='[
                  {"value": "", "label": "Select a country", "disabled": true},
                  {"value": "us", "label": "United States"},
                  {"value": "ca", "label": "Canada"},
                  {"value": "uk", "label": "United Kingdom"},
                  {"value": "au", "label": "Australia"}
                ]'
              ></psypres-form-select>
              
              <psypres-form-input 
                label="Zip Code" 
                name="zipCode"
              ></psypres-form-input>
              
              <div style="grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
                <psypres-button class="reset-btn" variant="secondary" size="small">Reset</psypres-button>
                <psypres-button variant="primary" size="small" onclick="this.closest('psypres-form').submit()">Submit</psypres-button>
              </div>
            </psypres-form>
            
            <div class="result-container">
              <div class="result-title">Form Submission:</div>
              <pre id="grid-form-result" class="result-data"></pre>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Set initial active tab
    this._updateTabs();
  }
}

// Define the custom element
if (!customElements.get('psypres-form-demo')) {
  customElements.define('psypres-form-demo', FormDemo);
} 