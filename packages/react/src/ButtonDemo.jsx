import React, { useRef, useEffect, useState, forwardRef } from 'react';
import '@psypres/shared-ui';

// Import Button to use as fallback
import Button from './Button';

const ButtonDemo = forwardRef((props, ref) => {
  const demoRef = useRef(null);
  const [fallbackRender, setFallbackRender] = useState(false);
  
  // Combine refs
  useEffect(() => {
    if (!ref) return;
    
    if (typeof ref === 'function') {
      ref(demoRef.current);
    } else {
      ref.current = demoRef.current;
    }
  }, [ref]);
  
  // Check if custom element is defined
  useEffect(() => {
    if (!customElements.get('psypres-button-demo')) {
      console.log('React ButtonDemo: Custom element not registered yet, using fallback render');
      setFallbackRender(true);
    }
  }, []);
  
  // Fallback rendering for ButtonDemo
  if (fallbackRender) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginTop: 0, marginBottom: '15px' }}>Themed Button Variants</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginTop: 0, marginBottom: '15px' }}>Themed Button Sizes</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            <Button variant="primary" size="small">Small</Button>
            <Button variant="primary" size="medium">Medium</Button>
            <Button variant="primary" size="large">Large</Button>
          </div>
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginTop: 0, marginBottom: '15px' }}>Disabled Buttons</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            <Button variant="primary" disabled>Disabled Primary</Button>
            <Button variant="outline" disabled>Disabled Outline</Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Regular web component rendering
  return (
    <psypres-button-demo ref={demoRef} {...props} />
  );
});

ButtonDemo.displayName = 'ButtonDemo';

export default ButtonDemo; 