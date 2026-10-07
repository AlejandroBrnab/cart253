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
  scared: false
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(180, 220, 240);

  updateFish();
  drawFish();
  drawMessage();
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
    } else {
      fish.x -= fish.speed;
    }

    if (mouseY < fish.y) {
      fish.y += fish.speed;
    } else {
      fish.y -= fish.speed;
    }

  } else {
    fish.scared = false;
  }

  // Keeps the fish inside the canvas
  fish.x = constrain(fish.x, 50, width - 50);
  fish.y = constrain(fish.y, 40, height - 40);
}

/**
 * Draws the fish.
 */
function drawFish() {

  drawBody();
  drawTail();
  drawEye();
}

/**
 * Draws the fish body.
 */
function drawBody() {

  fill(255, 150, 100);
  stroke(0);
  strokeWeight(2);

  ellipse(
    fish.x,
    fish.y,
    fish.size,
    fish.size / 2
  );
}

/**
 * Draws the fish tail.
 */
function drawTail() {

  fill(255, 150, 100);

  triangle(
    fish.x - fish.size / 2,
    fish.y,
    fish.x - fish.size / 2 - 30,
    fish.y - 25,
    fish.x - fish.size / 2 - 30,
    fish.y + 25
  );
}

/**
 * Draws the fish eye.
 */
function drawEye() {

  fill(0);
  noStroke();

  ellipse(
    fish.x + 25,
    fish.y - 5,
    8,
    8
  );
}

/**
 * Displays a message depending on the fish's feelings.
 */
function drawMessage() {

  fill(0);
  textAlign(CENTER);
  textSize(18);

  if (fish.scared) {

    text("Go away!", width / 2, 350);

  } else {

    text("I'm just swimming...", width / 2, 350);
  }
}