/**
 * Mystery Box Prototype
 * Name: Alejandro
 *
 * Click the box to open it and see what you can get.
 */

// Box object
let box = {
  x: 125,
  y: 150,
  width: 150,
  height: 120,
  opened: false,
  opening: false,
  result: "",
  lidY: 150
};

// Counter object
let counters = {
  coins: 0,
  nothing: 0,
  monsters: 0
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  drawCounters();
  updateBox();
  drawBox();
  drawMessage();
}

/**
 * Draws the counters in the top-left.
 */
function drawCounters() {
  fill(0);
  textAlign(LEFT);
  textSize(16);

  if (counters.coins > 0) {
    text("Coins: " + counters.coins, 15, 25);
  }

  if (counters.nothing > 0) {
    text("Nothing: " + counters.nothing, 15, 45);
  }

  if (counters.monsters > 0) {
    text("Monsters: " + counters.monsters, 15, 65);
  }
}

/**
 * Updates the box opening animation.
 */
function updateBox() {
  if (box.opening) {

    // Move the lid upward
    box.lidY -= 2;

    // Stops the animation after the lid lifts
    if (box.lidY <= 90) {
      box.lidY = 90;
      box.opening = false;
      box.opened = true;

      // Wait 3 seconds before closing the box again
      setTimeout(closeBox, 3000);
    }
  }
}

/**
 * Draws the box.
 */
function drawBox() {
  // Bottom part of the box
  fill(150, 90, 40);
  rect(box.x, box.y, box.width, box.height);

  // Ribbon on the box
  fill(220, 180, 40);
  rect(190, box.y, 20, box.height);

  // Horizontal ribbon
  rect(box.x, 195, box.width, 20);

  // Draws the lid separately
  drawLid();
}

/**
 * Draws the lid of the box.
 */
function drawLid() {
  fill(130, 70, 30);

  rect(box.x, box.lidY, box.width, 20);

  // Ribbon on the lid
  fill(220, 180, 40);

  rect(190, box.lidY, 20, 20);
}

/**
 * Draws a message below the box.
 */
function drawMessage() {
  fill(0);
  textAlign(CENTER);
  textSize(20);

  if (box.opened) {
    text(box.result, width / 2, 320);
  } else if (box.opening) {
    text("Opening...", width / 2, 320);
  } else {
    text("Click the box!", width / 2, 320);
  }
}

/**
 * Checks if the box was clicked.
 */
function mousePressed() {
  if (isMouseOverBox() && !box.opened && !box.opening) {
    openBox();
  }
}

/**
 * Checks whether the mouse is inside the box.
 */
function isMouseOverBox() {
  return (
    mouseX > box.x &&
    mouseX < box.x + box.width &&
    mouseY > box.y &&
    mouseY < box.y + box.height
  );
}

/**
 * Decides what is inside the box.
 */
function openBox() {
  let chance = random(100);

  if (chance < 60) {
    box.result = "You found a coin!";
    counters.coins++;
  } else if (chance < 90) {
    box.result = "Nothing... :(";
    counters.nothing++;
  } else {
    box.result = "Mike Wazowski!";
    counters.monsters++;
  }

  // Starts the opening animation
  box.opening = true;
}

/**
 * Closes the box and resets it.
 */
function closeBox() {
  box.lidY = 150;
  box.opened = false;
  box.opening = false;
  box.result = "";
}