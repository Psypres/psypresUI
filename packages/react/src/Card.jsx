import React, { forwardRef } from 'react';
import '@psypres/shared-ui';

const Card = forwardRef(({
  children,
  variant = 'default',
  ...props
}, ref) => {
  return (
    <psypres-card
      ref={ref}
      variant={variant}
      {...props}
    >
      {children}
    </psypres-card>
  );
});

Card.displayName = 'Card';

export default Card; 