/**
 * Candle Prototype
 * Name:
 * Alejandro
 *
 * Time goes on and the candle dies.
 * At the same time, night turns into day.
 */

// Candle variables
let candleHeight = 150;
let flameSize = 30;
let meltSpeed = 0.2;

// Time variables
let backgroundBrightness = 0;
let daySpeed = 0.2;

// Moon variables
let moonX = 80;
let moonY = 100;

// Sun variables
let sunX = 320;
let sunY = 100;


function setup() {
  createCanvas(400, 400);
}


function draw() {

  changeDayToNight();
  makeMoon();
  makeSun();
  makeCandle();

}


/**
 * Changes the background from black to white.
 */
function changeDayToNight() {

  // Background changes from black to white
  background(backgroundBrightness);

  // Increase brightness over time
  if (backgroundBrightness < 255) {
    backgroundBrightness += daySpeed;
  }
}


/**
 * Creates the moon and makes it move away
 * as the day arrives.
 */
function makeMoon() {

  // Moon moves to the left
  if (moonX > -50) {
    moonX -= 0.3;
  }

  // Moon becomes darker as the day arrives
  let moonBrightness = 255 - backgroundBrightness;

  fill(moonBrightness);
  noStroke();

  ellipse(moonX, moonY, 50, 50);
}


/**
 * Creates the sun and makes it appear
 * as the day arrives.
 */
function makeSun() {

  // Sun moves to the left
  if (sunX > 200) {
    sunX -= 0.3;
  }

  // Sun becomes more visible as the day arrives
  let sunBrightness = backgroundBrightness;

  fill(255, 200, 0, sunBrightness);
  noStroke();

  ellipse(sunX, sunY, 60, 60);
}


/**
 * Creates the candle and makes it melt.
 */
function makeCandle() {

  let candleX = 200;
  let candleY = 300;

  // Candle melts over time
  if (candleHeight > 30) {
    candleHeight -= meltSpeed;
  }

  // Candle
  fill(240);
  noStroke();

  rect(candleX - 30, candleY - candleHeight, 60, candleHeight);

  // Wick
  stroke(0);
  strokeWeight(3);

  line(candleX, candleY - candleHeight, candleX, candleY - candleHeight - 15
  );

  // Flame
  noStroke();
  fill(255, 150, 0);

  ellipse( candleX, candleY - candleHeight - 30, flameSize, flameSize * 1.5);
}