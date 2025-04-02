import React, { useRef, useEffect, forwardRef } from 'react';
import '@psypres/shared-ui';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  ...props
}, ref) => {
  const buttonRef = useRef(null);
  
  // Combine refs
  useEffect(() => {
    if (!ref) return;
    
    if (typeof ref === 'function') {
      ref(buttonRef.current);
    } else {
      ref.current = buttonRef.current;
    }
  }, [ref]);
  
  // Setup event listeners
  useEffect(() => {
    const buttonElement = buttonRef.current;
    if (!buttonElement) return;
    
    const handleClick = (e) => {
      if (onClick) onClick(e.detail.originalEvent);
    };
    
    buttonElement.addEventListener('click', handleClick);
    
    return () => {
      buttonElement.removeEventListener('click', handleClick);
    };
  }, [onClick]);
  
  return (
    <psypres-button
      ref={buttonRef}
      variant={variant}
      size={size}
      disabled={disabled ? true : undefined}
      {...props}
    >
      {children}
    </psypres-button>
  );
});

Button.displayName = 'Button';

export default Button;
