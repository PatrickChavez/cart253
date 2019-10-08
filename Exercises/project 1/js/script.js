"use strict";

/******************************************************

Game - Chaser - Exorcist Edition!
Patrick Chavez-Nadarajah

An expansion of the "simple" game of cat and mouse. The player is the lingering
ghost of an exorcist. Purify spirits and take their energy to keep yourself
attached to this world! But beware, the Grim Reaper stalks the area and becomes
more restless as spirits are purged!

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap and spookiness.

Augusta font obtained from:
https://www.dafont.com/augusta.font?l[]=10&l[]=1

error3.wav obtained from TAM Music Factory
https://www.tam-music.com/se000_category/menu

shinigamitowaltz.mp3/Grim Reaper and Waltz/死神とワルツ obtained
from Amacha Music Studio
https://amachamusic.chagasi.com/image_bukimi.html

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size and velocity
let playerX;
let playerY;
let playerRadius = 40;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 4;
// Player health
let playerHealth;
let playerMaxHealth = 300;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity and noise time
let preyX;
let preyY;
let preyRadius = 40;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
let preyTX;
let preyTY;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Predator position, size, veocity and noise time
let predatorX;
let predatorY;
let predatorRadius = 40;
let predatorVX;
let predatorVY;
let predatorMaxSpeed = 4;
let predatorTX;
let predatorTY;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 30;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

// Adding variables for the art assets
let playerExorcist;
let preyGhost;
let graveBackground;
let predatorReaper;
let aFont;
let ghostSound;
let gameMusic;

// preload()
//
// Preloads the various media assets
function preload() {
  playerExorcist = loadImage("assets/images/Exorcist.png");
  preyGhost = loadImage("assets/images/Ghost.png");
  graveBackground = loadImage("assets/images/Graveyard.png");
  predatorReaper = loadImage("assets/images/Reaper.png");
  aFont = loadFont("assets/fonts/Augusta.ttf");
  ghostSound = loadSound("assets/sounds/error3.wav");
  gameMusic = loadSound("assets/sounds/shinigamitowaltz.mp3");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);

  noStroke();

  // Setting up the music
  gameMusic.loop();

  // Setting up the initial positions of the three agents
  resetGame();
}

// setupPrey()
//
// Initialises prey's position, velocity, health and noise time
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
  // Make two seperate noise values to prevent mirrored movement
  preyTX = random(0, 1000);
  preyTY = random(0, 1000);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// setupPredator()
//
// Initialises predator's position, velocity and noise time
function setupPredator() {
  predatorX = width / 2;
  predatorY = height / 2;
  predatorVX = -predatorMaxSpeed;
  predatorVY = predatorMaxSpeed;
  // Make two seperate noise values to prevent mirrored movement
  predatorTX = random(0, 1000);
  predatorTY = random(0, 1000);
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the three agents.
// When the game is over, shows the game over screen.
function draw() {
  // Setting up the background
  image(graveBackground, 0, 0);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();
    movePredator();

    updateHealth();
    checkEating();
    dangerZone();

    drawPrey();
    drawPlayer();
    drawPredator();

    showScore();
    showHealth();

  } else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  } else {
    playerVY = 0;
  }

  // The player moves faster when the shift key is pressed
  // However, they also lose more health
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = 8;
    playerHealth = playerHealth - 2;
  } else {
    playerMaxSpeed = 4;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 1;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Play a sound effect
      ghostSound.play();
      // Move the "new" prey to a nearby gravestone
      // Make r a random number for probability
      let r = random(0, 1);
      // Give every gravestone but the center one a 10% chance of spawning prey
      if (r < 0.1) {
        preyX = 50;
        preyY = 50;
      } else if (r < 0.2) {
        preyX = 200;
        preyY = 50;
      } else if (r < 0.3) {
        preyX = 360;
        preyY = 50;
      } else if (r < 0.4) {
        preyX = 50;
        preyY = 230;
      } else if (r < 0.5) {
        preyX = 380;
        preyY = 230;
      } else if (r < 0.6) {
        preyX = 50;
        preyY = 400;
      } else if (r < 0.7) {
        preyX = 200;
        preyY = 380;
      } else if (r < 0.8) {
        preyX = 380;
        preyY = 360;
      } else {
        preyX = 210;
        preyY = 210;
      }
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      // Increase the size and speed of the predator
      predatorRadius = predatorRadius + 2;
      predatorMaxSpeed = predatorMaxSpeed + 1;
    }
  }
}

// dangerZone()
//
// Checks if the player overlaps with the predator and
// updates the former's health
function dangerZone() {
  // Get distance of player to predator
  let d = dist(playerX, playerY, predatorX, predatorY);
  // Check if it's an overlap
  if (d < playerRadius + predatorRadius) {
    // Decrease the player's health
    playerHealth = playerHealth - 7;
  }
}

// movePredator()
//
// Moves the predator based on random velocity changes
function movePredator() {
  // Make the predator's velocity change based on noise
  predatorVX = map(noise(predatorTX), 0, 1, -predatorMaxSpeed, predatorMaxSpeed);
  predatorVY = map(noise(predatorTY), 0, 1, -predatorMaxSpeed, predatorMaxSpeed);

  predatorTX = predatorTX + 0.01;
  predatorTY = predatorTY + 0.01;

  // Update predator position based on velocity
  predatorX = predatorX + predatorVX;
  predatorY = predatorY + predatorVY;

  // Screen wrapping
  if (predatorX < 0) {
    predatorX = predatorX + width;
  } else if (predatorX > width) {
    predatorX = predatorX - width;
  }

  if (predatorY < 0) {
    predatorY = predatorY + height;
  } else if (predatorY > height) {
    predatorY = predatorY - height;
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Make the prey's velocity change based on noise
  preyVX = map(noise(preyTX), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(preyTY), 0, 1, -preyMaxSpeed, preyMaxSpeed);

  preyTX = preyTX + 0.01;
  preyTY = preyTY + 0.01;

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as a ghost
function drawPrey() {
  tint(255, preyHealth);
  image(preyGhost, preyX, preyY, preyRadius * 2, preyRadius * 2);
  tint(255, 255);
}

// drawPlayer()
//
// Draw the player as an exorcist
function drawPlayer() {
  tint(255, playerHealth);
  image(playerExorcist, playerX, playerY, playerRadius * 2, playerRadius * 2);
  tint(255, 255);
}

// drawPredator()
//
// Draw the predator as a reaper
function drawPredator() {
  tint(255);
  image(predatorReaper, predatorX, predatorY, predatorRadius * 2, predatorRadius * 2);
  tint(255, 255);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(48);
  textFont(aFont);
  textAlign(CENTER, CENTER);
  fill(255);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You exorcised " + preyEaten + " spirits\n";
  gameOverText = gameOverText + "before passing on.\n";
  gameOverText = gameOverText + "Click to retry.";
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

// showScore()
//
// Display the number of prey eaten at the bottom-right of the canvas
function showScore() {
  fill(255);
  textFont(aFont);
  textAlign(RIGHT, BOTTOM);
  textSize(32);
  text("Score:", 450, 500);
  text(preyEaten, 490, 500);
}

// showHealth()
//
// Display the player's current health at the bottom-left of the canvas
function showHealth() {
  fill(255);
  textFont(aFont);
  textAlign(LEFT, BOTTOM);
  textSize(32);
  text("Health:", 0, 500);
  text(playerHealth, 130, 500);
}

// resetGame()
//
// Calls back the setup functions upon (re)starting the game
function resetGame() {
  setupPrey();
  setupPlayer();
  setupPredator();
}

// function mousePressed()
//
// Reset the game when the player clicks their mouse on the Game Over screen
function mousePressed() {
  if (gameOver === true) {
    resetGame();
    playerMaxHealth = 300;
    preyEaten = 0;
    predatorRadius = 40;
    predatorMaxSpeed = 4;
    gameOver = false;
  }
}
