// Predator-Prey Simulation: Dragonfly Catcher Edition
// by Patrick Chavez-Nadarajah
//
// An expanded version of the Predator-Prey game.
// Story and instructions are found within the game.
//
// Yume/Dream/夢 from Amacha Music Studio
// https://amachamusic.chagasi.com/image_gensouteki.html
//
// Status 1 and 2 from TAM Music Factory
// https://www.tam-music.com/se000_category/game
//
// Icedown1 from TAM Music Factory
// https://www.tam-music.com/se000_category/natural

// Checks to see if the game has started
let playing = false;

// Checks to see if the game is over
let gameOver = false;

// Our predator
let witch;

// The prey and the array storing them
let fly;
let flyArray = [];

// The Danger Zone
let danger;

// The Speedup
let speedGuy;

// The Slowdowns and the array storing them
let slowGuy;
let slowArray = [];

// The stars, their number and the array storing them
let starGroup;
let starArray = [];
let starNumber = 100;

// The title, story, instructions and game over screens
let titleScreen;
let storyScreen;
let instructionsScreen;
let gameOverScreen;
let gameOverScreenTwo;
let gameOverScreenThree;

// The various sounds
let bgMusic;
let preySound;
let speedSound;
let slowSound;

// The background during play
let backgroundGame;

// The Cirkus font
let cFont;

// The images for the characters
let preyImage;
let playerImage;
let speedImage;
let slowImage;
let dangerImage;
let dangerBody;

// preload()
//
// Loads the art assets
function preload() {
  titleScreen = loadImage("assets/images/Title.png");
  gameOverScreen = loadImage("assets/images/GameOver1.png");
  gameOverScreenTwo = loadImage("assets/images/GameOver2.png");
  gameOverScreenThree = loadImage("assets/images/GameOver3.png");
  storyScreen = loadImage("assets/images/StoryScreen.png")
  instructionsScreen = loadImage("assets/images/InstructionsScreen.png");
  backgroundGame = loadImage("assets/images/MoonBackground.png");
  preyImage = loadImage("assets/images/GoldDragonfly.png");
  playerImage = loadImage("assets/images/WitchAvatar.png");
  speedImage = loadImage("assets/images/DragonflyFast.png");
  slowImage = loadImage("assets/images/DragonflySlow.png");
  dangerImage = loadImage("assets/images/Sundew.png");
  dangerBody = loadImage("assets/images/SundewBody.png");
  bgMusic = loadSound("assets/sounds/yume.mp3");
  preySound = loadSound("assets/sounds/icedown1.mp3");
  speedSound = loadSound("assets/sounds/status1.wav");
  slowSound = loadSound("assets/sounds/status2.wav");
  cFont = loadFont("assets/fonts/Cirkus.ttf");
}

