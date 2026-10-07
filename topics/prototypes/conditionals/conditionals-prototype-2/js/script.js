/**
 * Red Button Prototype
 * Name: Alejandro
 *
 * OHH A RED BUTTON :O
 */

// Button object
let button = {
  x: 200,
  y: 200,
  size: 165,
  clicks: 0,
  destroyed: false
};

// Explosion object
let explosion = {
  active: false,
  size: 0,
  maxSize: 350
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  drawBackground();

  if (explosion.active) {
    updateExplosion();
    drawExplosion();

  } else if (!button.destroyed) {
    drawButton();
  }

  drawMessage();
}

/**
 * Changes the background every time the button is clicked.
 */
function drawBackground() {
  // The background becomes more red by every click
  let greenBlue = constrain(220 - button.clicks * 25, 0, 220);

  background(220, greenBlue, greenBlue);
}

// Draws the red button
function drawButton() {
  fill(200, 0, 0);
  ellipse(button.x, button.y, button.size, button.size);

  drawButtonText();
}

// Draws text inside the button
function drawButtonText() {
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text("DO NOT PRESS", button.x, button.y + 5);
}

/**
 * Updates the explosion animation.
 */
function updateExplosion() {
  explosion.size += 12;

  if (explosion.size >= explosion.maxSize) {
    explosion.size = 0;
    explosion.active = false;

    // The explosion destroys the button
    button.destroyed = true;
  }
}

/**
 * Draws the explosion.
 */
function drawExplosion() {
  noStroke();

  // Outer explosion
  fill(255, 80, 0);
  ellipse(button.x, button.y, explosion.size, explosion.size);

  // Inner explosion
  fill(255, 200, 0);
  ellipse(button.x, button.y, explosion.size * 0.65, explosion.size * 0.65);

  // White center
  fill(255);
  ellipse(button.x, button.y, explosion.size * 0.3, explosion.size * 0.3);
}

// Draws a message depending on the number of clicks
function drawMessage() {
  fill(0);
  textAlign(CENTER);
  textSize(18);

  if (explosion.active) {
    text("BOOM!", 200, 350);
  } else if (button.destroyed) {
    text("...", 200, 320);
  } else if (button.clicks == 0) {
    text("Whatever you do... don't press it.", 200, 320);
  } else if (button.clicks == 1) {
    text("I told you not to.", 200, 320);
  } else if (button.clicks == 2) {
    text("Why did you press it again?", 200, 320);
  } else if (button.clicks == 3) {
    text("STOP.", 200, 320);
  } else {
    text("You really can't resist, can you?", 200, 320);
  }
}

// Checks whether the button was clicked
function mousePressed() {
  if (isMouseOverButton() && !explosion.active && !button.destroyed) {
    button.clicks++;

    // Explosion happens after the last message
    if (button.clicks >= 6) {
      explosion.active = true;
    }
  }
}

// Checks if the mouse is inside the button
function isMouseOverButton() {
  let distance = dist(
    mouseX,
    mouseY,
    button.x,
    button.y
  );

  return distance < button.size / 2;
}