// Predator-Prey Simulation Project 3
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.
//
// Predator-Prey Simulation source code from Pippin Barr
//https://github.com/pippinbarr/cart253-2019/blob/master/games/game-oop-predator-prey.zip

// Handling the game's current state/screen
let state = "TITLE";

// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

// The art assets
let titleScreen;

// preload()
//
// Preloads the art assets
function preload() {
  titleScreen = loadImage("assets/images/TitlePlaceholder.png");

}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Changing the game states
  if (state === "TITLE") {
    displayTitle();
  }

  // Making an if statement to handle the play screen
  else if (state === "PLAY") {

    // Clear the background to black
    background(0);

    // Handle input for the tiger
    tiger.handleInput();

    // Move all the "animals"
    tiger.move();
    antelope.move();
    zebra.move();
    bee.move();

    // Handle the tiger eating any of the prey
    tiger.handleEating(antelope);
    tiger.handleEating(zebra);
    tiger.handleEating(bee);

    // Display all the "animals"
    tiger.display();
    antelope.display();
    zebra.display();
    bee.display();
  }
}

// displayTitle()
//
// Shows the title screen
function displayTitle() {
  image(titleScreen, 0, 0, windowWidth, windowHeight);
}

// mousePressed()
//
// Cycles through the various game screens
function mousePressed() {
  if (state === "TITLE") {
    state = "PLAY";
  }
}
