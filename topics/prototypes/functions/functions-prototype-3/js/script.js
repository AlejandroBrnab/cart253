/**
 * Hunger Games
 * Name: Alejandro
 *
 * Some "creatures" search for food and move around the canvas.
 */

"use strict";

let creatures = [];
let foods = [];

function setup() {
  createCanvas(500, 400);

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