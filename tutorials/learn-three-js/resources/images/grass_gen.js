// BY CHATGPT and some manual tweaks (all dirt, all grass, or mix)
// p5.js sketch
// 16x16 checkerboard of small "Minecraft-like" grass/dirt pixel-art blocks.
// Each tile is a 16x16 pixel texture scaled to the canvas.

const GRID = 1;            // number of tiles across & down
const TILE_PIXELS = 16;     // internal pixel-art resolution per tile (16x16)
const TILE_SIZE = 600;       // size in screen pixels per tile (so canvas = GRID*TILE_SIZE)

function setup() {
  createCanvas(GRID * TILE_SIZE, GRID * TILE_SIZE);
  noSmooth();               // keep pixel art crisp
  noLoop();
  pixelDensity(1);
  background(150, 200, 255); // sky-ish background behind tiles
  drawChecker();
}

function drawChecker() {
  for (let ty = 0; ty < GRID; ty++) {
    for (let tx = 0; tx < GRID; tx++) {
      // Checker pattern: alternate grass-top vs dirt-top
      // const isGrassTop = (tx + ty) % 2 === 0;
      const isGrassTop = false;
      drawTile(tx * TILE_SIZE, ty * TILE_SIZE, TILE_SIZE, isGrassTop, tx, ty);
    }
  }
}

/*
 drawTile(x, y, size, isGrassTop, tileX, tileY)
 - x,y : top-left in canvas pixels
 - size : screen pixels for tile
 - isGrassTop : if true draw grass-top block, else dirt-top block
 - tileX,tileY : tile indices (used for deterministic texture variation)
*/
function drawTile(x, y, size, isGrassTop, tileX, tileY) {
  const px = TILE_PIXELS;
  const scale = size / px; // how many screen pixels per internal pixel
  // We'll paint internal "pixels" using deterministic pseudo-random for speckles
  for (let j = 0; j < px; j++) {
    for (let i = 0; i < px; i++) {
      // compute deterministic value [0,1) for this tile + pixel
      const v = deterministicNoise(tileX, tileY, i, j);

      // choose color per internal-row to emulate block layers
      let c;
      if (isGrassTop) {
        // Grass-top block: top few rows green (grass), rest dirt with some variation.
        if (j <= 3) {
          // grassy surface: mostly green with small variation
          c = chooseColorFromList([
            color(57, 125, 42),
            color(79, 166, 58),
            color(46, 120, 34)
          ], v);
        } else if (j === 4) {
          // transitional grass/dirt fringe
          c = v < 0.6 ? color(57, 125, 42) : color(103, 67, 38);
          // c = color(57, 125, 42)
        } else {
          // dirt body with speckles
          c = speckledDirtColor(v);
        }
      } else {
        // Dirt-top block: mostly dirt, darker on top, with speckles
        if (j <= 2) {
          c = chooseColorFromList([
            color(103, 67, 38),
            color(88, 53, 32),
            color(120, 75, 42)
          ], v * 0.9);
          // c = chooseColorFromList([
          //   color(57, 125, 42),
          //   color(79, 166, 58),
          //   color(46, 120, 34)
          // ], v);
        } else {
          c = speckledDirtColor(v);
        }
      }

      // add a very light shading on lower rows to suggest depth
      // if (j >= px - 3) {
      //   c = lerpColor(c, color(0, 0, 0, 20), 0.08);
      // }

      // draw the internal pixel as a rectangle scaled to canvas
      noStroke();
      fill(c);
      rect(x + i * scale, y + j * scale, ceil(scale), ceil(scale));
    }
  }

  // Outline to make each tile read as a block
  stroke(0, 0, 0, 80);
  strokeWeight(1);
  noFill();
  rect(x + 0.5, y + 0.5, size - 1, size - 1);
}

// choose a color from list by using v to bias selection
function chooseColorFromList(list, v) {
  const idx = floor(v * list.length) % list.length;
  return list[idx];
}

// dirt color with speckles and slight brightness variation
function speckledDirtColor(v) {
  // base browns (warm dirt palette)
  const browns = [
    color(122, 75, 40),
    color(98, 59, 36),
    color(140, 93, 52),
    color(85, 49, 28)
  ];
  // const browns = [
  //   color(57, 125, 42),
  //           color(79, 166, 58),
  //           color(46, 120, 34)
  // ];
  let c = chooseColorFromList(browns, v);
  // Add small dark speckle if v is near certain thresholds
  // if (v > 0.85) {
  //   c = lerpColor(c, color(60, 30, 16), 0.28);
  // } else if (v < 0.08) {
  //   c = lerpColor(c, color(165, 105, 68), 0.12);
  // }
  return c;
}

// Deterministic pseudo-noise function based on integer hashing.
// Produces a pseudo-random number in [0,1) depending on tile coords and pixel coords.
function deterministicNoise(tileX, tileY, i, j) {
  // mix integers into one 32-bit-ish integer
  let n = tileX;
  n = (n * 374761393) ^ tileY;
  n = (n * 668265263) ^ i;
  n = (n * 2147483647) ^ j;
  // final mix
  n = (n ^ (n >>> 13)) * 1274126177;
  n = (n ^ (n >>> 16)) >>> 0;
  return (n % 10000) / 10000;
}
