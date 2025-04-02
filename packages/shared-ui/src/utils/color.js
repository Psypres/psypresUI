/**
 * Converts a hex color to RGB components
 * @param {string} hexColor - Hex color string (with or without #)
 * @returns {Object} - RGB object with r, g, b properties
 */
export function hexToRgb(hexColor) {
  const hex = hexColor.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  };
}

/**
 * Calculates the relative luminance of a color
 * Uses the W3C formula for calculating luminance
 * @param {string} hexColor - Hex color string (with or without #)
 * @returns {number} - Luminance value between 0 and 1
 */
export function calculateLuminance(hexColor) {
  if (!hexColor || !/^#?[0-9A-Fa-f]{6}$/.test(hexColor)) {
    console.warn('Invalid hex color for luminance calculation. Returning 0.');
    return 0;
  }

  const { r, g, b } = hexToRgb(hexColor);
  // Using the formula for relative luminance (W3C)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/**
 * Determines the best contrast color (black or white) for a given background color
 * @param {string} backgroundColor - Hex color string (with or without #)
 * @returns {string} - '#000000' for dark text or '#FFFFFF' for light text
 */
export function getContrastColor(backgroundColor) {
  if (!backgroundColor || !/^#?[0-9A-Fa-f]{6}$/.test(backgroundColor)) {
    console.warn('Invalid hex color. Falling back to black.');
    return '#000000';
  }

  const luminance = calculateLuminance(backgroundColor);
  // If luminance is high (bright color), return dark text; else, return light text
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Adjusts the brightness of a hex color
 * @param {string} hexColor - Hex color string (with or without #)
 * @param {number} factor - Factor to adjust brightness (negative = darker, positive = lighter)
 * @returns {string} - Adjusted hex color
 */
export function adjustBrightness(hexColor, factor) {
  if (!hexColor || !/^#?[0-9A-Fa-f]{6}$/.test(hexColor)) {
    console.warn('Invalid hex color for brightness adjustment. Returning original.');
    return hexColor;
  }

  const { r, g, b } = hexToRgb(hexColor);
  
  // Adjust each component by the factor
  const adjust = (value) => {
    return Math.min(255, Math.max(0, Math.round(value + (factor * 255))));
  };
  
  const newR = adjust(r);
  const newG = adjust(g);
  const newB = adjust(b);
  
  // Convert back to hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * Creates a color palette from a base color
 * @param {string} baseColor - Hex color string (with or without #)
 * @returns {Object} - Object with different shades of the color
 */
export function createColorPalette(baseColor) {
  if (!baseColor || !/^#?[0-9A-Fa-f]{6}$/.test(baseColor)) {
    console.warn('Invalid hex color for palette creation. Using fallback blue.');
    baseColor = '#4299e1';
  }
  
  return {
    base: baseColor,
    light: adjustBrightness(baseColor, 0.2),
    lighter: adjustBrightness(baseColor, 0.4),
    dark: adjustBrightness(baseColor, -0.2),
    darker: adjustBrightness(baseColor, -0.4),
    contrastText: getContrastColor(baseColor)
  };
} 