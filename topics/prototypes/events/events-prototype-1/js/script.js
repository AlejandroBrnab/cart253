/**
 * Word Reveal Game Prototype
 * Name: Alejandro
 *
 * Type the animal names shown on the screen.
 */

"use strict";

// Animals that will appear on the screen
let words = [
    { text: "platypus", x: 100, y: 130, revealed: false },
    { text: "octopus", x: 350, y: 110, revealed: false },
    { text: "raccoon", x: 580, y: 145, revealed: false },
    { text: "hippopotamus", x: 200, y: 210, revealed: false },
    { text: "chicken", x: 480, y: 200, revealed: false },
    { text: "chinchilla", x: 100, y: 290, revealed: false },
    { text: "axolotl", x: 300, y: 275, revealed: false },
    { text: "chameleon", x: 540, y: 290, revealed: false },
    { text: "squirrel", x: 170, y: 365, revealed: false },
    { text: "porcupine", x: 410, y: 350, revealed: false },
    { text: "orangutan", x: 600, y: 390, revealed: false },
    { text: "echidna", x: 100, y: 440, revealed: false },
    { text: "capybara", x: 300, y: 445, revealed: false },
    { text: "wolverine", x: 500, y: 455, revealed: false },
    { text: "narwhal", x: 350, y: 510, revealed: false }
];

// Stores the player's current input
let typing = {
    currentWord: ""
};

function setup() {
    createCanvas(700, 600);
    textFont("sans-serif");
}

// Draw the game
function draw() {
    drawBackground();
    drawTitle();
    drawInstructions();
    drawWords();
    drawTypingArea();
    drawProgress();
}

// Draws the background
function drawBackground() {
    background("#d7eff2");
}

// Draws the title of the game
function drawTitle() {
    fill("#164e63");
    textSize(24);
    textAlign(CENTER, CENTER);
    text("REVEAL THE ANIMALS", width / 2, 30);
}

// Displays the instructions
function drawInstructions() {
    fill("#486581");
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Type an animal's name correctly to reveal it", width / 2, 65);
}

// Draws each animal name
function drawWords() {
    textAlign(CENTER, CENTER);
    textSize(19);

    for (let word of words) {
        drawWord(word);
    }
}

// Faint words become darker when correctly typed
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
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Type: " + typing.currentWord + "_", width / 2, 550);
}

// Displays the number of animals revealed
function drawProgress() {
    let revealedCount = 0;

    for (let word of words) {
        if (word.revealed) {
            revealedCount++;
        }
    }

    fill("#486581");
    textSize(14);
    text(
        revealedCount + " / " + words.length + " animals revealed",
        width / 2,
        580
    );
}

// Adds letters as the player types
function keyTyped() {
    if (key.length === 1 && key.match(/[a-zA-Z]/)) {
        typing.currentWord += key.toLowerCase();
        checkWord();
    }

    return false;
}

// Checks whether the typed word matches an animal
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

// Listens for keyboard input
window.addEventListener("keydown", handleKeyboard);
