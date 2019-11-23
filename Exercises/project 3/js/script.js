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
let thief;

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

// The title, game over, story and gameplay screens
let titleScreen;
let gameOverScreen;
let playBackground;

// The character images
let avatarImage;
let preyImage;
let dangerImage;
let miniDangerImage;
let healerImage;
let cageImageRed;
let cageImageBlue;

// preload()
//
// Preloads the art assets
function preload() {
  titleScreen = loadImage("assets/images/TitlePlaceholder.png");
  gameOverScreen = loadImage("assets/images/GameOverPlaceholder.png");
  playBackground = loadImage("assets/images/CaveBackground.png");
  avatarImage = loadImage("assets/images/ThiefAvatar.png");
  preyImage = loadImage("assets/images/CoinPile.png");
  dangerImage = loadImage("assets/images/RedWisp.png");
  miniDangerImage = loadImage("assets/images/BlueWisp.png");
  healerImage = loadImage("assets/images/GreenWisp.png");
  cageImageRed = loadImage("assets/images/RedOrb.png");
  cageImageBlue = loadImage("assets/images/BlueOrb.png");

}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  thief = new Predator(250, 250, 4, avatarImage, 30);
  healer = new Healer(0, random(0, height), 5, healerImage, 40);
  // Setting a for loop to generate multiple objects
  // Generating a "cage"
  for (let i = 0; i < cageNumber; i++) {
    let cageLeft = new Cage(150, 150 + i*60, 4, cageImageRed, cageImageBlue, 30);
    cageArray.push(cageLeft);
  }
  for (let i = 0; i < cageNumber; i++) {
    let cageRight = new Cage(470, 150 + i*60, 4, cageImageRed, cageImageBlue, 30);
    cageArray.push(cageRight);
  }
  for (let i = 0; i < cageNumber; i++) {
    let cageUp = new Cage(i*60 + 190, 100, 4, cageImageRed, cageImageBlue, 30);
    cageArray.push(cageUp);
  }
  for (let i = 0; i < cageNumber; i++) {
    let cageDown = new Cage(i*60 + 190, 440, 4, cageImageRed, cageImageBlue, 30);
    cageArray.push(cageDown);
  }
  // The prey
  for (let i = 0; i < preyNumber; i++) {
    let prey = new Prey(random(width/2, width), random(height/2, height), random(3, 5), preyImage, 20);
    preyArray.push(prey);
  }
  // The dangers
  for (let i = 0; i < dangerNumber; i++) {
    let danger = new Danger(random(300, width), random(300, height), random(1, 3), dangerImage, 60);
    dangerArray.push(danger);
  }
  // The mini dangers
  for (let i = 0; i < miniNumber; i++) {
    let miniDanger = new MiniDanger(random(200, width), 0, random(1, 5), miniDangerImage, 60);
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
  text("SCORE:" + thief.preyEaten, 0, height);
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
  gameOverText = "You found " + thief.preyEaten + " prey. \n";
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
  if (thief.preyEaten === 0) {
    	message = "";
    }
  // The first message
  if (thief.preyEaten === 4) { // The message will display when 5 is reached
    // Setting the text to be displayed
    message = "Good start!";
    milestoneY = 700;
  }
  // The second message
  if (thief.preyEaten === 19) { // The message will display when 20 is reached
    message = "Doing great!";
    milestoneY = 700;
  }
  // The third message
  if (thief.preyEaten === 29) { // The message will display when 30 is reached
    message = "Almost there!";
    milestoneY = 700;
  }
  // Handling the universal settings for the message display
  // The messages activate as soon as the number of prey eaten reaches 5
  if (thief.preyEaten >= 5 ) {
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
  thief = new Predator(250, 250, 4, avatarImage, 30);

  // Predator properties
  thief.health = thief.maxHealth;
  thief.preyEaten = 0;
}

// playState()
//
// Shows all of the functions and objects during play
function playState() {
  // Setting the cave background
  image(playBackground, 0, 0, windowWidth, windowHeight);

  // Handle input for the thief
  thief.handleInput();

  // Move all the non-array characters
  thief.move();
  healer.move();

  // Handle the healing
  thief.handleHealing(healer);

  // Display all the non-array characters
  thief.display();
  healer.display();

  // Moving and displaying the arrays
  for (let i = 0; i < preyArray.length; i++) {
    preyArray[i].display();
    thief.handleEating(preyArray[i]);
  }

  for (let i = 0; i < dangerArray.length; i++) {
    dangerArray[i].move();
    dangerArray[i].display();
    dangerArray[i].damage(thief);
    // Handling another array
    for (let j = 0; j < cageArray.length; j++) {
    cageArray[j].handleEating(dangerArray[i]);
    }
  }

  for (let i = 0; i < miniArray.length; i++) {
    miniArray[i].move();
    miniArray[i].display();
    miniArray[i].damage(thief);
    // Handling another array
    for (let j = 0; j < cageArray.length; j++) {
    cageArray[j].changedEating(miniArray[i]);
    }
  }

  for (let i = 0; i < cageArray.length; i++) {
    cageArray[i].handleInput();
    cageArray[i].move();
    cageArray[i].display();
    cageArray[i].damage(thief);
    cageArray[i].handleEating(dangerArray);
  }

  for (let i = 0; i < snowArray.length; i++) {
    snowArray[i].move();
    snowArray[i].display();
  }

  // The game ends when health reaches 0
  if (thief.health <= 0) {
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
