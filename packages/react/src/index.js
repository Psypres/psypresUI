export { default as PsypresButton } from './Button';
export { default as PsypresCard } from './Card';
export { default as PsypresHeader } from './Header';
export { default as PsypresThemeProvider } from './ThemeProvider';
export { default as PsypresThemeToggle } from './ThemeToggle';
export { default as PsypresModal } from './Modal';

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
  dispatchThemeChangeEvent
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
  dispatchThemeChangeEvent
};