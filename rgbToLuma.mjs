import calculateLuma from "./calculateLuma.mjs";
import rgbToLinear from "./rgbToLinear.mjs";

export default function rgbToLuma(r,g,b) {
  const linear = rgbToLinear([r,g,b])
  return calculateLuma(linear)
}