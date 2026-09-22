/**
 * An experimental prototype
 * Name:
 * Alejandro
 *
 * Really just messing around with the 3D figures.
 */

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
  push();
  translate(120, -60, 30);
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
  push();
  translate(100, 100, -30);
  rotateX(HALF_PI);
  normalMaterial();
  cylinder(25, 80); //different parameters of the object
  pop();
}