"use strict";

/******************************************************************************
Where's Sausage Dog? - ERRATIC EDITION
by Patrick Chavez-Nadarajah

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/

Saddlebag font from:
https://www.dafont.com/saddlebag.font
******************************************************************************/

// Position, image, movement and speed of the sausage dog we're searching for
let targetX;
let targetY;
let targetVX;
let targetVY;
let targetImage;
let targetSpeed = 0.5;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// Setting the height and width of images
let imageHeight;
let imageWidth;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 500;

// Keep track of whether they've won
let gameOver = false;

// Setting the Saddlebag font
let sbFont;

// preload()
//
// Loads the target, decoy images and font before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");

  sbFont = loadFont("assets/fonts/Saddlebag.ttf");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Setting the decoy image height and width for amusement purposes
  let imageWidth = random(100,300);
  let imageHeight = random(100,300);

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0,width);
    let y = random(0,height);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1,x,y,imageWidth,imageHeight);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,imageWidth,imageHeight);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,imageWidth,imageHeight);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,imageWidth,imageHeight);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,imageWidth,imageHeight);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,imageWidth,imageHeight);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,imageWidth,imageHeight);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,imageWidth,imageHeight);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,imageWidth,imageHeight);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,imageWidth,imageHeight);
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  // Setting the velocity of the target
  targetVX = 0;
  targetVY = 0;

  // And draw it (because it's the last thing drawn, it will always be on top)
  // The target will also have a random value in order to
  // blend-in with the other decoys
  image(targetImage,targetX,targetY,imageWidth,imageHeight);

  // Setting up the wanted poster for the dog in the top-right corner
  // Strokes are modified for aesthetic purposes
  strokeWeight(8);
  stroke(214,68,0);
  fill(245,109,47);
  rect(width-220,0,200,150);
  // Adding the dog image within the rectangle
  image(targetImage,width - 115,50);
  // Adding text within the rectangle
  fill(255);
  textFont(sbFont);
  textSize(32);
  textAlign(RIGHT,TOP);
  text("MISSING!", width - 40, 100);
}


// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));

    // Tell them they won!
    text("YOU'RE WINNER!",width/2,height/2);

    // Have the sausage dog leave a trail upon winning
    // Setting the image size to have a frantic effect
    let imageWidth = random(100,300);
    let imageHeight = random(100,300);
    // The dog will move erratically
    targetVX = targetVX + random(-targetSpeed,targetSpeed);
    targetVY = targetVY + random(-targetSpeed,targetSpeed);
    targetX = targetX + targetVX;
    targetY = targetY + targetVY;
    image(targetImage,targetX,targetY,imageWidth,imageHeight);
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
