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

// Cylinder
let cylinderX = 100;
let cylinderY = 100;
let cylinderSpeedX = -2;
let cylinderSpeedY = 1.5;

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
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
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

//Draws the sphere figure
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

//Draws the cone figure
function drawConeFigure(){
  push();
  translate(-100, 100, 40);
  rotateZ(frameCount * 0.01);
  normalMaterial();
  cone(30, 70); //different parameters of the object
  pop();
}

//Draws the cylinder figure
function drawCylinderFigure(){
  // Move cylinder
  cylinderX += cylinderSpeedX;
  cylinderY += cylinderSpeedY;

  // Bounce cylinder
  if (cylinderX > 155 || cylinderX < -155) {
    cylinderSpeedX *= -1;
  }

  if (cylinderY > 155 || cylinderY < -155) {
    cylinderSpeedY *= -1;
  }

  push();
  translate(cylinderX, cylinderY, -30);
  rotateX(HALF_PI);
  normalMaterial();
  cylinder(25, 80); //different parameters of the object
  pop();
}