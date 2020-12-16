const is2ndOr3rdQuad = (pb) => {
  return pb >= 0
}

const is4thQuadrant = (pr) => {
  return pr <= 0
}

export default function getScopeAngle(pB, pR) {
  const oppositeOverAdjacent = pR / pB
  const invTangent = Math.atan(oppositeOverAdjacent)
  const quadrantOrigin = 
    is2ndOr3rdQuad(pB) 
      ? (is4thQuadrant(pR) ? 0 : Math.PI * 2) 
      : Math.PI

  const angle = quadrantOrigin - invTangent
  return angle
}