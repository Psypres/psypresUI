import React from 'react';
import { Button } from '@psypres/react';
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
      </main>
      
      <footer>
        <p>&copy; {new Date().getFullYear()} PsypresUI. MIT License.</p>
      </footer>
    </div>
  );
}

export default App; 