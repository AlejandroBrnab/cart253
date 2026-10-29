/**
 * Hunger Games
 * Name: Alejandro
 *
 * Some "creatures" search for food and move around the canvas.
 * The creature that eats the most food in one minute wins.
 */

"use strict";

let creatures = [];
let foods = [];

let gameDuration = 60;
let startTime;
let timeLeft;
let gameOver = false;
let winners = [];

function setup() {
  createCanvas(500, 400);

  // Records when the game starts
  startTime = millis();

  // Creates three creatures
  for (let i = 0; i < 3; i++) {
    creatures.push(createCreature());
  }

  // Creates eight pieces of food
  for (let i = 0; i < 8; i++) {
    foods.push(createFood());
  }
}

function draw() {
  background(35, 55, 45);

  // Calculates how much time remains
  timeLeft = max(0, gameDuration - floor((millis() - startTime) / 1000));

  // Ends the game when the timer reaches zero
  if (timeLeft <= 0 && !gameOver) {
    gameOver = true;
    findWinners();
  }

  // Stops the creatures when the game ends
  if (gameOver) {
    drawResults();
    return;
  }

  // Make sure there is always food available
  if (foods.length === 0) {
    foods.push(createFood());
  }

  // Draws each piece of food
  for (let i = 0; i < foods.length; i++) {
    drawFood(foods[i]);
  }

  // Updates each creature
  for (let i = 0; i < creatures.length; i++) {
    let creature = creatures[i];

    // Finds the closest piece of food
    let target = findNearestFood(creature, foods);

    if (target !== null) {
      moveCreature(creature, target);

      // Checks whether the creature has reached its food
      if (getDistance(creature, target) < creature.size / 2 + target.size / 2) {
        let foodIndex = foods.indexOf(target);

        // Replaces the food after it is eaten
        if (foodIndex !== -1) {
          foods.splice(foodIndex, 1);

          // Increases this creature's food counter
          creature.foodEaten++;

          foods.push(createFood());
        }
      }
    }

    drawCreature(creature);
  }

  drawInstructions();
  drawTimer();
}

// Creates and returns a creature object with randomized properties
function createCreature() {
  return {
    x: random(width),
    y: random(height),
    speed: random(0.7, 1.4),
    size: random(16, 24),
    foodEaten: 0,
    color: color(
      random(100, 180),
      random(180, 240),
      random(100, 160)
    )
  };
}

// Creates and returns a piece of food at a random position
function createFood() {
  return {
    x: random(15, width - 15),
    y: random(15, height - 15),
    size: 10
  };
}

// Finds and returns the closest food to a creature
function findNearestFood(creature, foods) {
  let nearestFood = null;
  let shortestDistance = Infinity;

  // Compares the distance to every piece of food
  for (let i = 0; i < foods.length; i++) {
    let distance = getDistance(creature, foods[i]);

    // Keeps track of the closest piece of food
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestFood = foods[i];
    }
  }

  return nearestFood;
}

// Moves a creature toward its target
function moveCreature(creature, target) {
  let dx = target.x - creature.x;
  let dy = target.y - creature.y;
  let distance = getDistance(creature, target);

  // Avoids dividing by zero when positions overlap
  if (distance > 0) {
    // Moves in the target's direction according to the creature's speed
    creature.x += (dx / distance) * creature.speed;
    creature.y += (dy / distance) * creature.speed;
  }
}

// Returns the distance between two objects
function getDistance(a, b) {
  // Calculates the horizontal and vertical differences
  let dx = a.x - b.x;
  let dy = a.y - b.y;

  // Uses the distance formula to calculate the distance between them
  return sqrt(dx * dx + dy * dy);
}

// Draws a creature and its food counter
function drawCreature(creature) {
  noStroke();
  fill(creature.color);

  // Draws the creature's body
  circle(creature.x, creature.y, creature.size);

  // Draws the eyes
  fill(20, 35, 25);
  circle(creature.x - 4, creature.y - 2, 3);
  circle(creature.x + 4, creature.y - 2, 3);

  // Displays the number of food pieces this creature has eaten
  fill(255);
  textSize(10);
  textAlign(CENTER, TOP);
  text(
    "Food: " + creature.foodEaten,
    creature.x,
    creature.y + creature.size / 2 + 4
  );
}

// Draws a piece of food
function drawFood(food) {
  noStroke();
  fill(255, 190, 80);

  // Draws the food at its stored position
  circle(food.x, food.y, food.size);
}

// Displays a short instruction
function drawInstructions() {
  fill(255);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);

  // Shows the instruction in the top-left corner
  text("Creatures search for food", 10, 10);
}

// Displays the remaining time
function drawTimer() {
  fill(255);
  noStroke();
  textSize(16);
  textAlign(RIGHT, TOP);

  // Shows the countdown in seconds
  text("Time: " + timeLeft, width - 10, 10);
}

// Finds the creature or creatures with the highest food count
function findWinners() {
  let highestScore = 0;

  // Finds the highest number of food pieces eaten
  for (let i = 0; i < creatures.length; i++) {
    if (creatures[i].foodEaten > highestScore) {
      highestScore = creatures[i].foodEaten;
    }
  }

  // Stores every creature that reached the highest score
  for (let i = 0; i < creatures.length; i++) {
    if (creatures[i].foodEaten === highestScore) {
      winners.push(i + 1);
    }
  }
}

// Displays the final results when time runs out
function drawResults() {
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);

  // Displays the game-over message
  textSize(28);
  text("Time's Up!", width / 2, 45);

  // Displays the winner or winners
  textSize(18);

  if (winners.length === 1) {
    text("Creature " + winners[0] + " wins!", width / 2, 90);
  } else {
    text("It's a tie!", width / 2, 90);
    text("Creatures: " + winners.join(", "), width / 2, 115);
  }

  // Displays each creature's final score
  textSize(16);

  for (let i = 0; i < creatures.length; i++) {
    let creature = creatures[i];

    fill(creature.color);
    text(
      "Creature " + (i + 1) + ": " + creature.foodEaten + " food",
      width / 2,
      175 + i * 35
    );
  }

  // Explains why the game has stopped
  fill(255);
  textSize(12);
  text("The game has ended.", width / 2, 300);
}