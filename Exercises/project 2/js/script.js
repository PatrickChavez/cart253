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

// The Danger Zone
let danger;

// The Speedup
let speedGuy;

// The Slowdown
let slowGuy;

// The stars and the array storing them
let stars;

// The title/game over screen(s)
let titleScreen;
let gameOverScreen;

// preload()
//
// Loads the art assets
function preload() {
  titleScreen = loadImage("assets/images/Title Placeholder.png");
  gameOverScreen = loadImage("assets/images/Game Over Placeholder.png");
  gameOverScreenTwo = loadImage("assets/images/Game Over Placeholder 2.png");
  gameOverScreenThree = loadImage("assets/images/Game Over Placeholder 3.png");
}

// setup()
//
// Sets up a canvas
// Creates objects for the variables
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
  danger = new DangerZone(400, 400, 5, 4, color(255, 0, 0), 50);
  speedGuy = new Speedup(100, 100, 2, color(0, 0, 255), 40);
  slowGuy = new Slowdown(100, 100, 2, color(0, 255, 0), 40);

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
    danger.move();
    speedGuy.move();
    slowGuy.move();


    // Handle the tiger eating any of the prey
    tiger.handleEating(antelope);
    tiger.handleEating(zebra);
    tiger.handleEating(bee);

    // Handle the tiger getting faster
    tiger.handleSpeedup(speedGuy);

    // Handle the tiger getting faster
    tiger.handleSlowdown(slowGuy);

    // Handle the danger damaging the tiger
    danger.damage(tiger);

    // Display all the "animals"
    tiger.display();
    antelope.display();
    zebra.display();
    bee.display();
    danger.display();
    speedGuy.display();
    slowGuy.display();


    // The game is over once the predator's health reaches 0
    gameOver();
  }
}

// resetGame
//
// Restores the objects back to their original positions
// and resets predator health and score
function resetGame() {
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
  danger = new DangerZone(400, 400, 5, 4, color(255, 0, 0), 50);
  speedGuy = new Speedup(100, 100, 2, color(0, 0, 255), 40);
  slowGuy = new Slowdown(100, 100, 2, color(0, 255, 0), 40);

  tiger.health = tiger.maxHealth;
  tiger.preyEaten = 0;
}

// gameOverMessage
//
// Displays a message on the Game Over screen that
// tells the player what their score was
function gameOverMessage() {
  // Setting the text aesthetics
  textSize(42);
  textAlign(BOTTOM,BOTTOM);
  fill(0);
  // Setting up the text to display
  let gameOverText;
  gameOverText = "You've eaten " + tiger.preyEaten + " prey.\n";
  gameOverText = gameOverText + "Click to retry.";
  text(gameOverText, width / 2, height / 2);
}

// gameOver
//
// If the predator's health reaches 0, then the game ends
function gameOver() {
  if (tiger.health === 0) {
    playing = false;
    titleScreen = false;
    // A different screen appears depending on the number of prey eaten
    if (tiger.preyEaten >= 15) {
      image(gameOverScreenThree, 0, 0, windowWidth, windowHeight);
    }
    else if (tiger.preyEaten >= 10) {
      image(gameOverScreenTwo, 0, 0, windowWidth, windowHeight);
    }
    else {
    image(gameOverScreen, 0, 0, windowWidth, windowHeight);
    }
    // Show Game Over text
    gameOverMessage();
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
