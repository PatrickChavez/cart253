// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predators
let tiger;
let lion;
let boar;

// The three prey
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW);
  lion = new Predator(200, 200, 5, color(165, 120, 50), 40, 87, 83, 65, 68);
  boar = new Predator (300, 300, 5, color(130, 40, 25), 40, 73, 75, 74, 76);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the predators
  tiger.handleInput();
  lion.handleInput();
  boar.handleInput();

  // Move all the "animals"
  tiger.move();
  lion.move();
  boar.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the predators eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  lion.handleEating(antelope);
  lion.handleEating(zebra);
  lion.handleEating(bee);

  boar.handleEating(antelope);
  boar.handleEating(zebra);
  boar.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  lion.display();
  boar.display();
  antelope.display();
  zebra.display();
  bee.display();
}
