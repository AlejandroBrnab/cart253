/**
 * Reaction Time Prototype
 * Name: Alejandro
 *
 * Are you secretly an FPS player with insane reaction times?
 */

"use strict";

// Store related game information in one object
let game = {
    state: "ready",
    startTime: 0,
    waitTime: 3000,
    score: 0,
    message: "Press ENTER to start",
    reactionStart: 0,
    reactionTime: 0
};

function setup() {
    createCanvas(400, 400);
    textAlign(CENTER, CENTER);
}

// Draw each part of the game
function draw() {
    drawBackground();
    drawTitle();
    drawScore();
    drawGameState();
}

// Draw the background
function drawBackground() {
    background("#101820");
}

// Draw the title
function drawTitle() {
    fill("white");
    textSize(20);
    text("PRESS AT THE RIGHT TIME", width / 2, 50);
}

// Display the score
function drawScore() {
    fill("white");
    textSize(18);
    text("Score: " + game.score, width / 2, 90);
}

// Decide which screen to display
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

// Display the starting message
function drawReadyScreen() {
    fill("#90A1E0");
    textSize(20);
    text(game.message, width / 2, 190);
}

// Display the countdown
function drawWaitingScreen() {
    let elapsed = millis() - game.startTime;
    let remaining = game.waitTime - elapsed;

    fill("#90A1E0");
    textSize(24);
    text("Get ready...", width / 2, 180);

    textSize(40);
    text(max(0, (remaining / 1000).toFixed(1)), width / 2, 240);

    // Move to the target state when the countdown ends
    if (remaining <= 0) {
        game.state = "target";
        game.reactionStart = millis();
    }
}

// Display the moment when the player should press SPACE
function drawTargetScreen() {
    fill("#7CFC98");
    textSize(26);
    text("NOW! PRESS SPACE!", width / 2, 200);

    // End the round if the player waits too long
    if (millis() - game.reactionStart > 1000) {
        game.state = "over";
        game.message = "Too late! Press ENTER to retry.";
    }
}

// Display the game-over screen
function drawGameOverScreen() {
    fill("#FF7070");
    textSize(22);
    text("You lose!", width / 2, 180);

    fill("white");
    textSize(16);
    text(game.message, width / 2, 225);
}

// Display the successful reaction time
function drawSuccessScreen() {
    fill("#7CFC98");
    textSize(24);
    text("Perfect timing!", width / 2, 180);

    fill("white");
    textSize(16);
    text("Reaction time: " + game.reactionTime + " ms", width / 2, 215);
    text("Press ENTER for another round", width / 2, 245);
}

// Start a new round
function startRound() {
    game.startTime = millis();
    game.waitTime = random(2000, 5000);
    game.state = "waiting";
    game.message = "";
}

// Handle ENTER and SPACE using browser keyboard events
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

// Listen for keyboard input
window.addEventListener("keydown", handleKeyboard);
