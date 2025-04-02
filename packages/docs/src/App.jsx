import React from 'react';
import { Button, Card } from '@psypres/react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>PsypresUI Documentation</h1>
        <p>A cross-platform UI component library</p>
      </header>
      
      <main>
        <section>
          <h2>Button Component</h2>
          
          <div className="component-demo">
            <h3>Variants</h3>
            <div className="component-row">
              <div className="component-example">
                <Button variant="primary">Primary Button</Button>
                <code>variant="primary"</code>
              </div>
              
              <div className="component-example">
                <Button variant="secondary">Secondary Button</Button>
                <code>variant="secondary"</code>
              </div>
              
              <div className="component-example">
                <Button variant="outline">Outline Button</Button>
                <code>variant="outline"</code>
              </div>
            </div>
            
            <h3>Sizes</h3>
            <div className="component-row">
              <div className="component-example">
                <Button size="small">Small Button</Button>
                <code>size="small"</code>
              </div>
              
              <div className="component-example">
                <Button size="medium">Medium Button</Button>
                <code>size="medium"</code>
              </div>
              
              <div className="component-example">
                <Button size="large">Large Button</Button>
                <code>size="large"</code>
              </div>
            </div>
            
            <h3>States</h3>
            <div className="component-row">
              <div className="component-example">
                <Button disabled>Disabled Button</Button>
                <code>disabled</code>
              </div>
              
              <div className="component-example">
                <Button onClick={() => alert('Button clicked!')}>
                  Click Me
                </Button>
                <code>onClick</code>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Card Component</h2>
          
          <div className="component-demo">
            <h3>Variants</h3>
            <div className="component-row">
              <div className="component-example">
                <Card variant="default" style={{ width: '250px' }}>
                  <h3>Default Card</h3>
                  <p>This is a standard card with no specific variant.</p>
                </Card>
                <code>variant="default"</code>
              </div>
              
              <div className="component-example">
                <Card variant="primary" style={{ width: '250px' }}>
                  <h3>Primary Card</h3>
                  <p>This card has a primary style accent.</p>
                </Card>
                <code>variant="primary"</code>
              </div>
              
              <div className="component-example">
                <Card variant="secondary" style={{ width: '250px' }}>
                  <h3>Secondary Card</h3>
                  <p>This card has a secondary style accent.</p>
                </Card>
                <code>variant="secondary"</code>
              </div>
            </div>
            
            <div className="component-row">
              <div className="component-example">
                <Card variant="success" style={{ width: '250px' }}>
                  <h3>Success Card</h3>
                  <p>Used to indicate successful actions or positive content.</p>
                </Card>
                <code>variant="success"</code>
              </div>
              
              <div className="component-example">
                <Card variant="danger" style={{ width: '250px' }}>
                  <h3>Danger Card</h3>
                  <p>Used to indicate errors or destructive content.</p>
                </Card>
                <code>variant="danger"</code>
              </div>
            </div>
            
            <h3>Usage with Buttons</h3>
            <div className="component-row">
              <div className="component-example large-example">
                <Card variant="primary" style={{ width: '300px' }}>
                  <h3>Card with Button</h3>
                  <p>Cards can contain other components like buttons.</p>
                  <div style={{ marginTop: '1rem' }}>
                    <Button variant="primary">Learn More</Button>
                  </div>
                </Card>
                <code>Card containing a Button component</code>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} PsypresUI. MIT License.</p>
      </footer>
    </div>
  );
}

export default App; 