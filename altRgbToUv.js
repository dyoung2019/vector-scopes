const INVERSE_BYTE = 1 / 255

function altRgbToUv(r,g,b) {
  const a = INVERSE_BYTE

  // const y = 0.3 * a * r + 0.59 * a * g + 0.11 * a * b

  // const u = a * b - y 
  // const u = a * b - (0.3 * a * r + 0.59 * a * g + 0.11 * a * b)
  let u = v = -0.59 * g
  let temp = 0.11 * b
  u += b - temp
  v -= temp
  temp = 0.3 * r
  v += r - temp
  u -= temp
  u *= a
  v *= a
  temp = u * u
  temp += v * v
  temp = Math.sqrt(temp)
  u /= temp
  v /= temp

  return [u, v]
}

// console.log('red', altRgbToUv(255, 0, 0))
// console.log('green', altRgbToUv(0, 255, 0))
// console.log('blue', altRgbToUv(0, 0, 255))

module.exports = altRgbToUv