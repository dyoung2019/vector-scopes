// initialize q5
const q5 = new Q5();

let theta = 0

q5.setup = () => {
  q5.createCanvas(400, 400);
}

q5.draw = () => {
  const drawDisk = (hue, tint) => {
    const theta = hue * (Math.PI / 180)

    let radius = q5.width * 0.4
    let [r, g, b] = tint
    let luma = 0.3 * (r/255) + 0.59 * (g/255) + 0.11 * (b/255)
    let extent = radius
    // let extent = radius * luma

    let rx = extent * Math.cos(theta)
    let ry = extent * Math.sin(theta)

    q5.fill(...tint)
    q5.ellipseMode(q5.CENTER);
    const DOT_DIM = 8
    q5.ellipse(rx, ry, DOT_DIM, DOT_DIM)
  }


  q5.background(0);

  const canvasWidth = q5.width
  const canvasHeight = q5.height

  // Translate the origin point to the center of the screen
  q5.translate(canvasWidth / 2, canvasHeight / 2);

  let r = canvasWidth * 0.4;
  // Convert polar to cartesian
  let x = r * Math.cos(theta);
  let y = r * Math.sin(theta);

  // ring 
  q5.fill(0, 0, 0, 0);
  q5.stroke(255);
  q5.circle(0, 0, 0.8 * canvasWidth);

  // Draw the ellipse at the cartesian coordinate
  q5.ellipseMode(q5.CENTER);
  q5.noStroke();

  drawDisk(0, [255, 255, 255])
  drawDisk(12, [0, 0, 255])
  drawDisk(76, [0, 255, 255])
  drawDisk(119, [0, 255, 0])
  drawDisk(192, [255, 255, 0])
  drawDisk(256, [255, 0, 0])
  drawDisk(299, [255, 0, 255])

  // I (PI + 1radian)
  drawDisk(237.295779513082321, [200, 200, 200])
   // -I (1radian)
   drawDisk(57.295779513082321, [200, 200, 200])

  //-Q (1radian + PI / 2)
  drawDisk(147.295779513082321, [100, 100, 100])
  // Q (1radian + 3 PI / 2)
  drawDisk(327.295779513082321, [100, 100, 100])

  // BL 
  drawDisk(135, [100, 255, 100])
  // TL
  drawDisk(315, [100, 255, 100])
}