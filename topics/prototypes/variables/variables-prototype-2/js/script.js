/**
 * Eye Prototype
 * Name:
 * Alejandro
 *
 * The eyes follow the mouse and blink when clicked. It gets mad after 6 clicks
 */

// Pupil variables
let leftPupilX = 150;
let leftPupilY = 200;

let rightPupilX = 350;
let rightPupilY = 200;

let pupilSize = 30;

// Eye variables
let eyeClosed = false;

// variable to make the eyes angry
let clickCount = 0;

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

  if (eyeClosed) {

    stroke(0);
    strokeWeight(3);

    line(50, 200, 250, 200);

  } else if (clickCount >= 6) {

    // Angry left eye
    fill(255);
    stroke(0);
    strokeWeight(3);

    ellipse(150, 200, 200, 150);

    // Angry eyebrow
    line(70, 110, 220, 125);

  } else {

    // Normal left eye
    fill(255);
    stroke(0);
    strokeWeight(3);

    ellipse(150, 200, 200, 150);

    // Normal eyebrow
    line(70, 105, 220, 105);
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

  if (eyeClosed) {

    stroke(0);
    strokeWeight(3);

    line(300, 200, 500, 200);

  } else if (clickCount >= 6) {

    // Angry right eye
    fill(255);
    stroke(0);
    strokeWeight(3);

    ellipse(350, 200, 200, 150);

    // Angry eyebrow
    line(280, 125, 430, 110);

  } else {

    // Normal right eye
    fill(255);
    stroke(0);
    strokeWeight(3);

    ellipse(350, 200, 200, 150);

    // Normal eyebrow
    line(280, 105, 430, 105);
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

  clickCount++;

  eyeClosed = true;

  setTimeout(function() {

    eyeClosed = false;

  }, 200);
}