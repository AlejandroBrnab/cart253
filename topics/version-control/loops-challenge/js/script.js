/**
 * Lines
 * Pippin Barr
 * 
 * A series of lines across the canvas
 */

"use strict";

// Creates the canvas
function setup() {
    createCanvas(250, 250);
}


// Draws lines across the canvas with increasing thickness and
// gradually lightening colour
function draw() {
    background("pink");
    let r= 0;
    let b=250;
    for (let x1 = 0; x1 <=250; x1++){
      stroke(r,0,b);
      strokeWeight(1);
      line(x1,0,x1,height);
      r+=1;
      b-=1;
    }
    let x = 0;
    let strokeW = 0;
    while (x <=250){
      stroke(strokeW);
      line(x, 0, x, height);
      line(0, x, width, x);
      x += 5;

    }

}