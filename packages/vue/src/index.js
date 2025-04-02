// Import components
import PsypresButton from './components/Button.vue';

// Export individual components
export {
  PsypresButton
};

// Default export all components as an object
export default {
  PsypresButton
};

// Create a Vue plugin
export const PsypresUIPlugin = {
  install(app) {
    // Register each component
    app.component('PsypresButton', PsypresButton);
    
    // Add more components here as they're developed
  }
}; 