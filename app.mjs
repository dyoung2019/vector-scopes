import convertRGB601 from "./convertRGB601.mjs"
import drawGraticules from './drawGraticules.mjs'

// initialize q5
const q5 = new Q5();

let theta = 0

q5.setup = () => {
  q5.createCanvas(400, 400);

 console.log(convertRGB601(0, 0, 255))
 console.log(convertRGB601(0, 255, 0))
 console.log(convertRGB601(255, 0, 255))
}

q5.draw = () => {
  const toYPbPr = (rgb) => {
    const [y, pb, pr] = convertRGB601(...rgb)

    const invTangent = Math.atan(pr/pb)
    const isQuad =
      (pb >= 0) 
        ? ((pr <= 0) ? 0 : Math.PI * 2) 
        : Math.PI
    
    const angle = isQuad - invTangent

    return {
      rgb,
      y,
      pb,
      pr,
      angle
    }
  }

  const drawDisk = (pb, pr, size, tint, factor = 1) => {
    let radius = q5.width * 0.5625
    // let [r, g, b] = tint
    // let [luma, pb, pr] = convertRGB601(...tint)
    // let luma = 0.213 * (r/255) + 0.715 * (g/255) + 0.072 * (b/255) // for 709
    // let luma = 0.299 * (r/255) + 0.587 * (g/255) + 0.114 * (b/255) // for 601.

    // let luma = 0.3 * (r/255) + 0.59 * (g/255) + 0.11 * (b/255)
    // let extent = radius
    let extent = radius * factor 
    // let extent = radius * luma

    let rx = extent * pb
    // flip y
    let ry = extent * -pr


    q5.fill(...tint)
    q5.ellipseMode(q5.CENTER);
    q5.ellipse(rx, ry, size, size)
  }


  q5.background(16);

  const canvasWidth = q5.width
  const canvasHeight = q5.height

  // Translate the origin point to the center of the screen
  q5.translate(canvasWidth / 2, canvasHeight / 2);

  const drawRing = (width) => {
    q5.fill(0, 0, 0, 0);
    q5.stroke(255);
    q5.circle(0, 0, 0.8 * width);
  }

  // ring 
  drawRing(canvasWidth)

  // Draw the ellipse at the cartesian coordinate
  q5.ellipseMode(q5.CENTER);
  q5.noStroke();

  // drawDisk(0, [255, 255, 255])
  const innerBox = {
    offset: 2.5,
    degree: 0.043633231299858,
  }
  // const largeDegree = outerBox.degree //0.174532925199433
  // const smallDegree = innerBox.degree //0.043633231299858

  const outerBox = {
    offset: 20,
    degree: 0.174532925199433,
  }
  q5.stroke(255);

  const blue = toYPbPr([0, 0, 255])
  drawDisk(blue.pb, blue.pr, 8, blue.rgb, 0.5625)
  drawDisk(blue.pb, blue.pr, 6, blue.rgb, 0.75)
  drawGraticules(q5, blue.angle, 50, innerBox, outerBox)

  const cyan = toYPbPr([0, 255, 255])
  drawDisk(cyan.pb, cyan.pr, 8, cyan.rgb, 0.75)
  drawDisk(cyan.pb, cyan.pr, 6, cyan.rgb, 1)
  drawGraticules(q5, cyan.angle, 50, innerBox, outerBox)

  const green = toYPbPr([0, 255, 0])
  drawDisk(green.pb, green.pr, 8, green.rgb, 0.75)
  drawDisk(green.pb, green.pr, 6, green.rgb, 1)
  drawDisk(green.pb, green.pr, 4, green.rgb, 1.21)
  drawGraticules(q5, green.angle, 50, innerBox, outerBox)

  const yellow = toYPbPr([255, 255, 0])
  drawDisk(yellow.pb, yellow.pr, 8, yellow.rgb, 0.5625)
  drawDisk(yellow.pb, yellow.pr, 6, yellow.rgb, 0.75)
  drawGraticules(q5, yellow.angle, 50, innerBox, outerBox)
  
  const red = toYPbPr([255, 0, 0])
  drawDisk(red.pb, red.pr, 8, red.rgb, 0.75)
  drawDisk(red.pb, red.pr, 6, red.rgb, 1)
  drawGraticules(q5, red.angle, 50, innerBox, outerBox)

  const magneta = toYPbPr([255, 0, 255])
  drawDisk(magneta.pb, magneta.pr, 8, magneta.rgb, 0.75)
  drawDisk(magneta.pb, magneta.pr, 6, magneta.rgb, 1)
  drawDisk(magneta.pb, magneta.pr, 4, magneta.rgb, 1.21)
  drawGraticules(q5, magneta.angle, 50, innerBox, outerBox)

  // I (PI + 1radian)
//   drawDisk(237.295779513082321, [200, 200, 200])
//    // -I (1radian)
//    drawDisk(57.295779513082321, [200, 200, 200])

//   //-Q (1radian + PI / 2)
//   drawDisk(147.295779513082321, [100, 100, 100])
//   // Q (1radian + 3 PI / 2)
//   drawDisk(327.295779513082321, [100, 100, 100])

//   // BL 
//   drawDisk(135, [100, 255, 100])
//   // TL
//   drawDisk(315, [100, 255, 100])
}