import React, { useRef, useEffect, useState, forwardRef } from 'react';
import '@psypres/shared-ui';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  style,
  className,
  ...props
}, ref) => {
  const buttonRef = useRef(null);
  const [fallbackRender, setFallbackRender] = useState(false);
  
  // Combine refs
  useEffect(() => {
    if (!ref) return;
    
    if (typeof ref === 'function') {
      ref(buttonRef.current);
    } else {
      ref.current = buttonRef.current;
    }
  }, [ref]);
  
  // Setup event listeners and check if custom element is defined
  useEffect(() => {
    // Check if the custom element is defined
    if (!customElements.get('psypres-themed-button')) {
      console.log('React Button: ThemedButton not registered yet, using fallback render');
      setFallbackRender(true);
    }
    
    const buttonElement = buttonRef.current;
    if (!buttonElement) return;
    
    const handleClick = (e) => {
      console.log('React Button: Click event received');
      if (onClick) onClick(e.detail ? e.detail.originalEvent : e);
    };
    
    buttonElement.addEventListener('click', handleClick);
    
    return () => {
      buttonElement.removeEventListener('click', handleClick);
    };
  }, [onClick]);
  
  // Fallback styles for direct rendering
  const fallbackButtonStyles = {
    fontFamily: 'Arial, sans-serif',
    padding: size === 'small' ? '0.25rem 0.5rem' : size === 'large' ? '0.75rem 1.5rem' : '0.5rem 1rem',
    fontSize: size === 'small' ? '0.75rem' : size === 'large' ? '1rem' : '0.875rem',
    borderRadius: '4px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    fontWeight: 600,
    backgroundColor: 
      variant === 'primary' ? '#4299e1' : 
      variant === 'secondary' ? '#a0aec0' : 
      variant === 'success' ? '#48bb78' : 
      variant === 'danger' ? '#f56565' : 
      'transparent',
    color: 
      variant === 'primary' ? '#ffffff' : 
      variant === 'secondary' ? '#ffffff' : 
      variant === 'success' ? '#ffffff' : 
      variant === 'danger' ? '#ffffff' : 
      '#4299e1',
    border: variant === 'outline' ? '1px solid #4299e1' : 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    margin: '4px',
    minWidth: '80px',
    textAlign: 'center',
    ...style
  };
  
  // If we need to use fallback rendering
  if (fallbackRender) {
    return (
      <button
        ref={buttonRef}
        style={fallbackButtonStyles}
        className={className}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  // Regular web component rendering
  return (
    <psypres-themed-button
      ref={buttonRef}
      variant={variant}
      size={size}
      disabled={disabled ? true : undefined}
      className={className}
      {...props}
    >
      {children}
    </psypres-themed-button>
  );
});

Button.displayName = 'Button';

export default Button;
