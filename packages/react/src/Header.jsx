import React, { forwardRef } from 'react';
import '@psypres/shared-ui';

const Header = forwardRef(({
  children,
  level = '1',
  variant = 'default',
  ...props
}, ref) => {
  // Validate level
  const validLevel = /^[1-6]$/.test(level.toString()) ? level : '1';
  
  return (
    <psypres-header
      ref={ref}
      level={validLevel}
      variant={variant}
      {...props}
    >
      {children}
    </psypres-header>
  );
});

Header.displayName = 'Header';

export default Header; 