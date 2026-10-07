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
  size: 150,
  clicks: 0
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  drawButton();
  drawMessage();
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

// Draws a message depending on the number of clicks
function drawMessage() {
  fill(0);
  textAlign(CENTER);
  textSize(18);

  if (button.clicks == 0) {
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
  if (isMouseOverButton()) {
    button.clicks++;
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