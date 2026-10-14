/**
 * Tab Switch Prototype
 * Name: Alejandro
 *
 * The character changes mood whenever you leave and return to the page
 */

"use strict";

// Character object
let character = {
    mood: "happy", //initial mood
    x: 0,
    y: 0,
    size: 120,
    growth: 15,
    rotationX: 0,
    rotationY: 0
};

// Stores the number of times the user returns to the page
let switchCount = 0;

function setup() {
    createCanvas(500, 500, WEBGL);
    textAlign(CENTER, CENTER);

    // Detect when the user changes browser tabs
    document.addEventListener("visibilitychange", handleVisibilityChange);
}

function draw() {
    drawBackground();
    drawCharacter();
}

// Draws the background
function drawBackground() {
    background("#101820");

    // Adds lighting to make the character look three-dimensional
    ambientLight(100);
    directionalLight(255, 255, 255, -0.5, 0.5, -1);
}

// Draws the character's face, eyes, and mouth
function drawCharacter() {
    push();
    translate(character.x, character.y, 0);

    // Rotates the character when the user drags the mouse
    rotateX(character.rotationX);
    rotateY(character.rotationY);

    // Scale the entire character as it grows
    let scaleFactor = character.size / 120;
    scale(scaleFactor);

    drawFace();
    drawEyes();
    drawMouth();

    pop();
}

// Rotates the face while the mouse is held and dragged
function mouseDragged() {
    // Only rotate when the mouse is inside the canvas
    if (mouseX >= 0 && mouseX <= width &&
        mouseY >= 0 && mouseY <= height) {

        character.rotationY += (mouseX - pmouseX) * 0.01;
        character.rotationX -= (mouseY - pmouseY) * 0.01;
    }

    return false;
}

// Draws the face and changes its color with the mood
function drawFace() {
    if (character.mood === "happy") {
        fill("#7CFC98");
    } else if (character.mood === "worried") {
        fill("#FFD166");
    } else if (character.mood === "despair") {
        fill("#B8B8C8");
    } else {
        fill("#FF7070");
    }

    noStroke();
    shininess(25);
    sphere(60, 32, 24);
}

// Draws the eyes
function drawEyes() {
    if (character.mood === "despair") {
        // Creepy hollow eyes
        push();
        translate(-25, -15, 53);
        noStroke();
        fill("#101820");
        sphere(11, 16, 12);
        pop();

        push();
        translate(25, -15, 53);
        noStroke();
        fill("#101820");
        sphere(11, 16, 12);
        pop();

        // Tiny white pupils
        push();
        translate(-25, -12, 63);
        fill("white");
        sphere(2.5, 12, 8);
        pop();

        push();
        translate(25, -12, 63);
        fill("white");
        sphere(2.5, 12, 8);
        pop();
    } else {
        // Normal eyes
        push();
        translate(-25, -15, 53);
        noStroke();
        fill("#101820");
        sphere(6, 16, 12);
        pop();

        push();
        translate(25, -15, 53);
        noStroke();
        fill("#101820");
        sphere(6, 16, 12);
        pop();

        if (character.mood === "angry") {
            // Angry eyebrows
            drawTubeLine(-38, -35, -14, -25);
            drawTubeLine(14, -25, 38, -35);
        }
    }
}

// Draws a different mouth for each mood
function drawMouth() {
    if (character.mood === "happy") {
        // Happy curved smile
        drawSmile(0, 5, 25, 15, false);
    } else if (character.mood === "worried") {
        // Worried mouth
        drawSmile(0, 35, 20, 12, true);
    } else if (character.mood === "despair") {
        // Creepy smile
        drawSmile(0, 15, 28, 20, false);
        drawTubeLine(-27, 15, -20, 25);
        drawTubeLine(27, 15, 20, 25);
    } else {
        // Straight angry mouth
        drawTubeLine(-20, 30, 20, 30);
    }
}

// Draws a curved mouth using small 3D spheres
function drawSmile(centerX, centerY, radiusX, radiusY, upsideDown) {
    let startAngle = upsideDown ? PI : 0;
    let endAngle = upsideDown ? TWO_PI : PI;

    for (let angle = startAngle; angle <= endAngle; angle += 0.15) {
        let x = centerX + cos(angle) * radiusX;
        let y = centerY + sin(angle) * radiusY;

        push();
        translate(x, y, 55);
        noStroke();
        fill("#101820");
        sphere(2.5, 8, 6);
        pop();
    }
}

// Draws a line using small 3D spheres
function drawTubeLine(x1, y1, x2, y2) {
    let distance = dist(x1, y1, x2, y2);
    let steps = max(2, floor(distance / 3));

    for (let i = 0; i <= steps; i++) {
        let amount = i / steps;
        let x = lerp(x1, x2, amount);
        let y = lerp(y1, y2, amount);

        push();
        translate(x, y, 55);
        noStroke();
        fill("#101820");
        sphere(2.5, 8, 6);
        pop();
    }
}

// Updates the character when the user returns to the tab
function handleVisibilityChange() {
    // Only count when the page becomes visible again
    if (document.hidden) {
        return;
    }

    switchCount++;

    if (switchCount < 3) {
        character.mood = "worried";
    } else if (switchCount < 5) {
        character.mood = "angry";
    } else {
        character.mood = "despair";

        // Make the face bigger every time you return
        character.size += character.growth;
    }
}