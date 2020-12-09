const INVERSE_BYTE = 1 / 255

function neueRgbToUv(r,g,b) {
  const a = INVERSE_BYTE

  // const y = 0.3 * a * r + 0.59 * a * g + 0.11 * a * b

  // const u = a * b - y 
  // const u = a * b - (0.3 * a * r + 0.59 * a * g + 0.11 * a * b)
  const dr = 0.3 * r
  const inv_r = r - dr
  const db = 0.11 * b
  const inv_b = b - db
  const gc = 0.59 * g
  const u = a * (inv_b - dr - gc)
  // const v = a * r - y
  // const v = a * r - (0.3 * a * r + 0.59 * a * g + 0.11 * a * b)
  // const v = a * r - 0.3 * a * r - 0.59 * a * g - 0.11 * a * b
  // const v = a * (1 * r - r - 0.3 * r - 0.59 * g - 0.11 * b)
  const v = a * (inv_r - gc - db)

  return [u, v]
}

// console.log('red', neueRgbToUv(255, 0, 0))
// console.log('green', neueRgbToUv(0, 255, 0))
// console.log('blue', neueRgbToUv(0, 0, 255))

module.exports = neueRgbToUv