export { PsypresButton } from './components/Button.js';
export { PsypresCard } from './components/Card.js';
export { PsypresHeader } from './components/Header.js';
export { 
  PsypresThemeProvider, 
  LIGHT_THEME, 
  DARK_THEME, 
  THEME_CHANGE_EVENT,
  dispatchThemeChangeEvent 
} from './components/ThemeProvider.js';
export { PsypresThemeToggle } from './components/ThemeToggle.js';
export { PsypresModal } from './components/Modal.js';
export { ThemeUtils } from './themes/ThemeUtils.js';

// Color utilities
export {
  getContrastColor,
  calculateLuminance,
  adjustBrightness,
  createColorPalette
} from './utils/color.js';

// Showcase components
export { default as DynamicThemeDemo } from './showcase/DynamicThemeDemo.js';
export { default as ModalDemo } from './showcase/ModalDemo.js';

// You can add more components here as you develop them
// export { PsypresInput } from './components/Input.js';
// etc. 