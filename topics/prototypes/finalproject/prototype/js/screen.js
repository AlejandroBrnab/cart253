/**
 * Word Reveal Game Prototype
 * Name: Alejandro
 *
 * Type a word and press ENTER to reveal it. Incorrect words are added to the game.
 * UI logic is in here.
 */

/**
 * Draws the background
 */
function drawBackground() {
    background("#d7eff2");
}

/**
 * Draws the title of the game
 */
function drawTitle() {
    fill("#164e63");
    textSize(24);
    textAlign(CENTER, CENTER);
    text("REVEAL THE WORDS", width / 2, 30);
}

/**
 * Displays the instructions
 */
function drawInstructions() {
    fill("#486581");
    textSize(14);
    text(
        "Type the word and press ENTER to reveal it",
        width / 2,
        65
    );
}

/**
 * Displays the remaining time
 */
function drawTimer() {
    fill("#164e63");
    textSize(16);
    textAlign(CENTER, CENTER);

    if (!timer.started) {
        text("Time: 0:40 (starts when you type)", width / 2, 95);
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

/**
 * Draws each word name
 */
function drawWords() {
    textAlign(CENTER, CENTER);
    textSize(19);

    // Goes through every word in the array
    for (let word of words) {
        drawWord(word, "#9bb9bd");
    }
}

/**
 * Draws the incorrect words added by the player
 */
function drawMistakes() {
    textAlign(CENTER, CENTER);
    textSize(17);

    // Goes through every mistake in the array
    for (let mistake of mistakes) {
        drawWord(mistake, "#d97757");
    }
}

/**
 * Draws an individual word
 */
function drawWord(word, hiddenColor) {
    if (word.revealed) {
        fill("#164e63");
    } else {
        fill(hiddenColor);
    }

    text(word.text, word.x, word.y);
}

/**
 * Displays the player's current input
 */
function drawTypingArea() {
    fill("#102a43");
    textSize(20);
    textAlign(CENTER, CENTER);

    if (timer.finished) {
        text("Game over!", width / 2, 650);
    } else {
        text("Type: " + typing.currentWord + "_", width / 2, 650);
    }
}

/**
 * Displays the number of words revealed
 */
function drawProgress() {
    let revealedCount = 0;

    // Counts the revealed words
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
        680
    );
}

/**
 * Displays the game over screen
 */
function drawGameOverScreen() {
    drawBackground();

    let revealedCount = 0;

    // Counts the revealed words
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

    if (revealedCount === totalWords) {
        text("YOU WON! :D", width / 2, 180);
    } else {
        text("TIME'S UP! :]", width / 2, 180);
    }

    textSize(20);
    text("Your final score", width / 2, 250);

    textSize(48);
    text(revealedCount + " / " + totalWords, width / 2, 320);

    textSize(18);
    text("words revealed", width / 2, 360);

    fill("#486581");
    textSize(14);
    text("Thanks for playing! :D", width / 2, 500);

    // Draws the restart button
    push();

    rectMode(CENTER);
    fill(6, 57, 47);
    stroke(255);
    rect(width / 2, 450, 180, 50, 10);

    noStroke();
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("RESTART", width / 2, 450);

    pop();
}


/**
 * Displays the main menu and explains the game rules
 */
function drawMenuScreen() {

    // Background
    background("#d7eff2");

    // Game title
    fill("#164e63");
    textSize(48);
    textAlign(CENTER, CENTER);
    text("REVEAL THE WORDS", width / 2, 130);

    // Short introduction
    fill("#486581");
    textSize(19);
    text(
        "How many words can you reveal before time runs out?",
        width / 2,
        205
    );

    // Game instructions
    fill("#164e63");
    textSize(23);
    text("HOW TO PLAY", width / 2, 300);

    fill("#486581");
    textSize(17);

    text("1. Find the hidden words on the screen.", width / 2, 350);
    text("2. Type the complete word and press ENTER.", width / 2, 385);
    text("3. Pay attention to capital letters, spaces and hyphens!", width / 2, 420);
    text("4. You have 40 seconds to reveal all the words.", width / 2, 455);

    // Start button
    push();

    rectMode(CENTER);
    fill(6, 57, 47);
    noStroke();
    rect(width / 2, 555, 200, 60, 12);

    fill(255);
    textSize(22);
    text("START GAME", width / 2, 555);

    pop();
}