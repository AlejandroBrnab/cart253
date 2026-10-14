/**
 * Word Reveal Game Prototype
 * Name: Alejandro
 *
 * Type the words shown on the screen.
 */

"use strict";

// Words that will appear on the screen
let words = [
    { text: "platypus", x: 90, y: 100, revealed: false },
    { text: "octopus", x: 290, y: 145, revealed: false },
    { text: "raccoon", x: 120, y: 200, revealed: false },
    { text: "hippopotamus", x: 280, y: 255, revealed: false },
    { text: "chicken", x: 110, y: 300, revealed: false }
];

// Stores the player's current input
let typing = {
    currentWord: ""
};

// Set up the canvas
function setup() {
    createCanvas(400, 400);
    textFont("sans-serif");
}

// Draws the game
function draw() {
    drawBackground();
    drawTitle();
    drawWords();
    drawTypingArea();
    drawProgress();
    drawInstructions();
}

// Draws the background
function drawBackground() {
    background("#d7eff2");
}

// Draws the title of the game
function drawTitle() {
    fill("#164e63");
    textSize(20);
    textAlign(CENTER, CENTER);
    text("REVEAL THE WORDS", width / 2, 35);
}

// Draws each word from the array
function drawWords() {
    textAlign(CENTER, CENTER);
    textSize(22);

    for (let word of words) {
        drawWord(word);
    }
}

// Makes unrevealed words faint and completed words clear
function drawWord(word) {
    if (word.revealed) {
        fill("#164e63");
    } else {
        fill("#9bb9bd");
    }

    text(word.text, word.x, word.y);
}

// Displays the player's current input
function drawTypingArea() {
    fill("#102a43");
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Type: " + typing.currentWord + "_", width / 2, 345);
}

// Displays how many words have been revealed
function drawProgress() {
    let revealedCount = 0;

    for (let word of words) {
        if (word.revealed) {
            revealedCount++;
        }
    }

    fill("#486581");
    textSize(13);
    text(revealedCount + " / " + words.length + " words revealed", width / 2, 375);
}

// Displays the instructions
function drawInstructions() {
    fill("#486581");
    textSize(12);
    textAlign(CENTER, CENTER);
    text("Type a word exactly to reveal it", width / 2, 65);
}

// Adds letters as the player types
function keyTyped() {
    if (key.length === 1 && key.match(/[a-zA-Z]/)) {
        typing.currentWord += key.toLowerCase();
        checkWord();
    }

    return false;
}

// Checks whether the player has typed a complete word
function checkWord() {
    for (let word of words) {
        if (
            typing.currentWord === word.text &&
            word.revealed === false
        ) {
            word.revealed = true;
            typing.currentWord = "";
            break;
        }
    }
}

// Handles BACKSPACE using a browser keyboard event
function handleKeyboard(event) {
    if (event.key === "Backspace") {
        event.preventDefault();
        typing.currentWord = typing.currentWord.slice(0, -1);
    }
}

// Listen for keyboard input
window.addEventListener("keydown", handleKeyboard);
