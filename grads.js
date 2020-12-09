// initialize q5
const q5 = new Q5();

let theta = 0

q5.setup = () => {
  q5.createCanvas(400, 400);
}

q5.draw = () => {
  q5.background(128)

  const canvasWidth = q5.width
  const canvasHeight = q5.height

  // Translate the origin point to the center of the screen
  q5.translate(canvasWidth / 2, canvasHeight / 2);

  q5.noFill() 
    
  // Draw a circle
  
  const r = 75
  
  q5.circle(0, 0, 2 * r)

  const arcStart = 0
  const arcEnd = 1

  const drawArc = (from, to, radius, center = [0, 0]) => {
    const arcDiameter = 2 * radius
    q5.arc(...center, arcDiameter, arcDiameter, from, to, q5.OPEN)
  }

  // drawArc(arcStart, arcEnd, r  - smallOffset)
  // drawArc(arcStart, arcEnd, r + smallOffset)

  // drawArc(0 - largeDegree, 1 + largeDegree, r - largeOffset)
  // drawArc(0 - largeDegree, 1 + largeDegree, r + largeOffset)

  // q5.arc(0, 0, largeOR, largeOR, arcStart, arcEnd, q5.OPEN)

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

  const drawSector = (angle, radius, degreeOffset, lumaOffset) => {
    const ccwEdge = angle - degreeOffset
    // inner arc 
    const cwEdge = angle + degreeOffset
    // outer arc

    const drawInnerArc = () => {
      drawArc(ccwEdge, cwEdge, radius - lumaOffset)
    }

    const drawOuterArc = () => {
      drawArc(ccwEdge, cwEdge, radius + lumaOffset)
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

  // q5.line(...calculateRadialLine(arcStart, r - smallOffset, r + smallOffset))
  // q5.line(...calculateRadialLine(arcEnd, r - smallOffset, r + smallOffset))

  const smallOffset = 10
  const largeOffset = 20

  const drawGraticules = (theta, length) => {
    const largeDegree = 0.174532925199433
    const smallDegree = 0.043633231299858

    const gradDiameter = 2 * length
       
    const drawOuterSector = () => {
      const ccwEdge = theta - largeDegree
      const ccwInnerEdge = theta - smallDegree
      // inner arc 
      const cwInnerEdge = theta + smallDegree
      const cwEdge = theta + largeDegree

      const drawBrokenArc = (offset) => {
        drawArc(ccwEdge, ccwInnerEdge, gradDiameter - offset)
        drawArc(cwInnerEdge, cwEdge, gradDiameter - offset)
      }

      const drawBrokenEdge = (front, edgeLength) => {
        const drawRadialMark = (edge, from, to) => {
          q5.line(...calculateRadialLine(edge, from, to))
        }

        drawRadialMark(ccwEdge, front, front + edgeLength)
        drawRadialMark(cwEdge, front, front + edgeLength)
      }

      drawBrokenEdge(gradDiameter - largeOffset, smallOffset)
      drawBrokenEdge(gradDiameter + largeOffset, -smallOffset)
      drawBrokenArc(-largeOffset)
      drawBrokenArc(largeOffset)

      // drawSector(theta, gradDiameter, largeDegree, largeOffset)
    }

    const drawInnerSector = () => {
      drawSector(theta, gradDiameter, smallDegree, smallOffset)
    }

    const drawCrossHair = () => {
      const drawRadialMark = () => {
        q5.line(...calculateRadialLine(theta, gradDiameter - smallOffset, gradDiameter + smallOffset))
      }
    
      const drawArcMark = () => {
        drawArc(theta - smallDegree, theta + smallDegree, gradDiameter)
      }

      drawRadialMark()
      drawArcMark()
    }

    drawOuterSector()
    drawInnerSector()
    drawCrossHair()
  }

  drawGraticules(0, r)

  drawGraticules(1, r)

  drawGraticules(2.5, r)

  drawGraticules(4, r)

  const drawCenterMark = () => {
    const drawHorizontalLine = () => {
      q5.line(-smallOffset, 0, smallOffset, 0)
    }

    const drawVerticalLine = () => {
      q5.line(0, -smallOffset, 0, smallOffset)
    }

    drawHorizontalLine()
    drawVerticalLine()
  }

  drawCenterMark()
}