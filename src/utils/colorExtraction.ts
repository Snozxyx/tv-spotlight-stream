// Utility functions for color extraction and dynamic theming

export interface DominantColors {
  primary: string;
  secondary: string;
  accent: string;
}

// Simple color extraction using canvas (fallback method)
export const extractDominantColors = async (imageUrl: string): Promise<DominantColors> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        // Fallback colors if canvas is not available
        resolve({
          primary: 'hsl(263, 70%, 50%)',
          secondary: 'hsl(290, 70%, 25%)',
          accent: 'hsl(280, 60%, 40%)'
        });
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = extractColorsFromImageData(imageData);
        resolve(colors);
      } catch (error) {
        console.warn('Color extraction failed, using fallback colors:', error);
        // Fallback colors
        resolve({
          primary: 'hsl(263, 70%, 50%)',
          secondary: 'hsl(290, 70%, 25%)',
          accent: 'hsl(280, 60%, 40%)'
        });
      }
    };
    
    img.onerror = () => {
      // Fallback colors if image fails to load
      resolve({
        primary: 'hsl(263, 70%, 50%)',
        secondary: 'hsl(290, 70%, 25%)',
        accent: 'hsl(280, 60%, 40%)'
      });
    };
    
    img.src = imageUrl;
  });
};

// Extract dominant colors from image data
const extractColorsFromImageData = (imageData: ImageData): DominantColors => {
  const data = imageData.data;
  const colorMap = new Map<string, number>();
  
  // Sample pixels (every 10th pixel for performance)
  for (let i = 0; i < data.length; i += 40) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    // Skip transparent pixels
    if (a < 128) continue;
    
    // Convert to HSL for better color analysis
    const hsl = rgbToHsl(r, g, b);
    
    // Skip very dark or very light colors
    if (hsl.l < 0.1 || hsl.l > 0.9) continue;
    
    const key = `${Math.round(hsl.h)}-${Math.round(hsl.s * 100)}-${Math.round(hsl.l * 100)}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }
  
  // Get the most frequent colors
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([key]) => {
      const [h, s, l] = key.split('-').map(Number);
      return { h, s: s / 100, l: l / 100 };
    });
  
  if (sortedColors.length === 0) {
    return {
      primary: 'hsl(263, 70%, 50%)',
      secondary: 'hsl(290, 70%, 25%)',
      accent: 'hsl(280, 60%, 40%)'
    };
  }
  
  // Select colors with good contrast and vibrancy
  const primary = sortedColors[0];
  const secondary = sortedColors.find(c => Math.abs(c.h - primary.h) > 30) || sortedColors[1] || primary;
  const accent = sortedColors.find(c => 
    Math.abs(c.h - primary.h) > 60 && Math.abs(c.h - secondary.h) > 30
  ) || sortedColors[2] || secondary;
  
  return {
    primary: `hsl(${primary.h}, ${Math.max(60, primary.s * 100)}%, ${Math.min(60, Math.max(40, primary.l * 100))}%)`,
    secondary: `hsl(${secondary.h}, ${Math.max(50, secondary.s * 100)}%, ${Math.min(40, Math.max(20, secondary.l * 100))}%)`,
    accent: `hsl(${accent.h}, ${Math.max(40, accent.s * 100)}%, ${Math.min(70, Math.max(30, accent.l * 100))}%)`
  };
};

// RGB to HSL conversion
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }
  
  return { h: h * 360, s, l };
};

// Apply dynamic theme colors to CSS variables
export const applyDynamicTheme = (colors: DominantColors) => {
  const root = document.documentElement;
  
  // Extract HSL values
  const primaryMatch = colors.primary.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  const secondaryMatch = colors.secondary.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  
  if (primaryMatch) {
    const [, h, s, l] = primaryMatch;
    root.style.setProperty('--hero-gradient-start', `${h} ${s}% ${l}%`);
    root.style.setProperty('--focus-glow', `${h} ${s}% ${l}%`);
  }
  
  if (secondaryMatch) {
    const [, h, s, l] = secondaryMatch;
    root.style.setProperty('--hero-gradient-end', `${h} ${s}% ${l}%`);
  }
  
  // Update gradient
  root.style.setProperty('--gradient-primary', 
    `linear-gradient(135deg, hsl(var(--hero-gradient-start)), hsl(var(--hero-gradient-end)))`
  );
};

// Reset to default theme
export const resetToDefaultTheme = () => {
  const root = document.documentElement;
  root.style.setProperty('--hero-gradient-start', '263 70% 50%');
  root.style.setProperty('--hero-gradient-end', '290 70% 25%');
  root.style.setProperty('--focus-glow', '263 70% 50%');
  root.style.setProperty('--gradient-primary', 
    'linear-gradient(135deg, hsl(var(--hero-gradient-start)), hsl(var(--hero-gradient-end)))'
  );
};