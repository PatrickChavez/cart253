// Predator-Prey Simulation Project 3
// by Patrick Chavez-Nadarajah
//
// A draft of Project 3 that uses the Predator-Prey Simulation source code.
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

// The healer
let healer;

// The goal text and its movement
let goalText = "Catch 40 prey!";
let goalTextY = 700;

// The dangers, their array and the number storing them
let cageNumber = 8;
let cageArray = [];

// The mini danger, its array and the number storing them
let miniNumber = 3;
let miniArray = [];

// The snow, its array and the number storing them
let snowNumber = 100;
let snowArray = [];

// The art assets
let titleScreen;
let gameOverScreen;

// preload()
//
// Preloads the art assets
function preload() {
  titleScreen = loadImage("assets/images/TitlePlaceholder.png");
  gameOverScreen = loadImage("assets/images/GameOverPlaceholder.png");

}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(400, 400, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
  healer = new Healer(0, random(0, height), 4, color(0, 255, 0), 20);
  // Setting a for loop to generate multiple objects
  // Generating a "cage"
  for (let i = 0; i < cageNumber; i++) {
    let cageLeft = new Danger(150, 150 + i*60, 5, color(255, 0, 0), 30);
    cageArray.push(cageLeft);
  }
  for (let i = 0; i < cageNumber; i++) {
    let cageRight = new Danger(650, 150 + i*60, 5, color(255, 0, 0), 30);
    cageArray.push(cageRight);
  }
  for (let i = 0; i < cageNumber; i++) {
    let cageUp = new Danger(i*60 + 190, 100, 5, color(255, 0, 0), 30);
    cageArray.push(cageUp);
  }
  for (let i = 0; i < cageNumber; i++) {
    let cageDown = new Danger(i*60 + 190, 620, 5, color(255, 0, 0), 30);
    cageArray.push(cageDown);
  }
  // The mini dangers
  for (let i = 0; i < miniNumber; i++) {
    let miniDanger = new MiniDanger(random(0, width), 0, random(3, 5), color(105, 0, 255), random(10, 40));
    miniArray.push(miniDanger);
  }
  // The snow
  for (let i = 0; i < snowNumber; i++) {
  let snow = new Snow(random(0, width), random(0, height), random(2, 4), color(255, 115, 150, 50), random(3, 10));
  snowArray.push(snow);
  }
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
    playState();
  }
}

// displayGoal
//
// Shows the goal of the game
function displayGoal() {
  push();
  fill(255);
  textSize(64);
  textAlign(CENTER,CENTER);
  text(goalText, width/2, goalTextY);
  // Make it move
  goalTextY = goalTextY - 3;
  pop();
}

// displayScore
//
// Shows the number of prey eaten
function displayScore() {
  fill(255);
  textSize(64);
  textAlign(LEFT,BOTTOM);
  text("SCORE:" + tiger.preyEaten, 0, height);
}

// displayTitle()
//
// Shows the title screen
function displayTitle() {
  image(titleScreen, 0, 0, windowWidth, windowHeight);
}

// displayGameOver()
//
// Shows the game over screen
function displayGameOver() {
  image(gameOverScreen, 0, 0, windowWidth, windowHeight);
}

// playState()
//
// Shows all of the functions and objects during play
function playState() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();
  healer.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Handle the healing
  tiger.handleHealing(healer);


  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
  healer.display();

  // Moving and displaying the arrays
  for (let i = 0; i < miniArray.length; i++) {
    miniArray[i].move();
    miniArray[i].display();
    miniArray[i].damage(tiger);
  }

  for (let i = 0; i < cageArray.length; i++) {
    cageArray[i].handleInput();
    cageArray[i].move();
    cageArray[i].display();
    cageArray[i].damage(tiger);
  }

  for (let i = 0; i < snowArray.length; i++) {
    snowArray[i].move();
    snowArray[i].display();
  }

  // The game ends when health reaches 0
  if (tiger.health <= 0) {
    state = "GAMEOVER";
    displayGameOver();
  }

  // Display the score
  displayScore();

  // Display the goal
  displayGoal();
}

// mousePressed()
//
// Cycles through the various game screens
function mousePressed() {
  if (state === "TITLE") {
    state = "PLAY";
  }
}
