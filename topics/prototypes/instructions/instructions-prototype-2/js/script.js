/**
 * Abstract prototype.
 * Name:
 * Alejandro
 *
 * It is something abstract (thought about something with mirrors hanging from some kind of strings)
 */

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(225);
  // noStroke();

  drawTopString();
  drawMiddleString();
  drawBottomString();
  
}

// Functions to draw each of the hanging strings (using curves) and their "mirrors"
function drawTopString(){

  push();
  noFill();
  stroke("black");
  strokeWeight(5);
  
  // Top string
  bezier(30, 25, 150, 140, 260, 120, 375, 25);

  pop();
  
}

function drawMiddleString(){

  push();
  noFill();
  stroke("black");
  strokeWeight(5);

  // Middle string
  bezier(30, 140, 150, 255, 260, 235, 375, 140);

  pop();
  
}

function drawBottomString(){

  push();
  noFill();
  stroke("black");
  strokeWeight(5);

  // Bottom string
  bezier(30, 255, 150, 370, 260, 350, 375, 255);

  pop();
  
}