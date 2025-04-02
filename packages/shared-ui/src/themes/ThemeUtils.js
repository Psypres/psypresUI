import { getContrastColor, createColorPalette } from '../utils/color.js';

/**
 * Theme utilities for dynamic color calculations and theme operations
 */
export class ThemeUtils {
  /**
   * Get contrast text color for a given background color
   * @param {string} backgroundColor - Hex color code
   * @returns {string} - Black or white hex color for best contrast
   */
  static getContrastColor(backgroundColor) {
    return getContrastColor(backgroundColor);
  }
  
  /**
   * Create a color palette from a base color
   * @param {string} baseColor - Hex color code 
   * @returns {Object} - Color palette with base, light, lighter, dark, darker, and contrastText
   */
  static createColorPalette(baseColor) {
    return createColorPalette(baseColor);
  }
  
  /**
   * Apply contrast colors to CSS variables for button variants
   * This ensures text remains readable regardless of background color
   */
  static applyContrastColors() {
    // Get all CSS variables from root
    const rootStyles = window.getComputedStyle(document.documentElement);
    
    // Color pairs to update (background color variable, text color variable)
    const colorPairs = [
      ['--psypres-primary-color', '--psypres-primary-text'],
      ['--psypres-secondary-color', '--psypres-secondary-text'],
      ['--psypres-success-color', '--psypres-success-text'],
      ['--psypres-danger-color', '--psypres-danger-text'],
      ['--psypres-warning-color', '--psypres-warning-text'],
      ['--psypres-info-color', '--psypres-info-text']
    ];
    
    // For each pair, calculate the optimal contrast color and set it
    colorPairs.forEach(([bgVar, textVar]) => {
      const bgColor = rootStyles.getPropertyValue(bgVar).trim();
      if (bgColor) {
        // Convert rgb(r, g, b) to hex if needed
        const hexColor = bgColor.startsWith('#') 
          ? bgColor 
          : this._rgbToHex(bgColor);
          
        const contrastColor = this.getContrastColor(hexColor);
        document.documentElement.style.setProperty(textVar, contrastColor);
      }
    });
  }
  
  /**
   * Convert RGB color to hex format
   * @private
   * @param {string} rgb - RGB color string (e.g., 'rgb(255, 255, 255)')
   * @returns {string} - Hex color
   */
  static _rgbToHex(rgb) {
    // Handle rgb(r, g, b) format
    const rgbMatch = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [_, r, g, b] = rgbMatch;
      return `#${Number(r).toString(16).padStart(2, '0')}${Number(g).toString(16).padStart(2, '0')}${Number(b).toString(16).padStart(2, '0')}`;
    }
    return '#000000'; // Fallback
  }
  
  /**
   * Detect if system is in dark mode
   * @returns {boolean} - True if system prefers dark mode
   */
  static systemPrefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

// Apply contrast colors when the DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ThemeUtils.applyContrastColors());
  } else {
    ThemeUtils.applyContrastColors();
  }
  
  // Also apply when theme changes
  window.addEventListener('psypres-theme-change', () => {
    // Small delay to ensure CSS variables have been updated
    setTimeout(() => ThemeUtils.applyContrastColors(), 50);
  });
} 