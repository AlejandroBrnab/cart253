/**
 * Abstract prototype.
 * Name:
 * Alejandro
 *
 * It is something abstract. I call it Strings and Mirrors.
 * Basically, the strings represent kind of a timeline (chilhood, adolescence and adulthood in this case)
 * The mirrors represent one's self throughout the years. So one can probably see in the mirrors how one was thinking or acting back then.
 * 
 * The top string has a half mirror. This implies that there are other mirrors before the one that is half seen.
 * The bottom string has only two. Really, the number of mirrors don't mean anything, take it as whatever you want. A string may or 
 * may not  have mirrors. It always depends on one's past experiences. Coming back to the bottom string, this one is not going to the edge
 * of the canvas, so it implies that this string is still being built/prepared. Thus, it will add more mirrors or not in the future.
 * 
 * One can also take the colors as how bright or dark are those moments of one's self throuhgout the years. After all, it is an abstract
 * prototype. Someone else may have another interpretation to it :).
 * 
 */

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("#D8CFC4");

  //strings
  drawTopString();
  drawMiddleString();
  drawBottomString();

  //mirrors
  drawTopMirrors();
  drawMiddleMirrors();
  drawBottomMirrors();
  
}

/**
 * Functions to create the strings and mirrors
 */
// Draws the top string
function drawTopString(){
  push();

  noFill();
  stroke("black");
  strokeWeight(5);
  bezier(0, 25, 150, 140, 260, 120, 400, 25);

  pop();
}

// Draws mirrors for the top string
function drawTopMirrors(){
  push();

  stroke("black");
  strokeWeight(4);
  fill("lightcyan");

  // Half mirror
  rect(-35, 20, 45, 65);

  // Tall mirror
  rect(70, 55, 45, 65);

  // Wide mirror
  rect(170, 80, 70, 45);

  // Small mirror
  rect(290, 40, 40, 55);

  pop();
}

// Draws the middle string
function drawMiddleString(){
  push();

  noFill();
  stroke("black");
  strokeWeight(5);
  bezier(0, 140, 150, 255, 260, 235, 400, 140);
  
  pop();
}

// Draws mirrors for the middle string
function drawMiddleMirrors(){
  push();

  stroke("black");
  strokeWeight(4);
  fill("#B8D8E8");

  // Tall and narrow mirror
  triangle(100, 255, 127, 170, 155, 255);

  // Wide mirror
  triangle(215, 250, 262, 190, 310, 250);

  // Small mirror
  triangle(320, 215, 345, 150, 370, 215);

  pop();
}

// Draws the bottom string
function drawBottomString(){
  push();

  noFill();
  stroke("black");
  strokeWeight(5);
  bezier(0, 255, 150, 370, 260, 350, 375, 300);

  pop();
}

// Draws mirrors for the bottom string
function drawBottomMirrors(){
  push();

  stroke("black");
  strokeWeight(4);
  fill("skyblue");

  // Bottom circular mirror
  ellipse(87, 315, 55, 55);

  // Bottom wide circular mirror
  ellipse(217, 330, 75, 75);

  pop();
}