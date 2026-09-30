/**
 * Eye Prototype
 * Name:
 * Alejandro
 *
 * The eyes follow the mouse and blink when clicked.
 */

// Pupil variables
let leftPupilX = 150;
let leftPupilY = 200;

let rightPupilX = 350;
let rightPupilY = 200;

let pupilSize = 30;

// Eye variables
let eyeClosed = false;


function setup() {
  createCanvas(550, 450);
}


function draw() {
  background(220);

  makeLeftEye();
  makeLeftPupil();

  makeRightEye();
  makeRightPupil();

}


/**
 * Creates the left eye.
 */
function makeLeftEye() {

  // Draws a line when the eye is closed
  if (eyeClosed) {

    stroke(0);
    strokeWeight(3);

    line(50, 200, 250, 200);

  } else {

    // Open eye
    fill(255);
    stroke(0);
    strokeWeight(3);

    ellipse(150, 200, 200, 150);
  }
}


/**
 * Makes the left pupil follow the mouse.
 */
function makeLeftPupil() {

  // Pupil won't appear when the eye is closed
  if (!eyeClosed) {

    // Pupil follows mouse
    leftPupilX = mouseX;
    leftPupilY = mouseY;

    // Keep pupil inside the eye
    leftPupilX = constrain(leftPupilX, 100, 200);
    leftPupilY = constrain(leftPupilY, 165, 235);

    // Pupil
    fill(0);
    noStroke();

    ellipse(leftPupilX, leftPupilY, pupilSize);
  }
}


/**
 * Creates the right eye.
 */
function makeRightEye() {

  // Draws a line when the eye is closed
  if (eyeClosed) {

    stroke(0);
    strokeWeight(3);

    line(300, 200, 500, 200);

  } else {

    // Open eye
    fill(255);
    stroke(0);
    strokeWeight(3);

    ellipse(350, 200, 200, 150);
  }
}


/**
 * Makes the right pupil follow the mouse.
 */
function makeRightPupil() {

  // Pupil won't appear when the eye is closed
  if (!eyeClosed) {

    // Pupil follows mouse
    rightPupilX = mouseX;
    rightPupilY = mouseY;

    // Keep pupil inside the eye
    rightPupilX = constrain(rightPupilX, 300, 400);
    rightPupilY = constrain(rightPupilY, 165, 235);

    // Pupil
    fill(0);
    noStroke();

    ellipse(rightPupilX, rightPupilY, pupilSize);
  }
}


/**
 * Makes both eyes blink when clicked.
 */
function mousePressed() {

  eyeClosed = true;

  // Open the eyes again
  setTimeout(function() {

    eyeClosed = false;

  }, 200);
}