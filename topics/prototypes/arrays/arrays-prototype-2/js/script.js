/**
 * Word Reveal Game Prototype
 * Name: Alejandro
 *
 * Type an animal's name and press ENTER to reveal it. Incorrect words are added to the game.
 */

"use strict";

// Animals that will appear on the screen
let words = [
    { text: "platypus", x: 100, y: 130, revealed: false },
    { text: "kookaburra", x: 350, y: 130, revealed: false },
    { text: "raccoon", x: 580, y: 145, revealed: false },
    { text: "hippopotamus", x: 200, y: 210, revealed: false },
    { text: "cockroach", x: 480, y: 200, revealed: false },
    { text: "chinchilla", x: 100, y: 290, revealed: false },
    { text: "axolotl", x: 300, y: 275, revealed: false },
    { text: "hedgehog", x: 540, y: 290, revealed: false },
    { text: "squirrel", x: 170, y: 365, revealed: false },
    { text: "chimpanzee", x: 410, y: 350, revealed: false },
    { text: "kinkajou", x: 600, y: 390, revealed: false },
    { text: "echidna", x: 100, y: 440, revealed: false },
    { text: "grasshopper", x: 300, y: 445, revealed: false },
    { text: "wolverine", x: 500, y: 455, revealed: false },
    { text: "narwhal", x: 350, y: 510, revealed: false }
];

// Stores the incorrect words typed by the player
let mistakes = [];

// Stores the player's current input
let typing = {
    currentWord: ""
};

// Stores the timer information
let timer = {
    duration: 45,
    startTime: 0,
    started: false,
    finished: false
};

// Sets up the canvas
function setup() {
    createCanvas(700, 600);
    textFont("sans-serif");
}

// Draws the game
function draw() {
    if (timer.finished) {
        drawGameOverScreen();
    } else {
        drawBackground();
        drawTitle();
        drawInstructions();
        drawTimer();
        drawWords();
        drawMistakes();
        drawTypingArea();
        drawProgress();
        checkTimer();
    }
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
    text("Type an animal's name and press ENTER to reveal it", width / 2, 65);
}

// Displays the remaining time
function drawTimer() {
    fill("#164e63");
    textSize(16);
    textAlign(CENTER, CENTER);

    if (!timer.started) {
        text("Time: 0:45 (starts when you type)", width / 2, 95);
    } else if (timer.finished) {
        text("Time's up!", width / 2, 95);
    } else {
        let elapsed = (millis() - timer.startTime) / 1000;
        let remaining = max(0, timer.duration - floor(elapsed));
        let minutes = floor(remaining / 60);
        let seconds = remaining % 60;
        let timeText = minutes + ":" + nf(seconds, 2);

        text("Time: " + timeText, width / 2, 95);
    }
}

// Draws each animal name
function drawWords() {
    textAlign(CENTER, CENTER);
    textSize(19);

    // Goes through every animal in the array
    for (let word of words) {
        drawWord(word, "#9bb9bd");
    }
}

// Draws the incorrect words added by the player
function drawMistakes() {
    textAlign(CENTER, CENTER);
    textSize(17);

    // Goes through every mistake in the array
    for (let mistake of mistakes) {
        drawWord(mistake, "#d97757");
    }
}

// Draws an individual word
function drawWord(word, hiddenColor) {
    if (word.revealed) {
        fill("#164e63");
    } else {
        fill(hiddenColor);
    }

    text(word.text, word.x, word.y);
}

// Displays the player's current input
function drawTypingArea() {
    fill("#102a43");
    textSize(20);
    textAlign(CENTER, CENTER);

    if (timer.finished) {
        text("Game over!", width / 2, 550);
    } else {
        text("Type: " + typing.currentWord + "_", width / 2, 550);
    }
}

// Displays the number of words revealed
function drawProgress() {
    let revealedCount = 0;

    // Counts the revealed animal names
    for (let word of words) {
        if (word.revealed) {
            revealedCount++;
        }
    }

    // Counts the revealed mistakes
    for (let mistake of mistakes) {
        if (mistake.revealed) {
            revealedCount++;
        }
    }

    // Calculates the total number of words
    let totalWords = words.length + mistakes.length;

    fill("#486581");
    textSize(14);
    textAlign(CENTER, CENTER);

    text(
        revealedCount + " / " + totalWords + " words revealed",
        width / 2,
        580
    );
}

