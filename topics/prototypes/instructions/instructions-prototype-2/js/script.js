/**
 * Minion
 * Names:
 * Agustin, Chloe, Alejandro
 *
 * It is a minion.
 */

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(225);

  // Lines
  line(20, 40, 150, 40);
  line(200, 20, 350, 80);
  line(50, 100, 120, 150);
  line(180, 90, 300, 120);
  line(320, 30, 380, 150);

  line(20, 200, 170, 180);
  line(220, 170, 390, 220);
  line(60, 250, 130, 330);
  line(180, 250, 350, 280);

  line(20, 370, 100, 300);
  line(230, 320, 380, 370);

  // Rectangles
  rect(30, 60, 60, 30);
  rect(130, 30, 40, 70);
  rect(280, 100, 70, 40);

  rect(30, 170, 80, 50);
  rect(140, 130, 40, 80);
  rect(300, 180, 50, 70);

  rect(120, 290, 70, 40);
  rect(250, 300, 100, 50);

  //test
  push();

  noFill();
  stroke("black");
  strokeWeight(5);

  bezier(50, 80, 120, 130, 280, 130, 350, 80);

  pop();
}