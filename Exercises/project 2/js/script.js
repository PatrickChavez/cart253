// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Checks to see if the game has started
let playing = false;

// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

// The title/game over screen(s)
let titleScreen;
let gameOverScreen;

// preload()
//
// Loads the art assets
function preload() {
  titleScreen = loadImage("assets/images/Title Placeholder.png");
  gameOverScreen = loadImage("assets/images/Game Over Placeholder.png");
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
  // Setting the title screen
  image(titleScreen, 0, 0, windowWidth, windowHeight);

  if (playing) {

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

// mousePressed()
//
// Allows the game to start upon clicking the screen
function mousePressed() {
  if (!playing) {
    playing = true;
  }
}
