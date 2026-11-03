/**
 * Ball Pit
 * Name: Alejandro
 *
 * Click to create balls that fall, bounce, and collide between them.
 *
 * Based on the Boingo code for the array challenge
 */

"use strict";

// Stores all the balls in the simulation
let balls = [];

function setup() {
  // Creates the canvas
  createCanvas(500, 400);
}

function draw() {
  background("#87ceeb");

  // Updates and draws every ball
  for (let i = 0; i < balls.length; i++) {
    moveBall(balls[i]);
    bounceBall(balls[i]);
    drawBall(balls[i]);
  }

  // Checks for collisions between balls
  collideBalls();

  // Draws the ground
  drawGround();

  // Displays the number of balls
  fill(20);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text("Balls: " + balls.length, 10, 10);
}

/**
 * Creates a new ball with random properties
 */
function createBall() {
  const newBall = {
    // Position and size
    x: mouseX,
    y: mouseY,
    size: random(15, 30),

    // Colour
    fill: color(random(255), random(255), random(255)),

    // Movement
    velocity: {
      x: random(-2, 2),
      y: random(-2, 0)
    }
  };

  // Returns the new ball object
  return newBall;
}

/**
 * Moves the ball and applies gravity
 */
function moveBall(ball) {
  // Adds gravity to the vertical velocity
  ball.velocity.y += 0.2;

  // Updates the ball's position
  ball.x += ball.velocity.x;
  ball.y += ball.velocity.y;
}

/**
 * Makes the ball bounce off the walls and floor
 */
function bounceBall(ball) {
  // Checks the left and right edges
  if (ball.x - ball.size / 2 < 0) {
    ball.x = ball.size / 2;
    ball.velocity.x *= -0.8;
  }

  if (ball.x + ball.size / 2 > width) {
    ball.x = width - ball.size / 2;
    ball.velocity.x *= -0.8;
  }

  // Checks the floor
  if (ball.y + ball.size / 2 > height - 25) {
    ball.y = height - 25 - ball.size / 2;

    // Makes the ball bounce with less energy
    ball.velocity.y *= -0.7;

    // Stops tiny bouncing when the ball settles
    if (abs(ball.velocity.y) < 1) {
      ball.velocity.y = 0;
    }
  }
}

/**
 * Checks and handles collisions between balls
 */
function collideBalls() {
  // Compares every ball with the other balls
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let ballA = balls[i];
      let ballB = balls[j];

      // Calculates the distance between their centers
      let dx = ballB.x - ballA.x;
      let dy = ballB.y - ballA.y;
      let distance = sqrt(dx * dx + dy * dy);

      // Calculates the minimum distance before they overlap
      let minDistance = (ballA.size + ballB.size) / 2;

      if (distance < minDistance && distance > 0) {
        // Calculates the direction between the two balls
        let nx = dx / distance;
        let ny = dy / distance;

        // Separates the overlapping balls
        let overlap = minDistance - distance;
        ballA.x -= nx * overlap / 2;
        ballA.y -= ny * overlap / 2;
        ballB.x += nx * overlap / 2;
        ballB.y += ny * overlap / 2;

        // Calculates their relative velocity
        let relativeVelocity =
          (ballB.velocity.x - ballA.velocity.x) * nx +
          (ballB.velocity.y - ballA.velocity.y) * ny;

        // Only applies a bounce if the balls are moving towards each other
        if (relativeVelocity < 0) {
          ballA.velocity.x += relativeVelocity * nx;
          ballA.velocity.y += relativeVelocity * ny;
          ballB.velocity.x -= relativeVelocity * nx;
          ballB.velocity.y -= relativeVelocity * ny;
        }
      }
    }
  }
}

/**
 * Draws the ball using its stored properties
 */
function drawBall(ball) {
  push();

  noStroke();
  fill(ball.fill);
  ellipse(ball.x, ball.y, ball.size);

  pop();
}

/**
 * Draws the ground at the bottom of the canvas
 */
function drawGround() {
  noStroke();
  fill("#4b8b45");
  rect(0, height - 25, width, 25);
}

/**
 * Creates a new ball when the mouse is pressed
 */
function mousePressed() {
  // Adds a new ball to the array
  balls.push(createBall());
}