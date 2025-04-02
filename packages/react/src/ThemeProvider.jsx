import React, { forwardRef } from 'react';
import '@psypres/shared-ui';

const ThemeProvider = forwardRef(({
  children,
  theme,
  ...props
}, ref) => {
  return (
    <psypres-theme-provider
      ref={ref}
      theme={theme}
      {...props}
    >
      {children}
    </psypres-theme-provider>
  );
});

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider; 