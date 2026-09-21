/**
 * A penguin
 * Name:
 * Alejandro
 *
 * It is a penguin.
 */

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draws the penguin
 */
function draw() {
  background("lightblue");

  // No stroke everywhere!
  noStroke();

  drawPenguin();
}

/**
 * Draws the penguin using functions
 */
function drawPenguin() {
  drawLandscape();
  drawArms();
  drawBody();
  drawHead();
  drawEyes();
  drawBeak();
  drawFeet();
}

/**
 * Draws the penguin's body
 */
function drawBody() {

  // Penguin's black body
  push();
  fill("black");
  ellipse(200, 275, 180, 220);
  pop();

  // Penguin's white belly
  push();
  fill("white");
  ellipse(200, 285, 120, 170);
  pop();
}

/**
 * Draws the penguin's arms
 */
function drawArms(){

  // left arm
  push();
  fill("black");
  // had to add this so it doesn't weirdly (this makes it rotate around the point in the translate function)
  translate(110, 260);
  angleMode(DEGREES);
  rotate(-60);
  ellipse(0, 0, 80, 40);
  pop();

  // right arm
  push();
  fill("black");
  // had to add this so it doesn't weirdly (this makes it rotate around the point in the translate function)
  translate(290, 260);
  angleMode(DEGREES);
  rotate(60);
  ellipse(0, 0, 80, 40);
  pop();
}

/**
 * Draws the penguin's head
 */
function drawHead() {

  // Penguin's head
  push();
  fill("black");
  circle(200, 145, 160);
  pop();

  // Penguin's face
  push();
  fill("white");
  ellipse(200, 150, 120, 100);
  pop();
}

/**
 * Draws the penguin's eyes
 */
function drawEyes() {

  // Left eye
  push();
  fill("black");
  circle(175, 140, 20);
  pop();

  // Right eye
  push();
  fill("black");
  circle(225, 140, 20);
  pop();
}

/**
 * Draws the penguin's beak
 */
function drawBeak() {

  push();
  fill("orange");
  triangle(185, 160, 210, 160, 200, 190);
  pop();
}

/**
 * Draws the penguin's feet
 */
function drawFeet() {

  push();
  fill("orange");

  // Left foot
  ellipse(155, 385, 80, 30);

  // Right foot
  ellipse(245, 385, 80, 30);

  pop();
}

/**
 * Draws the landscape
 */
function drawLandscape() {

  // Ground (snow)
  push();
  fill("white");
  rect(0, 350, 400, 50);
  pop();

  // Sun
  push();
  fill("yellow");
  circle(400, 15, 250);
  pop();
}