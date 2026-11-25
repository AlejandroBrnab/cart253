/**
 * Word Reveal Game Prototype
 * Name: Alejandro
 *
 * Type a word and press ENTER to reveal it. Incorrect words are added to the game.
 * Game logic is in here.
 */

"use strict";

// Stores the current state of the game
let gameState = "menu";

// Stores the word data loaded from the JSON file
let wordData = undefined;

// Words that will appear on the screen
let words = [];

// Stores the words that have not been used yet
let availableWords = [];

// Stores the evil words that have not been used yet
let availableEvilWords = [];

// Stores the incorrect words typed by the player
let mistakes = [];

// Stores the player's current input
let typing = {
    currentWord: ""
};

// Stores the player's progress
let progress = {
    revealed: 0,
    total: 0
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

    // Makes a copy of all the words from the JSON file
    availableWords = [...wordData.words];

    // Makes a copy of all the evil words from the JSON file
    availableEvilWords = [...wordData.evil_words];

    // Selects the first 25 random words
    let selectedWords = selectRandomWords(availableWords, 25);

    // Removes the selected words from the available words
    for (let selectedWord of selectedWords) {

        let index = availableWords.indexOf(selectedWord);

        if (index !== -1) {
            availableWords.splice(index, 1);
        }
    }

    // Creates the 25 selected words
    for (let word of selectedWords) {
        let newWord = createWord(word);

        if (newWord !== null) {
            words.push(newWord);

            // Adds the word to the total progress count
            progress.total++;
        }
    }
}

/**
 * Draws the current game screen
 */
function draw() {

    // Displays the menu
    if (gameState === "menu") {
        drawMenuScreen();
    }

    // Displays the game over screen
    else if (timer.finished) {
        drawGameOverScreen();
    }

    // Displays the actual game
    else if (gameState === "playing") {

        // Removes words that have been revealed for 5 seconds
        removeRevealedWords();

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
 * Checks whether all available words have been used
 */
function checkWinCondition() {

    // The game ends when there are no words remaining
    // and no new words are available
    if (words.length === 0 && availableWords.length === 0) {
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

        if (typing.currentWord === word.text && !word.revealed) {

            // Adds extra time depending on the word length.
            if (word.text.length < 8) {
                timer.duration += 1;
            }
            else if (word.text.length > 8) {
                timer.duration += 5;
            }

            // Marks the word as revealed
            word.revealed = true;

            // Stores the time when the word was revealed
            word.revealedTime = millis();

            // Updates the number of revealed words
            progress.revealed++;

            foundWord = true;
            break;
        }
    }

    // Checks the mistakes already added if no original word was found
    if (!foundWord) {
        for (let mistake of mistakes) {

            if (typing.currentWord === mistake.text && !mistake.revealed) {

                // Marks the mistake as revealed
                mistake.revealed = true;

                // Stores the time when the mistake was revealed
                mistake.revealedTime = millis();

                // Updates the number of revealed words
                progress.revealed++;

                foundWord = true;
                break;
            }
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
 * Removes words and mistakes that have been revealed for 5 seconds
 */
function removeRevealedWords() {

    // Goes backwards through the words array to safely remove elements
    for (let i = words.length - 1; i >= 0; i--) {

        // Checks whether the word has been revealed
        if (words[i].revealed) {

            // Checks whether 5 seconds have passed
            if (millis() - words[i].revealedTime >= 5000) {

                // Removes the revealed word from the array
                words.splice(i, 1);

                // Adds a new word to replace it
                addNewWord();
            }
        }
    }

    // Goes backwards through the mistakes array
    for (let i = mistakes.length - 1; i >= 0; i--) {

        // Checks whether the mistake has been revealed
        if (mistakes[i].revealed) {

            // Checks whether 5 seconds have passed
            if (millis() - mistakes[i].revealedTime >= 5000) {

                // Removes the revealed mistake from the array
                mistakes.splice(i, 1);
            }
        }
    }
}

/**
 * Adds a new word to replace a removed word
 */
function addNewWord() {

    // Stops if there are no unused words left
    if (availableWords.length === 0) {
        return;
    }

    // Randomizes the order of the available words
    let shuffledWords = selectRandomWords(
        availableWords,
        availableWords.length
    );

    // Tries to create a new word using the available words
    for (let wordText of shuffledWords) {

        // Creates the word at a random available position
        let newWord = createWord(wordText);

        // Adds the word if a free position was found
        if (newWord !== null) {

            words.push(newWord);

            // Updates the total progress count
            progress.total++;

            // Removes the word from the available words
            let index = availableWords.indexOf(wordText);

            if (index !== -1) {
                availableWords.splice(index, 1);
            }

            return;
        }
    }
}

/**
 * Adds a random evil word to the game
 */
function addEvilWord() {

    // Stops if there are no unused evil words left
    if (availableEvilWords.length === 0) {
        return;
    }

    // Randomizes the order of the available evil words
    let shuffledWords = selectRandomWords(
        availableEvilWords,
        availableEvilWords.length
    );

    // Tries to create an evil word using the available words
    for (let wordText of shuffledWords) {

        // Creates the evil word at a random available position
        let newWord = createWord(wordText);

        // Adds the evil word if a free position was found
        if (newWord !== null) {

            words.push(newWord);

            // Updates the total progress count
            progress.total++;

            // Removes the evil word from the available words
            let index = availableEvilWords.indexOf(wordText);

            if (index !== -1) {
                availableEvilWords.splice(index, 1);
            }

            return;
        }
    }
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

            // Updates the total progress count
            progress.total++;

            // Adds a random evil word when a new mistake happens
            addEvilWord();
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

        // Checks if the position is available
        if (isPositionAvailable(x, y, text)) {

            let word = {
                text: text,
                x: x,
                y: y,
                revealed: false,
                revealedTime: 0
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

        // Revealed words still occupy space during their 5-second display
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

    // Adds letters, spaces, hyphens and apostrophes
    if (key.length === 1 && key.match(/[a-zA-Z '-]/)) {

        // Prevents spaces, hyphens or apostrophes at the beginning
        if (typing.currentWord === "" && key.match(/[ '-]/)) {
            return false;
        }

        // Prevents consecutive spaces
        if (key === " " && typing.currentWord.endsWith(" ")) {
            return false;
        }

        // Prevents consecutive hyphens
        if (key === "-" && typing.currentWord.endsWith("-")) {
            return false;
        }

        // Starts the timer when the player types for the first time
        if (!timer.started) {
            timer.started = true;
            timer.startTime = millis();
        }

        typing.currentWord += key;
    }

    return false;
}

/**
 * Handles clicks on the menu and game over screens
 */
function mousePressed() {

    // Checks whether the player clicked START GAME
    if (gameState === "menu") {

        if (
            mouseX > width / 2 - 100 &&
            mouseX < width / 2 + 100 &&
            mouseY > 525 &&
            mouseY < 585
        ) {
            gameState = "playing";
        }

        return false;
    }

    // Checks whether the player clicked RESTART
    if (timer.finished) {

        if (
            mouseX > width / 2 - 90 &&
            mouseX < width / 2 + 90 &&
            mouseY > 425 &&
            mouseY < 475
        ) {
            window.location.reload();
        }
    }

    return false;
}