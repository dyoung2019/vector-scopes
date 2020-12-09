const INVERSE_BYTE = 1 / 255
const normalize = (value) => {
  return INVERSE_BYTE * value
}

function rgbToUVY(r,g,b) {
  const nr = normalize(r)
  const nb = normalize(b)

  const ny = 0.3 * nr + 0.59 * normalize(g) + 0.11 * nb

  const u = nb - ny
  const v = nr - ny

  return [u, v, ny]
}

module.exports = rgbToUVY

// console.log('red', rgbToUVY(255, 0, 0))
// console.log('blue', rgbToUVY(0, 0, 255))
// console.log('green', rgbToUVY(0, 255, 0))