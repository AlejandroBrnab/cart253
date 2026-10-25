/**
 * Reaction Time Prototype
 * Name: Alejandro
 *
 * Are you secretly an FPS player with insane reaction times?
 */

"use strict";

// Game object information
let game = {
    state: "ready",
    startTime: 0,
    waitTime: 0,
    score: 0,
    message: "Press ENTER to start",
    reactionStart: 0,
    reactionTime: 0
};

// Sets up the canvas
function setup() {
    createCanvas(400, 400);
    textAlign(CENTER, CENTER);
}

// Draws the game :]
function draw() {
    drawBackground();
    drawTitle();
    drawScore();
    drawGameState();
}

// Draw the background
function drawBackground() {
    if (game.state === "target") {
        background("#228B22");
    } else {
        background("#101820");
    }
}

// Draws the title
function drawTitle() {
    fill("white");
    textSize(20);
    text("PRESS AT THE RIGHT TIME", width / 2, 50);
}

// Displays the score
function drawScore() {
    fill("white");
    textSize(18);
    text("Score: " + game.score, width / 2, 90);
}

// Decides which screen to display
function drawGameState() {
    if (game.state === "ready") {
        drawReadyScreen();
    } else if (game.state === "waiting") {
        drawWaitingScreen();
    } else if (game.state === "target") {
        drawTargetScreen();
    } else if (game.state === "over") {
        drawGameOverScreen();
    } else if (game.state === "success") {
        drawSuccessScreen();
    }
}

// Displays the starting message
function drawReadyScreen() {
    fill("#90A1E0");
    textSize(20);
    text(game.message, width / 2, 190);
}

// Displays the countdown
function drawWaitingScreen() {
    fill("#90A1E0");
    textSize(24);
    text("Wait for green...", width / 2, 200);

    // Move to the target state when the countdown ends
    if (millis() - game.startTime >= game.waitTime) {
        game.state = "target";
        game.reactionStart = millis();
    }
}

// Displays the moment when the player should press SPACE
function drawTargetScreen() {
    fill("white");
    textSize(26);
    text("NOW! PRESS SPACE!", width / 2, 200);

    // End the round if the player waits too long
    if (millis() - game.reactionStart > 2000) {
        game.state = "over";
        game.message = "Too late! Press ENTER to retry.";
    }
}

// Displays the game-over screen
function drawGameOverScreen() {
    fill("#FF7070");
    textSize(22);
    text("You lose!", width / 2, 180);

    fill("white");
    textSize(16);
    text(game.message, width / 2, 225);
}

// Displays the successful reaction time
function drawSuccessScreen() {
    fill("#7CFC98");
    textSize(24);
    text("Perfect timing!", width / 2, 180);

    fill("white");
    textSize(20);
    text("Reaction time: " + game.reactionTime + " ms", width / 2, 220);

    textSize(16);
    text("Press ENTER for another round", width / 2, 260);
}

// Starts a new round
function startRound() {
    game.startTime = millis();
    game.waitTime = random(2000, 8000);
    game.state = "waiting";
    game.message = "";
}

// Handles ENTER and SPACE using browser keyboard events
function handleKeyboard(event) {
    // Prevent holding a key from triggering repeated actions
    if (event.repeat) {
        return;
    }

    // ENTER starts or restarts the game
    if (event.key === "Enter") {
        event.preventDefault();

        if (
            game.state === "ready" ||
            game.state === "over" ||
            game.state === "success"
        ) {
            startRound();
        }
    }

    // SPACE is used to react
    if (event.code === "Space") {
        event.preventDefault();

        if (game.state === "waiting") {
            game.state = "over";
            game.message = "Too early! Press ENTER to retry.";
        } else if (game.state === "target") {
            game.reactionTime = millis() - game.reactionStart;
            game.score++;
            game.state = "success";
        }
    }
}

// Listens for keyboard input
window.addEventListener("keydown", handleKeyboard);
