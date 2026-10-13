/**
 * Words That Run Away Prototype
 * Name: Alejandro
 *
 * Type a word and press ENTER to place it.
 */

"use strict";

// Store the words placed on the canvas
let words = [];

// Store the word currently being typed
let typing = {
    currentWord: ""
};

function setup() {
    createCanvas(400, 400);
    textSize(20);
}

// Draw each part of the prototype
function draw() {
    drawBackground();
    drawPlacedWords();
    drawTypingArea();
    drawInstructions();
}

// Draw the background
function drawBackground() {
    background("#d7eff2");
}

// Draw the words and make them run away from the mouse
function drawPlacedWords() {
    fill("#164e63");
    textAlign(CENTER, CENTER);

    for (let word of words) {
        moveWordAway(word);
        text(word.text, word.x, word.y);
    }
}

// Move a word away if the mouse gets close
function moveWordAway(word) {
    let distance = dist(mouseX, mouseY, word.x, word.y);

    if (distance < 80) {
        word.x += (word.x - mouseX) * 0.08;
        word.y += (word.y - mouseY) * 0.08;
    }
}

// Display the word currently being typed
function drawTypingArea() {
    fill("#102a43");
    textSize(20);
    textAlign(LEFT, CENTER);
    text("Type: " + typing.currentWord, 20, height - 40);
}

// Display the keyboard instructions
function drawInstructions() {
    fill("#486581");
    textSize(12);
    textAlign(LEFT, CENTER);
    text("ENTER: place word | BACKSPACE: delete", 20, 20);
}

// Add ordinary characters to the current word
function keyTyped() {
    if (key.length === 1) {
        typing.currentWord += key;
    }

    return false;
}

// Place the typed word on the canvas
function placeWord() {
    if (typing.currentWord.trim() !== "") {
        let newWord = {
            text: typing.currentWord,
            x: random(50, width - 50),
            y: random(70, height - 70)
        };

        words.push(newWord);
        typing.currentWord = "";
    }
}

// Delete the last character
function deleteCharacter() {
    typing.currentWord = typing.currentWord.slice(0, -1);
}

// Handle ENTER and BACKSPACE using browser keyboard events
function handleKeyboard(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        placeWord();
    }

    if (event.key === "Backspace") {
        event.preventDefault();
        deleteCharacter();
    }
}

// Listen for keyboard input
window.addEventListener("keydown", handleKeyboard);
