/**
 * Magnet Prototype
 * Name:
 * Alejandro
 *
 * The magnet follows the mouse.
 */

// Magnet variables
let circleX = 100;
let circleY = 100;

let speed = 0.02;
let circleSize = 40;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  moveMagnet();
  makeMagnet();

  makeMouseTarget();

}

/**
 * Makes the magnet move toward the mouse.
 */
function moveMagnet() {

  circleX += (mouseX - circleX) * speed;
  circleY += (mouseY - circleY) * speed;

}

/**
 * Creates the magnet.
 */
function makeMagnet() {

  fill(50, 100, 200);
  noStroke();

  ellipse(circleX, circleY, circleSize);

}

/**
 * Creates the mouse target.
 */
function makeMouseTarget() {

  fill(0);
  noStroke();

  ellipse(mouseX, mouseY, 10);

}