// Displays the game over screen
function drawGameOverScreen() {
    drawBackground();

    let revealedCount = 0;

    // Counts the revealed animal names
    for (let word of words) {
        if (word.revealed) {
            revealedCount++;
        }
    }

    // Counts the revealed mistakes
    for (let mistake of mistakes) {
        if (mistake.revealed) {
            revealedCount++;
        }
    }

    let totalWords = words.length + mistakes.length;

    fill("#164e63");
    textAlign(CENTER, CENTER);

    textSize(36);
    text("TIME'S UP! :]", width / 2, 150);

    textSize(20);
    text("Your final score", width / 2, 220);

    textSize(48);
    text(revealedCount + " / " + totalWords, width / 2, 290);

    textSize(18);
    text("words revealed", width / 2, 330);

    fill("#486581");
    textSize(14);
    text("Thanks for playing! :D", width / 2, 470);
}

// Checks whether the timer has run out
function checkTimer() {
    if (timer.started && !timer.finished) {
        let elapsed = (millis() - timer.startTime) / 1000;

        if (elapsed >= timer.duration) {
            timer.finished = true;
            typing.currentWord = "";
        }
    }
}

// Checks whether the submitted word matches an animal or a mistake
function checkWord() {
    if (typing.currentWord === "") {
        return;
    }

    let foundWord = false;

    // Checks the original animal names
    for (let word of words) {
        if (typing.currentWord === word.text) {
            word.revealed = true;
            foundWord = true;
            break;
        }
    }

    // Checks the mistakes already added
    for (let mistake of mistakes) {
        if (typing.currentWord === mistake.text) {
            mistake.revealed = true;
            foundWord = true;
            break;
        }
    }

    // Adds the submitted word as a mistake if it wasn't found
    if (!foundWord) {
        addMistake(typing.currentWord);
    }

    // Clears the typing area after submitting
    typing.currentWord = "";
}

// Adds a new mistake to the mistakes array
function addMistake(text) {
    let alreadyExists = false;

    // Checks whether this mistake already exists
    for (let mistake of mistakes) {
        if (mistake.text === text) {
            alreadyExists = true;
            break;
        }
    }

    // Only adds the mistake if it doesn't already exist
    if (!alreadyExists) {
        let newMistake = createMistake(text);

        // Adds the mistake only if a free position was found
        if (newMistake !== null) {
            mistakes.push(newMistake);
        }
    }
}

// Creates a new mistake object
function createMistake(text) {

    textSize(17);

    // Calculates the width of the new word
    let wordWidth = textWidth(text) + 16;

    // Checks if the word is too wide for the canvas
    if (wordWidth > width - 20) {
        return null;
    }

    // Tries different random positions until it finds an available one
    for (let i = 0; i < 500; i++) {

        let x = random(wordWidth / 2 + 10, width - wordWidth / 2 - 10);
        let y = random(120, 500);

        // Checks whether the position is available
        if (isPositionAvailable(x, y, text)) {

            let mistake = {
                text: text,
                x: x,
                y: y,
                revealed: false
            };

            return mistake;
        }
    }

    // Returns nothing if no available position was found
    return null;
}

// Checks whether a new word overlaps with existing words
function isPositionAvailable(x, y, text) {

    textSize(17);

    // Gets the dimensions of the new word
    let newWidth = textWidth(text) + 16;
    let newHeight = 25;

    // Checks the original animal names
    for (let word of words) {

        textSize(19);

        let existingWidth = textWidth(word.text) + 16;
        let existingHeight = 27;

        // Checks if the two words overlap
        let overlapX = abs(x - word.x) < (newWidth + existingWidth) / 2;
        let overlapY = abs(y - word.y) < (newHeight + existingHeight) / 2;

        if (overlapX && overlapY) {
            return false;
        }
    }

    // Checks the mistakes already added
    for (let mistake of mistakes) {

        textSize(17);

        let existingWidth = textWidth(mistake.text) + 16;
        let existingHeight = 25;

        // Checks if the two words overlap
        let overlapX = abs(x - mistake.x) < (newWidth + existingWidth) / 2;
        let overlapY = abs(y - mistake.y) < (newHeight + existingHeight) / 2;

        if (overlapX && overlapY) {
            return false;
        }
    }

    // The position is available
    return true;
}

// Handles letters, ENTER and BACKSPACE
function keyPressed(event) {
    if (timer.finished) {
        return false;
    }

    // Submits the current word when ENTER is pressed
    if (keyCode === ENTER || keyCode === 13) {
        checkWord();
        return false;
    }

    // Removes the last letter when BACKSPACE is pressed
    if (keyCode === BACKSPACE || keyCode === 8) {
        typing.currentWord = typing.currentWord.slice(0, -1);
        return false;
    }

    // Adds letters as the player types
    if (key.length === 1 && key.match(/[a-zA-Z]/)) {

        // Starts the timer when the player types for the first time
        if (!timer.started) {
            timer.started = true;
            timer.startTime = millis();
        }

        typing.currentWord += key.toLowerCase();
    }

    return false;
}