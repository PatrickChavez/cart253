// Exercise 1 - Movement
// Patrick Chavez-Nadarajah
//
// This is an expansion of the starter code for exercise 1.
// Draws a moving square, circle and triangle that intersect
// in the middle of the canvas.
// The mouse is also followed by a frog.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// Setting up variables for the self-made frog image
let frogImage;
let frogImageX;
let frogImageY;

// Setting up the position of the triangle
// to be around the middle-left of the canvas
let triX1 = 0;
let triY1 = 360;
let triX2 = 40;
let triY2 = 300;
let triX3 = 80;
let triY3 = 360;

// preload()
//
// The frog image will load on startup

function preload() {
frogImage = loadImage("assets/images/Frog.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();
}


// draw()
//
// Change the circle, square and triangle's positions so they move
// The frog image will also be following the mouse's movements

function draw() {
  // We don't fill the background so we get a drawing effect

  // The frog image will follow the mouse's movements
  frogImageX = mouseX;
  frogImageY = mouseY;
  // Display the frog
  image(frogImage,frogImageX,frogImageY,100,100);

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  // Remove the triangle strokes
  noStroke()
  // Move the triangle to the right
  triX1 += 1;
  triX2 += 1;
  triX3 += 1;
  // Make the triangle transparent yellow
  fill(242,239,27,10);
  // Display the triangle offscreen
  triangle(triX1 - 100,triY1,triX2 - 100,triY2,triX3 - 100,triY3);


}
