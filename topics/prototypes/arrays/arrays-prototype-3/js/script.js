/**
 * Tiny Aquarium Prototype
 * Name: Alejandro
 *
 * Click to add new fish or remove existing ones.
 */

"use strict";

// Stores all the fish in the aquarium
let fish = [];

// Available fish colors
let fishColors = [
    "#ff9f68",
    "#f4d35e",
    "#ee6c9e",
    "#80cfa9",
    "#9b8de5",
    "#65bde0"
];

// Sets up the canvas and creates the initial fish
function setup() {
    createCanvas(700, 500);

    // Creates five fish at the beginning
    for (let i = 0; i < 5; i++) {
        fish.push(createFish());
    }
}

// Draws the aquarium
function draw() {
    drawBackground();
    drawInstructions();
    drawFish();
    drawFishCount();
}

// Draws the aquarium background
function drawBackground() {
    background("#b8e5eb");

    // Draws the sandy bottom
    noStroke();
    fill("#e8d6a3");
    rect(0, height - 35, width, 35);

    // Draws some seaweed
    drawSeaweed(80, height - 35);
    drawSeaweed(620, height - 35);
    drawSeaweed(660, height - 35);
}

// Draws decorative seaweed
function drawSeaweed(x, y) {
    stroke("#579b75");
    strokeWeight(5);
    noFill();

    // Draws seaweed stems using connected points
    beginShape();
    vertex(x, y);
    vertex(x - 10, y - 25);
    vertex(x + 10, y - 50);
    vertex(x - 8, y - 75);
    vertex(x, y - 110);
    endShape();

    noStroke();
}

// Displays the instructions
function drawInstructions() {
    fill("#164e63");
    textSize(22);
    textAlign(CENTER, CENTER);
    text("TINY AQUARIUM", width / 2, 25);

    textSize(13);
    text("Click to add fish or click a fish to remove it", width / 2, 55);
}

// Goes through the fish array
function drawFish() {

    // Updates and displays every fish
    for (let fishObject of fish) {
        moveFish(fishObject);
        displayFish(fishObject);
    }
}

// Moves an individual fish
function moveFish(fishObject) {

    // Changes the fish position using its velocity
    fishObject.x += fishObject.vx;
    fishObject.y += fishObject.vy;

    // Makes the fish bounce off the left and right edges
    if (fishObject.x > width - fishObject.size) {
        fishObject.vx *= -1;
    }

    if (fishObject.x < fishObject.size) {
        fishObject.vx *= -1;
    }

    // Makes the fish bounce off the top and bottom edges
    if (fishObject.y > height - 65) {
        fishObject.vy *= -1;
    }

    if (fishObject.y < 100) {
        fishObject.vy *= -1;
    }
}

// Draws an individual fish
function displayFish(fishObject) {

    push();

    // Moves the drawing to the fish position
    translate(fishObject.x, fishObject.y);

    // Flips the fish depending on its horizontal direction
    if (fishObject.vx < 0) {
        scale(-1, 1);
    }

    noStroke();

    // Draws the fish tail
    fill(fishObject.color);
    triangle(
        -fishObject.size * 0.6, 0,
        -fishObject.size * 1.2, -fishObject.size * 0.5,
        -fishObject.size * 1.2, fishObject.size * 0.5
    );

    // Draws the fish body
    fill(fishObject.color);
    ellipse(0, 0, fishObject.size * 1.5, fishObject.size);

    // Draws the fish eye
    fill("#17324d");
    circle(fishObject.size * 0.4, -fishObject.size * 0.1, 5);

    pop();
}

// Creates a new fish object
function createFish(x = random(80, width - 80), y = random(110, height - 90)) {

    // Determines which direction the fish will swim
    let direction = random() < 0.5 ? -1 : 1;

    let newFish = {
        x: x,
        y: y,

        // Gives the fish its own movement speed
        vx: random(1, 2.5) * direction,
        vy: random(-0.8, 0.8),

        // Gives the fish a random size and color
        size: random(20, 40),
        color: random(fishColors)
    };

    return newFish;
}

// Displays the number of fish in the aquarium
function drawFishCount() {
    fill("#164e63");
    textSize(15);
    textAlign(LEFT, CENTER);

    text("Fish: " + fish.length, 15, height - 15);
}

// Handles mouse clicks
function mousePressed() {

    // Goes through the fish array backwards
    for (let i = fish.length - 1; i >= 0; i--) {

        // Gets the current fish
        let fishObject = fish[i];

        // Calculates the distance between the mouse and the fish
        let distanceToFish = dist(mouseX, mouseY, fishObject.x, fishObject.y);

        // Checks if the mouse clicked close enough to the fish
        if (distanceToFish < fishObject.size) {

            // Removes the fish from the array
            fish.splice(i, 1);

            // Stops checking because a fish was removed
            return;
        }
    }

    // Creates a new fish if no existing fish was clicked
    fish.push(createFish(mouseX, mouseY));
}