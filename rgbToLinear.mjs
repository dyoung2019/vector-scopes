const INVERSE_BYTE = 1.0 / 255

const gammaCorrection = value => {
  return Math.pow(value * INVERSE_BYTE, 2.4)
}

export default function rgbToLinear(input) {
  return input.map(gammaCorrection)
}
