/**
 * Tab Switch Counter Prototype
 * Name: Alejandro
 *
 * The character changes mood whenever you leave and return to the page
 */

"use strict";

// Character object
let character = {
    mood: "happy",
    message: "Hey! Stay here with me!",
    x: 200,
    y: 190,
    size: 120
};

// Store the number of times the user returns to the page
let switchCount = 0;

function setup() {
    createCanvas(400, 400);
    textAlign(CENTER, CENTER);

    // Detect when the user changes browser tabs
    document.addEventListener("visibilitychange", handleVisibilityChange);
}

function draw() {
    drawBackground();
    drawTitle();
    drawCounter();
    drawCharacter();
    drawMessage();
    drawInstructions();
}

// Draw the background
function drawBackground() {
    background("#101820");
}

// Draw the title
function drawTitle() {
    fill("white");
    textSize(20);
    text("PLEASE DON'T LEAVE", width / 2, 40);
}

// Display how many times the user has returned
function drawCounter() {
    fill("#90A1E0");
    textSize(18);
    text("Times you left: " + switchCount, width / 2, 80);
}

// Draw the character's face, eyes, and mouth
function drawCharacter() {
    push();
    translate(character.x, character.y);

    drawFace();
    drawEyes();
    drawMouth();

    pop();
}

// Draw the face and change its color with the mood
function drawFace() {
    if (character.mood === "happy") {
        fill("#7CFC98");
    } else if (character.mood === "worried") {
        fill("#FFD166");
    } else {
        fill("#FF7070");
    }

    noStroke();
    ellipse(0, 0, character.size, character.size);
}

// Draw the eyes
function drawEyes() {
    fill("#101820");

    if (character.mood === "angry") {
        // Angry eyebrows
        stroke("#101820");
        strokeWeight(4);
        line(-35, -30, -15, -20);
        line(15, -20, 35, -30);
        noStroke();

        ellipse(-25, -10, 10, 14);
        ellipse(25, -10, 10, 14);
    } else {
        // Normal eyes
        noStroke();
        ellipse(-25, -15, 12, 16);
        ellipse(25, -15, 12, 16);
    }
}

// Draw a different mouth for each mood
function drawMouth() {
    noFill();
    stroke("#101820");
    strokeWeight(4);

    if (character.mood === "happy") {
        arc(0, 5, 50, 35, 0, PI);
    } else if (character.mood === "worried") {
        arc(0, 35, 40, 25, PI, TWO_PI);
    } else {
        line(-20, 30, 20, 30);
    }
}

// Display the character's reaction
function drawMessage() {
    fill("white");
    noStroke();
    textSize(16);
    text(character.message, width / 2, 320);
}

// Display instructions
function drawInstructions() {
    fill("#90A1E0");
    textSize(12);
    text("Switch to another tab, then come back!", width / 2, 370);
}

// Update the character when the user returns to the tab
function handleVisibilityChange() {
    // Only count when the page becomes visible again
    if (document.hidden) {
        return;
    }

    switchCount++;

    if (switchCount < 3) {
        character.mood = "worried";
        character.message = "Oh, you're back... I missed you.";
    } else if (switchCount < 5) {
        character.mood = "angry";
        character.message = "Again?! Pay attention to me!";
    } else {
        character.mood = "angry";
        character.message = "STOP LEAVING ME!";
    }
}
