/**
 * Magnet Prototype
 * Name:
 * Alejandro
 *
 * The magnets follow the mouse. When they collide, they repel each other. Follow mouse again after that
 */

// First magnet variables
let circleX = 100;
let circleY = 100;

// Second magnet variables
let circle2X = 300;
let circle2Y = 300;

let speed = 0.01;
let circleSize = 40;

// Repulsion variables
let isRepelling = false;
let repelSpeed = 10;
let repelTime = 0;
let showOuch = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  moveMagnets();
  checkCollision();

  makeMagnet();
  makeSecondMagnet();

  makeOuchText();
  makeMouseTarget();
}

/**
 * Makes the magnets move toward the mouse.
 */
function moveMagnets() {

  if (!isRepelling) {

    // First magnet follows mouse
    circleX += (mouseX - circleX) * speed;
    circleY += (mouseY - circleY) * speed;

    // Second magnet follows mouse
    circle2X += (mouseX - circle2X) * speed;
    circle2Y += (mouseY - circle2Y) * speed;

  } else {

    // Magnets repel each other
    if (circleX < circle2X) {
      circleX -= repelSpeed;
      circle2X += repelSpeed;
    } else {
      circleX += repelSpeed;
      circle2X -= repelSpeed;
    }

    if (circleY < circle2Y) {
      circleY -= repelSpeed;
      circle2Y += repelSpeed;
    } else {
      circleY += repelSpeed;
      circle2Y -= repelSpeed;
    }

    // Count how long they have been repelling
    repelTime++;

    if (repelTime > 60) {
      isRepelling = false;
      repelTime = 0;
      showOuch = false;
    }
  }

  // Keep first magnet inside canvas
  circleX = constrain(circleX, circleSize / 2, width - circleSize / 2);

  circleY = constrain(circleY, circleSize / 2, height - circleSize / 2);

  // Keep second magnet inside canvas
  circle2X = constrain(circle2X, circleSize / 2, width - circleSize / 2);

  circle2Y = constrain(circle2Y, circleSize / 2, height - circleSize / 2);
}

/**
 * Checks if the two magnets collide.
 */
function checkCollision() {

  //dist calculate distance between two points
  let distanceBetweenMagnets = dist(circleX, circleY, circle2X, circle2Y);

  if (distanceBetweenMagnets < circleSize && !isRepelling) {
    isRepelling = true;
    repelTime = 0;

    // Show "OUCH!"
    showOuch = true;
  }
}

/**
 * Creates the first magnet.
 */
function makeMagnet() {

  fill(50, 100, 200);
  noStroke();

  ellipse(circleX, circleY, circleSize);
}

/**
 * Creates the second magnet.
 */
function makeSecondMagnet() {

  fill(200, 50, 50);
  noStroke();

  ellipse(circle2X, circle2Y, circleSize);
}

/**
 * Creates the mouse target.
 */
function makeMouseTarget() {

  fill(0);
  noStroke();

  ellipse(mouseX, mouseY, 10);
}

/**
 * When they collide they say ouch
 */
function makeOuchText() {

  if (showOuch) {

    fill(0);
    noStroke();
    textSize(24);
    textAlign(CENTER);

    text("OUCH!", (circleX + circle2X) / 2, (circleY + circle2Y) / 2 - 30);
  }
}