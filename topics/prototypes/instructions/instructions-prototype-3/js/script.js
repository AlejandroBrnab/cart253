/**
 * An experimental prototype
 * Name:
 * Alejandro
 *
 * Really just messing around with the 3D figures.
 */

/**
 * Variables that will store position of X and Y for the before static objects
 */

// Sphere
let sphereX = 120;
let sphereY = -60;
let sphereSpeedX = 2;
let sphereSpeedY = 1.5;

// Cone
let coneX = -100;
let coneY = 100;
let coneSpeedX = 2;
let coneSpeedY = -1.5;

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(400, 400, WEBGL); //WEBGL so 3D shapes can be used
}

function draw() {
  background(30);

  drawRingFigure();
  drawCubeFigure();
  drawSphereFigure();
  drawConeFigure();
  drawCylinderFigure();
}

//Draws the ring figure
function drawRingFigure(){
  push();
  rotateX(frameCount * 0.3);
  rotateY(frameCount * 0.3);
  normalMaterial();
  torus(70, 20); //different parameters of the object
  pop();
}

//Draws the cube figure
function drawCubeFigure(){

  push();
  translate(-120, -80, 0); //moving the object
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.01);
  normalMaterial();
  box(50); //50 in all three parameters
  pop();
}

//Draws the sphere figure and it has the logic of the movement
function drawSphereFigure(){
  // Move sphere
  sphereX += sphereSpeedX;
  sphereY += sphereSpeedY;

  // Bounce sphere
  if (sphereX > 165 || sphereX < -165) {
    sphereSpeedX *= -1;
  }

  if (sphereY > 165 || sphereY < -165) {
    sphereSpeedY *= -1;
  }

  push();
  translate(sphereX, sphereY, 30);
  normalMaterial();
  sphere(35); //for all parameters
  pop();
}

//Draws the cone figure and and it has the logic of the movement + changing its size
function drawConeFigure(){
   // Move cone
  coneX += coneSpeedX;
  coneY += coneSpeedY;

  // Bounce cone
  if (coneX > 150 || coneX < -150) {
    coneSpeedX *= -1;
  }

  if (coneY > 150 || coneY < -150) {
    coneSpeedY *= -1;
  }

  push();
  translate(coneX, coneY, 40);
  rotateZ(frameCount * 0.09);
  normalMaterial();

  let coneWidth = 30 + sin(frameCount * 0.03) * 200;
  let coneHeight = 70 + sin(frameCount * 0.02) * 300;
  normalMaterial();
  cone(coneWidth, coneHeight);

  pop();
}

//Draws the cylinder figure
function drawCylinderFigure(){
  push();
  translate(100, 100, -30);
  rotateX(HALF_PI);
  colorMode(HSL);
  noStroke();
  fill(67, 100, 50);
  cylinder(95, 50, 24, 1, false, false); //different parameters of the object. False removes the top and bottom
  pop();
}