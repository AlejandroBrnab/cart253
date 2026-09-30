/**
 * Candle Prototype
 * Name:
 * Alejandro
 *
 * Time goes on and the candle dies with every minute that passes
 */

// Variables
let candleHeight = 150;
let flameSize = 30;
let meltSpeed = 0.2;

function setup() {
  createCanvas(400, 400);
}
/**
 * Creates the canvas
 */
function draw() {
  background(30);

  // Candle position
  let candleX = 200;
  let candleY = 300;

  // Melt candle
  if (candleHeight > 30) {
    candleHeight -= meltSpeed;
  }

  // Candle
  fill(240);
  noStroke();
  rect(
    candleX - 30,
    candleY - candleHeight,
    60,
    candleHeight
  );

  // Wick
  stroke(0);
  strokeWeight(3);
  line(
    candleX,
    candleY - candleHeight,
    candleX,
    candleY - candleHeight - 15
  );

  // Flame
  noStroke();
  fill(255, 150, 0);
  ellipse(
    candleX,
    candleY - candleHeight - 30,
    flameSize,
    flameSize * 1.5
  );
}