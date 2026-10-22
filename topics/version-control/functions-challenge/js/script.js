/**
 * Bouncy Ball Ball Bonanza
 * Agustin, Charbel John, Alejandro, Chloe
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

// Our ball
const ball = {
    x: 300,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 3
    }
};

// Our 2nd ball
const ball2 = {
    x: 400,
    y: 15,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 1
    }
};

// Our paddle
const paddle = {
    x: 300,
    y: 290,
    width: 80,
    height: 10,
    difference: 0
};

// Our 2nd paddle
const paddle2 = {
    x: 300,
    y: 10,
    width: 80,
    height: 10
};

// Wall
const wall = {
    x: -5,
    y: 150,
    width: 10,
    height: 300
};

// Wall 2
const wall2 = {
    x: 605,
    y: 150,
    width: 10,
    height: 300
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * Move and display the ball and paddle
*/
function draw() {
    background("#87ceeb");

    movePaddle(paddle);
    movePaddleKeys(paddle2);
    moveBall(ball);
    moveBall(ball2);

    handleBounce(ball, paddle);
    handleBounce(ball2, paddle);

    handleBounce(ball, paddle2);
    handleBounce(ball2, paddle2);
    handleBounce(ball2, ball);
    wallBounce(ball2, ball);

    wallBounce(ball, wall);
    wallBounce(ball2, wall);

    wallBounce(ball, wall2);
    wallBounce(ball2, wall2);

    drawPaddle(paddle);
    drawPaddle(paddle2);
    drawPaddle(wall);
    drawPaddle(wall2);
    drawBall(ball);
    drawBall(ball2);
}
/**
 * Moves the paddle with keys
 */
function movePaddleKeys(paddle) {
    if (keyIsDown(LEFT_ARROW) === true) {
        paddle.x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW) === true) {
        paddle.x += 5;
    }
}
/**
 * Moves the paddle with mouse
 */
function movePaddle(paddle) {
    
    paddle.x = mouseX;
}

/**
 * Moves the ball passed in as a parameter
 */
function moveBall(ball) {
    ball.y += ball.velocity.y;
    ball.x += ball.velocity.x;
}

/**
 * Bounces the provided ball off the provided paddle
 */
function handleBounce(ball, paddle) {
    paddle.difference = paddle.x - ball.x;
    if(checkOverlap(ball, paddle)){
        ball.velocity.y = -ball.velocity.y;
            if(paddle.difference > 0 ){
                ball.velocity.x = paddle.difference / -10;
                //  console.log(paddle.difference);
            }
            if(paddle.difference < 0){
                ball.velocity.x = paddle.difference / -10;
                // console.log(paddle.difference);
            }
    }

}
function wallBounce(ball, wall) {
    if(checkOverlap(ball, wall)){
        ball.velocity.x = -ball.velocity.x;
    }

}

/**
 * Bounces the provided ball off the provided paddle
 */

/**
 * Draws the specified paddle on the canvas
 */
function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("black");
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

/**
 * Draws the specified ball on the canvas
 */
function drawBall(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("black");
    rect(ball.x, ball.y, ball.width, ball.height);
    pop();
}

// function differenceChecker(){
//     difference = paddle.x - ball.x;

// }

/**
 * Returns true if rectA and rectB overlap, and false otherwise
 * Assumes rectA and rectB have properties x, y, width and height to describe
 * their rectangles, and that rectA and rectB are displayed CENTERED on their
 * x,y coordinates.
 */
function checkOverlap(rectA, rectB) {
    return (rectA.x + rectA.width/2 > rectB.x - rectB.width/2 &&
            rectA.x - rectA.width/2 < rectB.x + rectB.width/2 &&
            rectA.y + rectA.height/2 > rectB.y - rectB.height/2 &&
            rectA.y - rectA.height/2 < rectB.y + rectB.height/2);
}