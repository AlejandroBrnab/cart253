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
let misses = 0;
let gameOver = false;

function setup() {
  // Creates the canvas and initializes the paddle
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

  // Stop updating the game when the player loses
  if (gameOver) {
    drawGameOver();
    return;
  }

  // Updates and draws each star, starting from the end of the array
  for (let i = stars.length - 1; i >= 0; i--) {
    moveStar(stars[i]);
    drawStar(stars[i]);

    // Removes caught stars and increases the score
    if (checkCatch(stars[i], paddle)) {
      stars.splice(i, 1);
      score++;
    } else if (stars[i].y > height) {
      // Counts a miss when a star falls off the screen
      stars.splice(i, 1);
      misses++;

      // Ends the game after three missed stars
      if (misses >= 3) {
        gameOver = true;
      }
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
  drawMisses(misses);
}

// Restarts the game when the player clicks the Restart button
function mousePressed() {
  if (gameOver) {
    // Check whether the click is inside the Restart button
    if (
      mouseX > width / 2 - 60 &&
      mouseX < width / 2 + 60 &&
      mouseY > height / 2 + 25 &&
      mouseY < height / 2 + 65
    ) {
      // Reset the game variables
      stars = [];
      score = 0;
      misses = 0;
      gameOver = false;
    }
  }
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

  // Begins creating a custom shape
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

  // Finishes and closes the custom shape
  endShape(CLOSE);
}

// Returns true if the star overlaps the paddle
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

// Displays how many stars the player has missed
function drawMisses(misses) {
  fill(255);
  noStroke();
  textSize(16);
  textAlign(RIGHT, TOP);
  text("Misses: " + misses + " / 3", width - 15, 15);
}

// Displays the game-over message and Restart button
function drawGameOver() {
  // Darken the background behind the message
  fill(0, 0, 0, 180);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, width, height);

  // Display the game-over message and final score
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over!", width / 2, height / 2 - 45);

  textSize(18);
  text("Final Score: " + score, width / 2, height / 2 - 10);

  // Draw the Restart button
  rectMode(CENTER);
  fill(80, 200, 160);
  rect(width / 2, height / 2 + 45, 120, 40, 8);

  fill(15, 20, 45);
  textSize(18);
  text("Restart", width / 2, height / 2 + 45);
}