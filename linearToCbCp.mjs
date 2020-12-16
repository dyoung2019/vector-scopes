import K_FACTOR from './REC601.mjs'

const getChroma = (index, yLuma, gamma, pFactor) => {
  return 0.5 * (gamma[index] - yLuma) / (1 - pFactor[index])
}

export default function linearToCbCp(luma, linear) {
  const pB = getChroma(2, luma, linear, K_FACTOR)
  const pR = getChroma(0, luma, linear, K_FACTOR)

  return [pB, pR]
}
