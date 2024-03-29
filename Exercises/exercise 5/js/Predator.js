// Predator
//
// A class that represents simple predators
// controlled by the arrow, WASD and IJKL keys. They can move around
// the screen and consume Prey objects to maintain their health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predators' properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, image, radius, upKey, downKey, leftKey, rightKey, name) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.defaultSpeed = speed;
    this.speed = speed;
    this.sprintSpeed = 10;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.image = image;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    // Checks how many prey were eaten
    this.preyEaten = 0;
    // Name is used for console.log properties
    this.name = name;
  }

  // handleInput
  //
  // Checks if a key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
    // Handling "sprinting" with the H key
    if (keyIsDown(72)) {
      this.speed = this.sprintSpeed;
    } else {
      this.speed = this.defaultSpeed;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      // Also increase the number of prey eaten
      if (prey.health < 0) {
        prey.reset();
        this.preyEaten = this.preyEaten + 1;
        // Adding console log to keep track of the predators' score
        console.log(this.name + ":I've eaten" + this.preyEaten + "prey");
      }
    }
  }

  // display
  //
  // Draw the predator as a designated image
  // with a radius the same size as its current health.
  // The number of eaten prey will also be displayed on its center.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    // Centering image for precise collision
    imageMode(CENTER);
    // Avoids image getting restored to default upon losing all health
    if (this.health > 0) {
      image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    // Displaying the number of prey eaten
    push();
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(this.preyEaten, this.x, this.y);
    pop();
    pop();
  }
}
