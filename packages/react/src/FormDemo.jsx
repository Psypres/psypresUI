import React, { useEffect, useRef } from 'react';
import '@psypres/shared-ui';

// This is a wrapper for the FormDemo custom element
function FormDemo() {
  const ref = useRef(null);

  useEffect(() => {
    // Any additional initialization can go here if needed
  }, []);

  return <psypres-form-demo ref={ref} />;
}

export default FormDemo; 