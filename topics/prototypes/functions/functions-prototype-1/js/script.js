/**
 * Shape Painter
 * Name: Alejandro
 *
 * Click to create shapes on the canvas.
 */

"use strict";

// Array to store all the shapes created by the user
let shapes = [];

function setup() {
  // Creates the canvas and sets its background color
  createCanvas(500, 400);
  background(25, 30, 45);
}

function draw() {
  background(25, 30, 45);

  // Draws and moves each shape stored in the array
  for (let i = 0; i < shapes.length; i++) {
    moveShape(shapes[i]);
    drawShape(shapes[i]);
  }
}

// Creates a shape when the mouse is clicked
function mousePressed() {
  // Creates a shape at the mouse position and stores it in the array
  let newShape = createShape(mouseX, mouseY);
  shapes.push(newShape);
}

// Creates and returns a shape object with randomized data
function createShape(x, y) {
  let shape = {
    x: x,
    y: y,
    size: random(20, 70),
    type: random(["circle", "square", "triangle"]),
    color: color(random(100, 255), random(100, 255), random(100, 255)),
    vx: random(-1.5, 1.5),
    vy: random(-1.5, 1.5)
  };

  // Returns the new object so it can be stored and drawn
  return shape;
}

// Moves a shape and makes it bounce off the canvas edges
function moveShape(shape) {
  // Updates the shape's position using its velocity
  shape.x += shape.vx;
  shape.y += shape.vy;

  // Reverses the horizontal direction at the edges
  if (shape.x < shape.size / 2 || shape.x > width - shape.size / 2) {
    shape.vx *= -1;
  }

  // Reverses the vertical direction at the edges
  if (shape.y < shape.size / 2 || shape.y > height - shape.size / 2) {
    shape.vy *= -1;
  }
}

// Draws a shape using its properties
function drawShape(shape) {
  push();

  // Uses the color stored in the shape object and removes its outline
  noStroke();
  fill(shape.color);

  // Checks the shape type to determine which drawing function to use
  if (shape.type === "circle") {
    ellipse(shape.x, shape.y, shape.size);
  } else if (shape.type === "square") {
    // Centers the square on its position
    rectMode(CENTER);
    rect(shape.x, shape.y, shape.size, shape.size);
  } else if (shape.type === "triangle") {
    // Calculates half the size to position the triangle's vertices
    let halfSize = shape.size / 2;

    triangle(
      shape.x, shape.y - halfSize,
      shape.x - halfSize, shape.y + halfSize,
      shape.x + halfSize, shape.y + halfSize
    );
  }

  pop();
}