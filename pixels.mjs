import rgbToLuma from "./rgbToLuma.mjs"
// initialize q5
const q5 = new Q5();

let img;
let graph
let inputSrc
let luma
q5.setup = () => {
  q5.createCanvas(500, 500)
  graph = q5.createGraphics(200, 200);

  const glow = [0, 255, 0]
  luma = rgbToLuma(...glow)
  console.log('luma', luma)
}

let noOfColumns = 0
let noOfRows = 0
const onImageLoad = (image) => {
  noOfColumns = image.width
  noOfRows = image.height
}

q5.preload = () => {
  img = q5.loadImage('./rainbows.jpg', onImageLoad);
}

q5.draw = () => {
  q5.image(img, 0, 0, 200, 200)
  q5.image(img, 250, 0, 200, 200)
  
  graph.background(0)
  graph.loadPixels()
  // graph.clear()

  for (let i = 0; i < graph.width; i++) {
    const dotColor = q5.color(0, 255, 0)
    const lumaPixel = 255 * (i / graph.width)
    const y = rgbToLuma(lumaPixel, lumaPixel, lumaPixel)
    const ry = Math.floor(graph.height * (1.0 - y))
    // debugger;
    graph.set(i, ry, dotColor)
  }
  graph.updatePixels();
  q5.image(graph, 0, 201, 200, 200);
}