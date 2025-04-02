import * as React from 'react';

export interface PsypresButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
}

export interface PsypresHeaderProps {
  title: string;
  navItems?: Array<{
    label: string;
    url: string;
  }>;
  className?: string;
}

export interface PsypresThemeProviderProps {
  theme?: string | null;
  children?: React.ReactNode;
}

export interface PsypresThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export declare const PsypresButton: React.FC<PsypresButtonProps>;
export declare const PsypresHeader: React.FC<PsypresHeaderProps>;
export declare const PsypresThemeProvider: React.FC<PsypresThemeProviderProps>;
export declare const PsypresThemeToggle: React.FC<PsypresThemeToggleProps>; 