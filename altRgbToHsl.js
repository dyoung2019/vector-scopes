function altRgbToHsl(r, g, b) {
  // r /= 255, g /= 255, b /= 255;

  const maxValue = Math.max(r, g, b)
  const minValue = Math.min(r, g, b)

  const range = (maxValue + minValue)
  let h, s
  let l = 0.5 * range

  if (maxValue === minValue) {
    h = s = 0 // achromatic
  } else {
    const d = maxValue - minValue

    s = l > 128
      ? d / (2 - d)
      : d / range

    switch (maxValue) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    // h /= 6;
  }

  return [ h, s, l];
}