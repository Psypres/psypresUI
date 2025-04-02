import React, { useState } from 'react';
import { 
  PsypresButton, 
  PsypresThemeToggle,
  getContrastColor,
  createColorPalette,
  ThemeUtils
} from '@psypres/react';

const ColorBlock = ({ color, name }) => {
  const textColor = getContrastColor(color);
  const style = {
    backgroundColor: color,
    color: textColor,
    padding: '1rem',
    borderRadius: '4px',
    textAlign: 'center',
    width: '120px',
    fontWeight: 'bold'
  };
  
  return <div style={style}>{name}</div>;
};

const DynamicThemeDemo = () => {
  const [baseColor, setBaseColor] = useState('#4299e1');
  const colorPalette = createColorPalette(baseColor);
  
  const handleColorChange = (e) => {
    setBaseColor(e.target.value);
  };
  
  const applyAsTheme = () => {
    // Set CSS variables dynamically
    document.documentElement.style.setProperty('--psypres-primary-color', baseColor);
    // Recalculate contrast colors
    ThemeUtils.applyContrastColors();
  };
  
  return (
    <div className="dynamic-theme-demo">
      <h3>Dynamic Contrast Demo</h3>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="color-picker" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Choose a primary color:
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <input 
            type="color" 
            id="color-picker"
            value={baseColor}
            onChange={handleColorChange}
            style={{ width: '50px', height: '50px' }}
          />
          <PsypresButton variant="primary" onClick={applyAsTheme}>
            Apply to Theme
          </PsypresButton>
        </div>
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <h4>Color Palette Preview:</h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <ColorBlock color={colorPalette.lighter} name="Lighter" />
          <ColorBlock color={colorPalette.light} name="Light" />
          <ColorBlock color={colorPalette.base} name="Base" />
          <ColorBlock color={colorPalette.dark} name="Dark" />
          <ColorBlock color={colorPalette.darker} name="Darker" />
        </div>
      </div>
      
      <div>
        <h4>Button Examples:</h4>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <PsypresButton variant="primary">Primary</PsypresButton>
          <PsypresButton variant="secondary">Secondary</PsypresButton>
          <PsypresButton variant="success">Success</PsypresButton>
          <PsypresButton variant="danger">Danger</PsypresButton>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h4>Theme Toggle:</h4>
        <PsypresThemeToggle size="medium" />
      </div>
    </div>
  );
};

export default DynamicThemeDemo; 