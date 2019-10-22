// Predator-Prey Simulation - Cute(?) Edition
// by Patrick Chavez-Nadarajah
//
// Creates three predator and prey (of different sizes and speeds).
// The predator chases the prey using the arrow, WASD and IJKL keys and consumes them.
// Holding the H key allows them to sprint.
// The predator loses health over time, so must keep eating to survive.

// Our predators
let tiger;
let lion;
let boar;

// The three prey
let antelope;
let zebra;
let bee;

// The art assets
let tigerImage;
let lionImage;
let boarImage;
let antelopeImage;
let zebraImage;
let beeImage;
let bgGrass;

// preload()
//
// Loads the various art assets
function preload() {
  tigerImage = loadImage("assets/images/Tiger.png");
  lionImage = loadImage("assets/images/Lion.png");
  boarImage = loadImage("assets/images/Boar.png");
  antelopeImage = loadImage("assets/images/Antelope.png");
  zebraImage = loadImage("assets/images/Zebra.png");
  beeImage = loadImage("assets/images/Bee.png");
  bgGrass = loadImage("assets/images/Grass.png");
}

// setup()
//
// Sets up a canvas
// Creates objects for the three predator and prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, tigerImage, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, "Tiger");
  lion = new Predator(200, 200, 5, lionImage, 40, 87, 83, 65, 68, "Lion");
  boar = new Predator(300, 300, 5, boarImage, 40, 73, 75, 74, 76, "Boar");
  antelope = new Prey(100, 100, 10, antelopeImage, 50);
  zebra = new Prey(100, 100, 8, zebraImage, 60);
  bee = new Prey(100, 100, 20, beeImage, 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // The background consists of grass
  image(bgGrass, 0, 0, windowWidth, windowHeight);

  // Handle input for the predators
  tiger.handleInput();
  lion.handleInput();
  boar.handleInput();

  // Move all the animals
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

  // Display all the animals
  tiger.display();
  lion.display();
  boar.display();
  antelope.display();
  zebra.display();
  bee.display();
}
