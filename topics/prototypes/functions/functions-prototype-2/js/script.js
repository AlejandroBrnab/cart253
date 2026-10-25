/**
 * Catching Stars
 * Name: Alejandro
 *
 * Move the paddle with the mouse to catch falling stars.
 */

"use strict";

let stars = [];
let paddle;
let score = 0;

function setup() {
  // Creates the canvas and initialize the paddle
  createCanvas(500, 400);

  paddle = {
    x: width / 2,
    y: height - 30,
    w: 90,
    h: 20
  };
}

function draw() {
  background(15, 20, 45);
  // Updates and draw each star, starting from the end of the array
  for (let i = stars.length - 1; i >= 0; i--) {
    moveStar(stars[i]);
    drawStar(stars[i]);

    // Removes caught stars and increase the score
    if (checkCatch(stars[i], paddle)) {
      stars.splice(i, 1);
      score++;
    } else if (stars[i].y > height) {
      // Removes stars that fall off the screen
      stars.splice(i, 1);
    }
  }

  // Creates a new star every 40 frames
  if (frameCount % 40 === 0) {
    stars.push(createStar());
  }

  // Keeps the paddle within the canvas boundaries
  paddle.x = constrain(mouseX, paddle.w / 2, width - paddle.w / 2);

  drawPaddle(paddle);
  drawScore(score);
}

// Returns a new star with randomized properties
function createStar() {
  return {
    x: random(15, width - 15),
    y: -10,
    size: random(12, 24),
    speed: random(2, 5)
  };
}

// Moves one star according to its speed
function moveStar(star) {
  star.y += star.speed;
}

// Draws one star using its position and size
function drawStar(star) {
  push();

  fill(255, 220, 70);
  noStroke();
  starShape(star.x, star.y, star.size);

  pop();
}

// Draws a five-point star using its position and size
function starShape(x, y, size) {
  let points = 5;
  let outerRadius = size;
  let innerRadius = size / 2;
  let angle = TWO_PI / points;

  // USed to create a custom shape
  beginShape();

  // Alternates between outer and inner vertices
  for (let i = 0; i < points * 2; i++) {
    let radius;

    if (i % 2 === 0) {
      radius = outerRadius;
    } else {
      radius = innerRadius;
    }

    // Calculates the position of each vertex
    let a = i * angle / 2 - HALF_PI;
    vertex(x + cos(a) * radius, y + sin(a) * radius);
  }

  // Finishes the custom shape creation
  endShape(CLOSE);
}

// Return true if the star overlaps the paddle
function checkCatch(star, paddle) {
  // Calculates the distance between the star and paddle centers
  let horizontalDistance = abs(star.x - paddle.x);
  let verticalDistance = abs(star.y - paddle.y);

  // Checks whether the star is close enough to the paddle
  return (
    horizontalDistance < paddle.w / 2 + star.size / 2 &&
    verticalDistance < paddle.h / 2 + star.size / 2
  );
}

// Draws the paddle
function drawPaddle(paddle) {
  push();

  rectMode(CENTER);
  noStroke();
  fill(80, 200, 160);
  rect(paddle.x, paddle.y, paddle.w, paddle.h, 5);

  pop();
}

// Displays the current score
function drawScore(score) {
  fill(255);
  noStroke();
  textSize(20);
  textAlign(LEFT, TOP);
  text("Score: " + score, 15, 15);
}