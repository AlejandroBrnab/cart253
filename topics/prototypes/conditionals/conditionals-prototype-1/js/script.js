/**
 * Mystery Box Prototype
 * Name: Alejandro
 *
 * Click the box to see what you can get from it.
 */

// Box object
let box = {
  x: 125,
  y: 150,
  width: 150,
  height: 120,
  opened: false,
  result: ""
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  drawBox();
  drawMessage();
}

// Draws the box
function drawBox() {
  fill(150, 90, 40);
  rect(box.x, box.y, box.width, box.height);

  // Ribbon of the box
  fill(220, 180, 40);
  rect(190, 150, 20, 120);
  rect(125, 195, 150, 20);
}

// Draws a message below the box
function drawMessage() {
  fill(0);
  textAlign(CENTER);
  textSize(20);

  if (box.opened) {
    text(box.result, width / 2, 320);
  } else {
    text("Click the box!", width / 2, 320);
  }
}

// Checks if the box was clicked
function mousePressed() {
  if (isMouseOverBox()) {
    openBox();
  }
}

// Checks whether the mouse is inside the box
function isMouseOverBox() {
  // Basically the mouse needs to be strictly inside the box in order to open it
  return (
    mouseX > box.x &&
    mouseX < box.x + box.width &&
    mouseY > box.y &&
    mouseY < box.y + box.height
  );
}

// Decides what is inside the box
function openBox() {
  let chance = random(100);

  if (chance < 60) {
    box.result = "You found a coin!";
  } else if (chance < 90) {
    box.result = "Nothing... :(";
  } else {
    box.result = "A MONSTER?!";
  }

  box.opened = true;
}