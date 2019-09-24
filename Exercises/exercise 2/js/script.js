/******************************************************

Game - The Artful Dodger: Diving Edition
Patrick Chavez-Nadarajah

An expansion of the simple dodging game with keyboard
controls
The Prince Valiant font was obtained from
https://www.dafont.com/prince-valiant.font
******************************************************/

// The position and size of our avatar diver
let avatarX;
let avatarY;
let avatarSize = 50;

// The speed and velocity of our avatar diver
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy angler
let enemyX;
let enemyY;
let enemySize = 50;

// The speed and velocity of our enemy angler
let enemySpeed = 5;
let enemyVX = 5;

// How many dodges the player has made
let dodges = 0;

// Setting the variable of the Prince Valiant font
let pvFont;

// Setting the look of the avatar
let diver;

// Setting the look of the enemy
let angler;

// Setting the look of the backgrounds
let sea1;
let sea2;
let sea3;
let sea4;

// preload()
//
// Load the fonts and images
function preload() {
  pvFont = loadFont("assets/fonts/Prince Valiant.ttf");
  diver = loadImage("assets/images/Diver.png");
  angler = loadImage("assets/images/Angler.png");
  sea1 = loadImage("assets/images/Sea 1.png");
  sea2 = loadImage("assets/images/Sea 2.png");
  sea3 = loadImage("assets/images/Sea 3.png");
  sea4 = loadImage("assets/images/Sea 4.png");
}

// setup()
//
// Make the canvas, position the avatar and enemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A sea background
  image(sea1,0,0);

  // Change the background after every 10 points
  if (dodges >= 10){
    image(sea2,0,0);
    if (dodges >= 20){
      image(sea3,0,0);
      if (dodges >= 30){
        image(sea4,0,0);
      }
    }
  }

  // Reset to default background if player loses
  else{
    image(sea1,0,0);
  }

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
    // Reset the enemy's size to its original variable
    enemySize = 50;
    // Reset the enemy's speed to its original variable
    enemySpeed = 5;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
    enemySize = 50;
    enemySpeed = 5;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // The enemy's size will increase after a dodge
    enemySize = enemySize + 2.5;
    // The enemy's speed will increase after a dodge
    enemySpeed = enemySpeed + 0.2;
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
  }

  // Display the number of successful dodges in the console
  console.log(dodges);

  // The avatar is a diver
  image(diver,avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is an angler
  image(angler,enemyX,enemyY,enemySize,enemySize);

  // Display the number of dodges at the top-right corner of
  // the canvas in a fancy font
  fill(255);
  textFont(pvFont);
  textAlign(RIGHT,TOP);
  textSize(44);
  text("SCORE:",400,0);
  text(dodges,450,0);
}
