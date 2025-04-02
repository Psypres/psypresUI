import { DefineComponent } from 'vue';

export interface PsypresButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export interface PsypresHeaderProps {
  title: string;
  navItems?: Array<{
    label: string;
    url: string;
  }>;
}

export interface PsypresThemeProviderProps {
  theme?: string | null;
}

export interface PsypresThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
}

export const PsypresButton: DefineComponent<PsypresButtonProps>;
export const PsypresHeader: DefineComponent<PsypresHeaderProps>;
export const PsypresThemeProvider: DefineComponent<PsypresThemeProviderProps>;
export const PsypresThemeToggle: DefineComponent<PsypresThemeToggleProps>;

// Vue Plugin
export interface PsypresUIPlugin {
  install: (app: any) => void;
}

export const PsypresUI: PsypresUIPlugin;
export default PsypresUI; 