import rgbToLinear from './rgbToLinear.mjs'
import calculateLuma from './calculateLuma.mjs'
import linearToCbCp from './linearToCbCp.mjs'

export default function rgbToYCbCp(r,g,b) {
  // gamma corrected
  const source = [r,g,b]
  const rgbY = rgbToLinear(source)
  const luma = calculateLuma(rgbY)
  const pBpR = linearToCbCp(luma, rgbY)
  
  return [luma, ...pBpR]
}

// module.exports = convertRGB601