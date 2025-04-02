// Import components
import PsypresButton from './components/Button.vue';
import PsypresHeader from './components/Header.vue';
import PsypresThemeProvider from './components/ThemeProvider.vue';
import PsypresThemeToggle from './components/ThemeToggle.vue';

// Export individual components
export {
  PsypresButton,
  PsypresHeader,
  PsypresThemeProvider,
  PsypresThemeToggle
};

// Default export all components as an object
export default {
  PsypresButton,
  PsypresHeader,
  PsypresThemeProvider,
  PsypresThemeToggle
};

// Create a Vue plugin
export const PsypresUIPlugin = {
  install(app) {
    // Register each component
    app.component('PsypresButton', PsypresButton);
    app.component('PsypresHeader', PsypresHeader);
    app.component('PsypresThemeProvider', PsypresThemeProvider);
    app.component('PsypresThemeToggle', PsypresThemeToggle);
    
    // Add more components here as they're developed
  }
}; 