// setup()
//
// Sets up a canvas
// Lets the music play
// Creates objects for the variables
function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusic.loop();
  witch = new Predator(100, 100, 5, playerImage, 40);
  danger = new DangerZone(400, 400, 5, dangerImage, 50, dangerBody);
  speedGuy = new Speedup(100, 100, 10, speedImage, 40);
  // Putting a for loop to generate various characters
  for (let i = 0; i < 5; i++) {
    slowGuy = new Slowdown(random(200, width), random(200, height), random(2, 5), slowImage, random(20, 40));
    slowArray.push(slowGuy);
  }
  for (let i = 0; i < 3; i++) {
    fly = new Prey(random(200, width), random(200, height), random(2, 5), preyImage, random(20, 40));
    flyArray.push(fly);
  }
  for (let i = 0; i < starNumber; i++) {
    starGroup = new Stars(random(0, width), random(0, height), 3, color(255, 255, 255, 40), random(1, 20));
    starArray.push(starGroup);
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's
// objects and screens
function draw() {

  if (playing) {

    // Set the moon background
    image(backgroundGame, 0, 0, windowWidth, windowHeight);

    // Handle input for the witch
    witch.handleInput();

    // Move the non array characters
    witch.move();
    danger.move();
    speedGuy.move();

    // Handle the witch "eating" any of the prey
    witch.handleEating(fly);

    // Handle the witch getting faster
    witch.handleSpeedup(speedGuy);

    // Handle the witch getting slower
    witch.handleSlowdown(slowGuy);
    witch.handleSlowdown(slowArray);

    // Handle the danger damaging the witch
    danger.damage(witch);

    // Display all the non array characters
    danger.display();
    witch.display();
    speedGuy.display();

    // Displaying various other characters using a for loop with arrays
    for (let i = 0; i < starArray.length; i++) {
      starArray[i].display();
      starArray[i].move();
    }

    for (let i = 0; i < slowArray.length; i++) {
      slowArray[i].display();
      slowArray[i].move();
    }

    for (let i = 0; i < flyArray.length; i++) {
      flyArray[i].display();
      flyArray[i].move();
    }

    // The game is over once the predator's health reaches 0
    gameOverState();
  } else if (gameOver === false) {
    // Setting the title screen
    image(titleScreen, 0, 0, windowWidth, windowHeight);
  }
}

// resetGame
//
// Restores the objects back to their original positions
// and resets predator health and score
function resetGame() {
  gameOver = false;
  witch = new Predator(100, 100, 5, playerImage, 40);
  danger = new DangerZone(400, 400, 5, dangerImage, 50, dangerBody);
  speedGuy = new Speedup(100, 100, 10, speedImage, 40);

  witch.health = witch.maxHealth;
  witch.preyEaten = 0;
}

// gameOverMessage
//
// Displays a message on the Game Over screen that
// tells the player what their score was
function gameOverMessage() {
  // Setting the text aesthetics
  textFont(cFont);
  textSize(50);
  textAlign(LEFT, BOTTOM);
  fill(255, 240, 0);
  // Setting up the text to display
  let gameOverText;
  gameOverText = "You caught " + witch.preyEaten + " golden dragonflies.\n";
  gameOverText = gameOverText + "Better luck next time!\n";
  gameOverText = gameOverText + "Click to retry.";
  text(gameOverText, 50, 600);
}

// gameOverMessageTwo
//
// Displays another message on the Game Over screen that
// tells the player what their score was
function gameOverMessageTwo() {
  // Setting the text aesthetics
  textFont(cFont);
  textSize(60);
  textAlign(CENTER, TOP);
  fill(255, 240, 0);
  // Setting up the text to display
  let gameOverText;
  gameOverText = "You caught " + witch.preyEaten + " golden dragonflies.\n";
  gameOverText = gameOverText + "Not bad!\n";
  gameOverText = gameOverText + "Click to retry.";
  text(gameOverText, width / 2, 0);
}

// gameOverMessageThree
//
// Displays yet another message on the Game Over screen that
// tells the player what their score was
function gameOverMessageThree() {
  // Setting the text aesthetics
  textFont(cFont);
  textSize(70);
  textAlign(RIGHT, BOTTOM);
  fill(255, 240, 0);
  // Setting up the text to display
  let gameOverText;
  gameOverText = "You caught " + witch.preyEaten + " golden dragonflies.\n";
  gameOverText = gameOverText + "Good job!\n";
  gameOverText = gameOverText + "Click to retry.";
  text(gameOverText, 1300, 600);
}

// gameOver
//
// If the predator's health reaches 0, then the game ends
function gameOverState() {
  if (witch.health === 0) {
    playing = false;
    gameOver = true;
    // A different screen appears depending on the number of prey eaten
    if (witch.preyEaten >= 5) {
      image(gameOverScreenThree, 0, 0, windowWidth, windowHeight);
      // Show Game Over text
      gameOverMessageThree();
    } else if (witch.preyEaten >= 2) {
      image(gameOverScreenTwo, 0, 0, windowWidth, windowHeight);
      // Show Game Over text
      gameOverMessageTwo();
    } else {
      image(gameOverScreen, 0, 0, windowWidth, windowHeight);
      // Show Game Over text
      gameOverMessage();
    }
  }
}


// mousePressed()
//
// Allows the game to start upon clicking the screen
function mousePressed() {
  if (!playing) {
    playing = true;
    resetGame();
  }
}
