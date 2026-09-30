/**
 * Eye Prototype
 * Name:
 * Alejandro
 *
 * The eye follows the mouse and blinks when clicked.
 */

// Pupil variables
let pupilX = 200;
let pupilY = 200;
let pupilSize = 30;

// Eye variables
let eyeClosed = false;


function setup() {
  createCanvas(400, 400);
}


function draw() {
  background(220);
  makeEye();
  makePupil();

}

/**
 * Creates the eye.
 */
function makeEye() {

  // Draws a line when the eye is closed
  if (eyeClosed) {

    stroke(0);
    strokeWeight(3);

    line(75, 200, 325, 200);

  } else {

    // Open eye
    fill(255);
    stroke(0);
    strokeWeight(3);

    ellipse(200, 200, 250, 150);
  }
}


/**
 * Makes the pupil follow the mouse.
 */
function makePupil() {

  // Pupil won't appear when the eye is closed
  if (!eyeClosed) {

    // Pupil follows mouse
    pupilX = mouseX;
    pupilY = mouseY;

    // Keep pupil inside the eye
    pupilX = constrain(pupilX, 130, 270);
    pupilY = constrain(pupilY, 165, 235);

    // Pupil
    fill(0);
    noStroke();

    ellipse(pupilX, pupilY, pupilSize);
  }
}


/**
 * Makes the eye blink when clicked.
 */
function mousePressed() {

  eyeClosed = true;

  // Open the eye again
  setTimeout(function() {

    eyeClosed = false;

  }, 200);
}