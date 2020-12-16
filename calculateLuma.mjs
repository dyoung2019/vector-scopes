import K_FACTOR from './REC601.mjs'

const zipMultiply = (left, right) => {
  return left[0] * right[0] +
    left[1] * right[1] +
    left[2] * right[2]
}

export default function calculateLuma(linear) {
  return zipMultiply(K_FACTOR, linear)
}