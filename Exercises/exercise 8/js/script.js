// Predator-Prey Simulation Project 3
// by Patrick Chavez-Nadarajah
//
// Another draft of Project 3 that uses the Predator-Prey Simulation source code.
// Collect the prey scattered throughout the canvas and avoid the dangers using the arrow keys!
// Your cage can be moved using the WSAD keys and can shrink the dangers of the appropriate color.
//
// Predator-Prey Simulation source code from Pippin Barr
//https://github.com/pippinbarr/cart253-2019/blob/master/games/game-oop-predator-prey.zip

// Handling the game's current state/screen
let state = "TITLE";

// Our predator
let tiger;

// The healer
let healer;

// The goal text and its movement
let goalText = "Find 40 prey!";
let goalTextY = 700;

// Milestone text properties
let message;
let milestoneY = 700;

// The prey, their array and their number storing them
let preyNumber = 4;
let preyArray = [];

// The cages, their array and the number storing them
let cageNumber = 5;
let cageArray = [];

// The danger, its array and the number storing them
let dangerNumber = 10;
let dangerArray = [];

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
  tiger = new Predator(250, 250, 4, color(255, 160, 0), 30);
  healer = new Healer(0, random(0, height), 5, color(0, 255, 0), 40);
  // Setting a for loop to generate multiple objects
  // Generating a "cage"
  for (let i = 0; i < cageNumber; i++) {
    let cageLeft = new Cage(150, 150 + i*60, 4, color(255, 0, 0), 30);
    cageArray.push(cageLeft);
  }
  for (let i = 0; i < cageNumber; i++) {
    let cageRight = new Cage(470, 150 + i*60, 4, color(255, 0, 0), 30);
    cageArray.push(cageRight);
  }
  for (let i = 0; i < cageNumber; i++) {
    let cageUp = new Cage(i*60 + 190, 100, 4, color(255, 0, 0), 30);
    cageArray.push(cageUp);
  }
  for (let i = 0; i < cageNumber; i++) {
    let cageDown = new Cage(i*60 + 190, 440, 4, color(255, 0, 0), 30);
    cageArray.push(cageDown);
  }
  // The prey
  for (let i = 0; i < preyNumber; i++) {
    let prey = new Prey(random(width/2, width), random(height/2, height), random(3, 5), color(255, 215, 0), 20);
    preyArray.push(prey);
  }
  // The dangers
  for (let i = 0; i < dangerNumber; i++) {
    let danger = new Danger(random(300, width), random(300, height), random(1, 3), color(140, 10, 0), 60);
    dangerArray.push(danger);
  }
  // The mini dangers
  for (let i = 0; i < miniNumber; i++) {
    let miniDanger = new MiniDanger(random(200, width), 0, random(1, 5), color(0, 11, 95), 60);
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
  // Make the message disappear when a game over happens
  if (state === "GAMEOVER") {
    return;
  }
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
  push();
  fill(255);
  textSize(64);
  textAlign(LEFT,BOTTOM);
  text("SCORE:" + tiger.preyEaten, 0, height);
  pop();
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
  // Setting the text aesthetics
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0, 0, 0);
  // Setting the text to be displayed
  let gameOverText;
  gameOverText = "You found " + tiger.preyEaten + " prey. \n";
  gameOverText = gameOverText + "Click to reset!"
  text(gameOverText, width/2, height/2);
}

// milestoneMessage
//
// Displays a messsage when the predator finds a number of prey
// Resets the the message's y position to scroll upwards again
function milestoneMessage() {
  push();
  // Setting the text aesthetics
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  // The message displays nothing at 0 prey eaten
  if (tiger.preyEaten === 0) {
    	message = "";
    }
  // The first message
  if (tiger.preyEaten === 4) { // The message will display when 5 is reached
    // Setting the text to be displayed
    message = "Good start!";
    milestoneY = 700;
  }
  // The second message
  if (tiger.preyEaten === 19) { // The message will display when 20 is reached
    message = "Doing great!";
    milestoneY = 700;
  }
  // The third message
  if (tiger.preyEaten === 29) { // The message will display when 30 is reached
    message = "Almost there!";
    milestoneY = 700;
  }
  // Handling the universal settings for the message display
  // The messages activate as soon as the number of prey eaten reaches 5
  if (tiger.preyEaten >= 5 ) {
    text(message, width/2, milestoneY);
    milestoneY = milestoneY - 3;
  }
  pop();
}

// resetGame
//
// Restores predator health and resets the number of prey and object positions
function resetGame() {
  // Object positions
  tiger = new Predator(250, 250, 4, color(200, 200, 0), 30);

  // Predator properties
  tiger.health = tiger.maxHealth;
  tiger.preyEaten = 0;
}

// playState()
//
// Shows all of the functions and objects during play
function playState() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  tiger.handleInput();

  // Move all the non-array characters
  tiger.move();
  healer.move();

  // Handle the healing
  tiger.handleHealing(healer);

  // Display all the non-array characters
  tiger.display();
  healer.display();

  // Moving and displaying the arrays

  for (let i = 0; i < preyArray.length; i++) {
    preyArray[i].display();
    tiger.handleEating(preyArray[i]);
  }

  for (let i = 0; i < dangerArray.length; i++) {
    dangerArray[i].move();
    dangerArray[i].display();
    dangerArray[i].damage(tiger);
    // Handling another array
    for (let j = 0; j < cageArray.length; j++) {
    cageArray[j].handleEating(dangerArray[i]);
    }
  }

  for (let i = 0; i < miniArray.length; i++) {
    miniArray[i].move();
    miniArray[i].display();
    miniArray[i].damage(tiger);
    // Handling another array
    for (let j = 0; j < cageArray.length; j++) {
    cageArray[j].changedEating(miniArray[i]);
    }
  }

  for (let i = 0; i < cageArray.length; i++) {
    cageArray[i].handleInput();
    cageArray[i].move();
    cageArray[i].display();
    cageArray[i].damage(tiger);
    cageArray[i].handleEating(dangerArray);
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

  // Displaying the milestone messages
  milestoneMessage();
}

// mousePressed()
//
// Cycles through the various game screens
function mousePressed() {
  if (state === "TITLE") {
    state = "PLAY";
  }
  // Resets game if the player got a game over
  if (state === "GAMEOVER") {
    state = "PLAY";
    resetGame();
  }
}
