/**
 * Word Reveal Game Prototype
 * Name: Alejandro
 *
 * Type a word and press ENTER to reveal it. Incorrect words are added to the game.
 * Game logic is in here.
 */

"use strict";

// Stores the word data loaded from the JSON file
let wordData = undefined;

// Words that will appear on the screen
let words = [];

// Stores the incorrect words typed by the player
let mistakes = [];

// Stores the player's current input
let typing = {
    currentWord: ""
};

// Stores the timer information
let timer = {
    duration: 40,
    startTime: 0,
    started: false,
    finished: false
};

/**
 * Loads the word data from the JSON file
 */
async function preload() {
    wordData = await loadJSON("./data/words.json");
}

/**
 * Sets up the canvas and creates the words
 */
async function setup() {
    createCanvas(1500, 700);
    textFont("sans-serif");

    // Waits for the JSON data to load
    await preload();

    // Select 15 random words from the JSON file
    let selectedWords = selectRandomWords(wordData.words, 15);

    // Create the words using the selected words
    for (let word of selectedWords) {
        let newWord = createWord(word);

        if (newWord !== null) {
            words.push(newWord);
        }
    }
}

/**
 * Draws the game
 */
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
        checkWinCondition();
    }
}

/**
 * Checks whether the timer has run out
 */
function checkTimer() {
    if (timer.started && !timer.finished) {
        let elapsed = (millis() - timer.startTime) / 1000;

        if (elapsed >= timer.duration) {
            timer.finished = true;
            typing.currentWord = "";
        }
    }
}

/**
 * Checks whether all words have been revealed
 */
function checkWinCondition() {

    let allWordsRevealed = true;

    // Checks the original words
    for (let word of words) {
        if (!word.revealed) {
            allWordsRevealed = false;
            break;
        }
    }

    // Checks the mistakes added by the player
    for (let mistake of mistakes) {
        if (!mistake.revealed) {
            allWordsRevealed = false;
            break;
        }
    }

    // Ends the game if everything has been revealed
    if (allWordsRevealed) {
        timer.finished = true;
        typing.currentWord = "";
    }
}

/**
 * Checks whether the submitted word matches a word from JSON file or a mistake
 */
function checkWord() {
    if (typing.currentWord === "") {
        return;
    }

    // Removes accidental spaces at the beginning or end
    typing.currentWord = typing.currentWord.trim();

    let foundWord = false;

    // Checks the original words
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

/**
 * Adds a new mistake to the mistakes array
 */
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

/**
 * Selects a specific number of random words from the JSON data
 */
function selectRandomWords(wordList, amount) {
    let selectedWords = [];

    // Make a copy so the original JSON data is not modified
    let availableWords = [...wordList];

    // Keep selecting until we have the requested amount
    while (selectedWords.length < amount && availableWords.length > 0) {

        // Pick a random index
        let randomIndex = floor(random(availableWords.length));

        // Add that word to the selected list
        selectedWords.push(availableWords[randomIndex]);

        // Remove it so it cannot be selected again
        availableWords.splice(randomIndex, 1);
    }

    return selectedWords;
}

/**
 * Creates a new mistake object
 */
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
        let y = random(120, 600);

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

/**
 * Creates a new word at a random available position
 */
function createWord(text) {

    textSize(19);

    // Calculates the width of the new word
    let wordWidth = textWidth(text) + 16;

    // Checks if the word is too wide for the canvas
    if (wordWidth > width - 20) {
        return null;
    }

    // Tries different random positions until it finds an available one
    for (let i = 0; i < 500; i++) {

        let x = random(wordWidth / 2 + 10, width - wordWidth / 2 - 10);
        let y = random(120, 600);

        // Checks whether the position is available
        if (isPositionAvailable(x, y, text)) {

            let word = {
                text: text,
                x: x,
                y: y,
                revealed: false
            };

            return word;
        }
    }

    // Returns nothing if no available position was found
    return null;
}

/**
 * Checks whether a new word overlaps with existing words
 */
function isPositionAvailable(x, y, text) {

    textSize(17);

    // Gets the dimensions of the new word
    let newWidth = textWidth(text) + 16;
    let newHeight = 25;

    // Checks the original words
    for (let word of words) {

        textSize(19);

        let existingWidth = textWidth(word.text) + 16;
        let existingHeight = 27;

        // Checks whether the two words overlap
        let overlapX =
            abs(x - word.x) <
            (newWidth + existingWidth) / 2;

        let overlapY =
            abs(y - word.y) <
            (newHeight + existingHeight) / 2;

        if (overlapX && overlapY) {
            return false;
        }
    }

    // Checks the mistakes already added
    for (let mistake of mistakes) {

        textSize(17);

        let existingWidth = textWidth(mistake.text) + 16;
        let existingHeight = 25;

        // Checks whether the two words overlap
        let overlapX =
            abs(x - mistake.x) <
            (newWidth + existingWidth) / 2;

        let overlapY =
            abs(y - mistake.y) <
            (newHeight + existingHeight) / 2;

        if (overlapX && overlapY) {
            return false;
        }
    }

    // The position is available
    return true;
}

/**
 * Handles letters, ENTER and BACKSPACE
 */
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

    // Adds letters, spaces and hyphens as the player types
    if (key.length === 1 && key.match(/[a-zA-Z -]/)) {

        // Prevents spaces or hyphens at the beginning
        if (typing.currentWord === "" && key.match(/[ -]/)) {
            return false;
        }

        // Prevents consecutive spaces
        if (key === " " && typing.currentWord.endsWith(" ")) {
            return false;
        }

        // Starts the timer when the player types for the first time
        if (!timer.started) {
            timer.started = true;
            timer.startTime = millis();
        }

        //Uncomment to make all inputs lower case [currently testing user experience]
        // typing.currentWord += key.toLowerCase();
        typing.currentWord += key;
    }

    return false;
}

/**
 * Reloads the page when the player clicks RESTART
 */
function mousePressed() {

    // Only works when the game is finished
    if (timer.finished) {

        // Checks if the player clicked inside the restart button
        if (
            mouseX > width / 2 - 90 &&
            mouseX < width / 2 + 90 &&
            mouseY > 425 &&
            mouseY < 475
        ) {
            window.location.reload();
        }
    }
}