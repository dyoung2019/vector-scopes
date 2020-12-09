const drawArc = (q5, from, to, radius, center = [0, 0]) => {
  const arcDiameter = 2 * radius
  q5.arc(...center, arcDiameter, arcDiameter, from, to, q5.OPEN)
}

const calculateRadialLine = (angle, from, to) => {
  // radial value
  const u0 = Math.cos(angle)
  const v0 = Math.sin(angle)

  const x0 = from * u0
  const x1 = to * u0

  const y0 = from * v0
  const y1 = to * v0

  return [x0, y0, x1, y1]
}

const drawSector = (q5, angle, radius, degreeOffset, lumaOffset) => {
  const ccwEdge = angle - degreeOffset
  // inner arc 
  const cwEdge = angle + degreeOffset
  // outer arc

  const drawInnerArc = () => {
    drawArc(q5, ccwEdge, cwEdge, radius - lumaOffset)
  }

  const drawOuterArc = () => {
    drawArc(q5, ccwEdge, cwEdge, radius + lumaOffset)
  }

  const drawLine = (line) => {
    q5.line(...line)
  }

  const drawSectorEdge = (edge) => {
    drawLine(calculateRadialLine(edge, radius - lumaOffset, radius + lumaOffset))
  }

  drawInnerArc()
  drawOuterArc()
  drawSectorEdge(ccwEdge)
  drawSectorEdge(cwEdge)
}

export default function drawGraticules(q5, theta, length, innerBox, outerBox) {
  // const largeDegree = outerBox.degree //0.174532925199433
  // const smallDegree = innerBox.degree //0.043633231299858

  const gradDiameter = 2 * length
     
  const drawOuterSector = () => {
    const ccwEdge = theta - outerBox.degree
    const ccwInnerEdge = theta - innerBox.degree
    // inner arc 
    const cwInnerEdge = theta + innerBox.degree
    const cwEdge = theta + outerBox.degree

    const drawBrokenArc = (offset) => {
      drawArc(q5, ccwEdge, ccwInnerEdge, gradDiameter - offset)
      drawArc(q5, cwInnerEdge, cwEdge, gradDiameter - offset)
    }

    const drawBrokenEdge = (front, edgeLength) => {
      const drawRadialMark = (edge, from, to) => {
        q5.line(...calculateRadialLine(edge, from, to))
      }

      drawRadialMark(ccwEdge, front, front + edgeLength)
      drawRadialMark(cwEdge, front, front + edgeLength)
    }

    drawBrokenEdge(gradDiameter - outerBox.offset, innerBox.offset)
    drawBrokenEdge(gradDiameter + outerBox.offset, -innerBox.offset)
    drawBrokenArc(-outerBox.offset)
    drawBrokenArc(outerBox.offset)

    // drawSector(theta, gradDiameter, largeDegree, largeOffset)
  }

  const drawInnerSector = () => {
    drawSector(q5, theta, gradDiameter, innerBox.degree, innerBox.offset)
  }

  const drawCrossHair = () => {
    const drawRadialMark = () => {
      q5.line(...calculateRadialLine(theta, gradDiameter - innerBox.offset, gradDiameter + innerBox.offset))
    }
  
    const drawArcMark = () => {
      drawArc(q5, theta - innerBox.degree, theta + innerBox.degree, gradDiameter)
    }

    drawRadialMark()
    drawArcMark()
  }

  drawOuterSector()
  drawInnerSector()
  drawCrossHair()
}