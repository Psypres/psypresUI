export { default as PsypresButton } from './Button';
export { default as PsypresCard } from './Card';
export { default as PsypresHeader } from './Header';
export { default as PsypresThemeProvider } from './ThemeProvider';
export { default as PsypresThemeToggle } from './ThemeToggle';
export { default as PsypresModal } from './Modal';
export { default as FormDemo } from './FormDemo';
export { default as ButtonDemo } from './ButtonDemo';

// Re-export theme utilities from shared-ui
import { 
  ThemeUtils,
  getContrastColor,
  calculateLuminance,
  adjustBrightness,
  createColorPalette,
  LIGHT_THEME,
  DARK_THEME,
  THEME_CHANGE_EVENT,
  dispatchThemeChangeEvent,
  // Showcase components
  DynamicThemeDemo,
  ModalDemo
} from '@psypres/shared-ui';

export {
  ThemeUtils,
  getContrastColor,
  calculateLuminance,
  adjustBrightness,
  createColorPalette,
  LIGHT_THEME,
  DARK_THEME,
  THEME_CHANGE_EVENT,
  dispatchThemeChangeEvent,
  // Showcase components
  DynamicThemeDemo,
  ModalDemo
};