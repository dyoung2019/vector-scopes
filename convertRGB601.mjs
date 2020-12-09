const INVERSE_BYTE = 1.0 / 255

const K_FACTOR = [
  0.299,
  0.587,
  0.114,
]

const PB_FACTOR = [
  -0.168736,
  0.331264,
  0.5,
]

const PR_FACTOR = [
  0.5,
  -0.418688,
  -0.081312
]

export default function convertRGB601(r,g,b) {
  const gammaCorrection = (value) => {
    return Math.pow(value * INVERSE_BYTE, 2.4)
  }

  const zipMultiply = (left, right) => {
    return left[0] * right[0] +
      left[1] * right[1] +
      left[2] * right[2]
  }

  const getChroma = (index, yLuma, gamma, pFactor) => {
    return 0.5 * (gamma[index] - yLuma) / (1 - pFactor[index])
  }

  // gamma corrected
  const gamma = [r,g,b].map(gammaCorrection)

  const yLuma = zipMultiply(K_FACTOR, gamma)
  const pB = getChroma(2, yLuma, gamma, K_FACTOR)
  const pR = getChroma(0, yLuma, gamma, K_FACTOR)
  
  return [yLuma, pB, pR]
}

// module.exports = convertRGB601