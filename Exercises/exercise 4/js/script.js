"use strict";

// Somewhat Cute Pong
// by Patrick Chavez-Nadarajah
//
// A "simple" implementation of Pong with a scoring system.
// The game is played with the keyboard.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle
//
// cursor3.wav obtained from TAM Music Factory
// https://www.tam-music.com/se000_category/menu
//
// tanoshiimugibatake.mp3/Fun Wheat Field/楽しい麦畑
// obtained from Amacha Music Studio
// https://amachamusic.chagasi.com/image_akarui.html

// Whether the game has started
let playing = false;

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40
}

// FLAGS

// Set visual indicators for the score
let leftFlag = {
  x: 100,
  y: 480,
  w: 20,
  h: 70,
}

let rightFlag = {
  x: 540,
  y: 480,
  w: 20,
  h: 70,
}

// Setting up the media variables
// A variable to hold the beep sound we will play on bouncing
let beepSFX;
// A variable for the backround music
let bgMusic;
// Variables for the images
let leftPlayer;
let rightPlayer;
let ballImage;
let backgroundImage;

// Adding the scores of the left and right side
let leftScore = 0;
let rightScore = 0;

// preload()
//
// Loads the various media files
function preload() {
  beepSFX = new Audio("assets/sounds/cursor3.wav");
  bgMusic = loadSound("assets/sounds/tanoshiimugibatake.mp3");
  leftPlayer = loadImage("assets/images/Paddle Left.png");
  rightPlayer = loadImage("assets/images/Paddle Right.png");
  ballImage = loadImage("assets/images/Ball.png");
  backgroundImage = loadImage("assets/images/Pong Landscape.png");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  // Set the music
  bgMusic.loop();

  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - 40;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Set the background
  image(backgroundImage, 0, 0);

  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Increase the height of the flags
    updateFlag();

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
    }
  }
  else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }

  // We always display the paddles and ball so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();

  // Display the flags to indicate the score
  displayFlag(leftFlag);
  displayFlag(rightFlag);
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Update the score depending on where the ball went
  if (ball.x < 0) {
    rightScore = rightScore + 1;
  }
  if (ball.x > width) {
    leftScore = leftScore + 1;
  }
  // Check for ball going off the sides
  if (ball.x < 0 || ball.x > width) {
    return true;
  }
  else {
    return false;
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle() {
  // Draw the paddles
  image(leftPlayer, leftPaddle.x, leftPaddle.y);
  image(rightPlayer, rightPaddle.x, rightPaddle.y);
}

// displayBall()
//
// Draws the ball on screen as a shocked ball
function displayBall() {
  // Draw the ball
  image(ballImage, ball.x, ball.y, ball.size, ball.size);
}

// displayFlag(flag)
//
// Draws the specified flag
function displayFlag() {
  // Draw the flags
  // The red flag
  push();
  fill(255, 0, 0);
  rect(rightFlag.x, rightFlag.y, rightFlag.w, rightFlag.h);
  pop();
  // The blue flag
  push()
  fill(0, 0, 255);
  rect(leftFlag.x, leftFlag.y, leftFlag.w, leftFlag.h);
  pop();
}

// resetBall()
//
// Sets the starting position and velocity of the ball depending on who won
function resetBall() {
  // Initialise the ball's position and velocity
  // If the right side won
  if (ball.x < 0) {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.vx = ball.speed;
    ball.vy = random(1, 7);
  }
  // If the left side won
  if (ball.x > width) {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.vx = - ball.speed;
    ball.vy = random(1, 7);
  }
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CLICK TO START", width / 2, height / 2);
  pop();

  push();
  updateFlag();
  pop();
}

// updateFlag()
//
// Increases the height of the flags upon scoring
function updateFlag() {
  rightFlag.h = rightScore * 10;

  leftFlag.h = leftScore * 10;
}

// mousePressed()
//
// Here to require a click to start playing the game and reset the ball
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
  // Resets the ball's initial position and make it go right
  ball.x = width / 2;
  ball.y = height / 2;
  ball.vx = ball.speed;
  ball.vy = random(1, 7);
}
