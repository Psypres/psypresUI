import React, { forwardRef } from 'react';
import '@psypres/shared-ui';

const ThemeToggle = forwardRef(({
  size = 'medium',
  ...props
}, ref) => {
  return (
    <psypres-theme-toggle
      ref={ref}
      size={size}
      {...props}
    />
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle; 