/**
 * Fish Prototype
 * Name:
 * Alejandro
 *
 * The fish swims away from the mouse when it gets too close.
 */

// Fish object
let fish = {
  x: 200,
  y: 200,
  size: 80,
  speed: 3,
  swimSpeed: 0.8,
  swimDirection: 1,
  scared: false,
  direction: 1
};

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(180, 220, 240);

  updateFish();
  drawThoughts();
  drawFish();
}

/**
 * Checks how close the mouse is to the fish.
 */
function updateFish() {
  let distance = dist(mouseX, mouseY, fish.x, fish.y);

  if (distance < 100) {
    fish.scared = true;

    // Moves away from the mouse
    if (mouseX < fish.x) {
      fish.x += fish.speed;
      fish.direction = 1;
    } else {
      fish.x -= fish.speed;
      fish.direction = -1;
    }

    if (mouseY < fish.y) {
      fish.y += fish.speed;
    } else {
      fish.y -= fish.speed;
    }

  } else {
    fish.scared = false;

    // Normal swimming
    fish.x += fish.swimSpeed * fish.swimDirection;

    // Fish faces the direction it is swimming
    fish.direction = fish.swimDirection;

    // Turn around at the edges
    if (fish.x > width - 50) {
      fish.swimDirection = -1;
    }

    if (fish.x < 50) {
      fish.swimDirection = 1;
    }
  }

  // Keeps the fish inside the canvas
  fish.x = constrain(fish.x, 50, width - 50);
  fish.y = constrain(fish.y, 40, height - 40);
}

/**
 * Draws the fish.
 */
function drawFish() {
  push();

  translate(fish.x, fish.y);
  scale(fish.direction, 1);

  drawBody();
  drawTail();
  drawEye();

  pop();
}

/**
 * Draws the fish body.
 */
function drawBody() {
  fill(255, 150, 100);
  stroke(0);
  strokeWeight(2);

  ellipse(0, 0, fish.size, fish.size / 2);
}

/**
 * Draws the fish tail.
 */
function drawTail() {
  fill(255, 150, 100);

  triangle(-fish.size / 2, 0, -fish.size / 2 - 30, -25, -fish.size / 2 - 30, 25 );
}

/**
 * Draws the fish eye.
 */
function drawEye() {
  fill(0);
  noStroke();

  ellipse(25, -5, 8, 8);
}

/**
 * Displays fish's thoughts depending on its feelings.
 */
function drawThoughts() {
  textAlign(CENTER);
  textSize(50);

  // Colour for the phrase
  fill(255, 255, 255, 180);

  // Makes the text gently move like water
  let wave = sin(frameCount * 0.02) * 10;

  if (fish.scared) {
    text("GO AWAY PLEASE", width / 2, 150 + wave);
  } else {
    text("I'm just swimming...", width / 2, 150 + wave);
  }
}