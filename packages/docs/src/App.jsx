import React from 'react';
import './App.css';
import { 
  PsypresButton, 
  PsypresHeader,
  PsypresThemeProvider,
  PsypresThemeToggle,
  PsypresModal
} from '@psypres/react';
import DynamicThemeDemo from './components/DynamicThemeDemo';

function App() {
  return (
    <PsypresThemeProvider>
      <div className="app">
        <div className="theme-switcher">
          <PsypresThemeToggle size="medium" />
        </div>
        
        <header>
          <h1>PsypresUI Documentation</h1>
          <p>A component library for building modern, accessible user interfaces</p>
        </header>

        <section>
          <h2>Headers</h2>
          <div className="component-demo">
            <h3>Default Header</h3>
            <div className="component-row">
              <div className="component-example large-example">
                <PsypresHeader title="Psykologforeningen" />
              </div>
            </div>

            <h3>Header with Nav Items</h3>
            <div className="component-row">
              <div className="component-example large-example">
                <PsypresHeader 
                  title="Psykologforeningen" 
                  navItems={[
                    { label: 'Home', url: '#' },
                    { label: 'About', url: '#' },
                    { label: 'Contact', url: '#' }
                  ]} 
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Buttons</h2>
          <div className="component-demo">
            <h3>Button Variants</h3>
            <div className="component-row">
              <div className="component-example">
                <PsypresButton variant="primary">Primary</PsypresButton>
                <code>variant="primary"</code>
              </div>
              <div className="component-example">
                <PsypresButton variant="secondary">Secondary</PsypresButton>
                <code>variant="secondary"</code>
              </div>
              <div className="component-example">
                <PsypresButton variant="success">Success</PsypresButton>
                <code>variant="success"</code>
              </div>
              <div className="component-example">
                <PsypresButton variant="danger">Danger</PsypresButton>
                <code>variant="danger"</code>
              </div>
            </div>

            <h3>Button Sizes</h3>
            <div className="component-row">
              <div className="component-example">
                <PsypresButton size="small">Small</PsypresButton>
                <code>size="small"</code>
              </div>
              <div className="component-example">
                <PsypresButton size="medium">Medium</PsypresButton>
                <code>size="medium"</code>
              </div>
              <div className="component-example">
                <PsypresButton size="large">Large</PsypresButton>
                <code>size="large"</code>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Theme Components</h2>
          <div className="component-demo">
            <h3>Theme Toggle</h3>
            <div className="component-row">
              <div className="component-example">
                <PsypresThemeToggle size="small" />
                <code>size="small"</code>
              </div>
              <div className="component-example">
                <PsypresThemeToggle size="medium" />
                <code>size="medium"</code>
              </div>
              <div className="component-example">
                <PsypresThemeToggle size="large" />
                <code>size="large"</code>
              </div>
            </div>
            
            <div className="component-row">
              <div className="component-example large-example">
                <DynamicThemeDemo />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Modal Components</h2>
          <div className="component-demo">
            <h3>Basic Modal Example</h3>
            <div className="component-row">
              <div className="component-example large-example">
                <ModalExample />
              </div>
            </div>
          </div>
        </section>

        <footer>
          <p>Created with ❤️ by the PsypresUI team</p>
        </footer>
      </div>
    </PsypresThemeProvider>
  );
}

// Modal Example Component
function ModalExample() {
  const [basicModalOpen, setBasicModalOpen] = React.useState(false);
  const [customModalOpen, setCustomModalOpen] = React.useState(false);
  const [formModalOpen, setFormModalOpen] = React.useState(false);

  return (
    <div className="modal-examples">
      <h4>Basic Modal</h4>
      <p>A simple modal with a title and content.</p>
      <div className="demo-buttons">
        <PsypresButton variant="primary" onClick={() => setBasicModalOpen(true)}>
          Open Basic Modal
        </PsypresButton>
      </div>

      <PsypresModal
        open={basicModalOpen}
        title="Basic Modal"
        size="medium"
        closeOnOverlay={true}
        onClose={() => setBasicModalOpen(false)}
      >
        <p>This is a basic modal with some content.</p>
        <p>Click outside or the X to close.</p>
      </PsypresModal>

      <h4>Custom Modal</h4>
      <p>A modal with custom content and no close button.</p>
      <div className="demo-buttons">
        <PsypresButton variant="secondary" onClick={() => setCustomModalOpen(true)}>
          Open Custom Modal
        </PsypresButton>
      </div>

      <PsypresModal
        open={customModalOpen}
        title="Success"
        size="small"
        hideCloseButton={true}
        onClose={() => setCustomModalOpen(false)}
        footer={
          <PsypresButton variant="primary" onClick={() => setCustomModalOpen(false)}>
            Continue
          </PsypresButton>
        }
      >
        <div className="custom-content">
          <div className="custom-icon">✓</div>
          <h3>Operation Successful!</h3>
          <p>Your changes have been saved successfully.</p>
        </div>
      </PsypresModal>

      <h4>Form Modal</h4>
      <p>A modal containing a form.</p>
      <div className="demo-buttons">
        <PsypresButton variant="primary" onClick={() => setFormModalOpen(true)}>
          Open Form Modal
        </PsypresButton>
      </div>

      <PsypresModal
        open={formModalOpen}
        title="Contact Form"
        size="medium"
        onClose={() => setFormModalOpen(false)}
        footer={
          <div className="modal-footer-buttons">
            <PsypresButton variant="secondary" onClick={() => setFormModalOpen(false)}>
              Cancel
            </PsypresButton>
            <PsypresButton variant="primary" onClick={() => {
              alert('Form submitted!');
              setFormModalOpen(false);
            }}>
              Submit
            </PsypresButton>
          </div>
        }
      >
        <form id="contact-form">
          <div className="form-group">
            <label htmlFor="name-input">Name</label>
            <input type="text" id="name-input" placeholder="Enter your name" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="email-input">Email</label>
            <input type="email" id="email-input" placeholder="Enter your email" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="message-input">Message</label>
            <textarea id="message-input" rows="4" placeholder="Your message" 
              style={{
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid var(--psypres-border-color, #e2e8f0)', 
                borderRadius: '4px', 
                fontSize: '1rem'
              }}
            ></textarea>
          </div>
        </form>
      </PsypresModal>
    </div>
  );
}

export default App; 