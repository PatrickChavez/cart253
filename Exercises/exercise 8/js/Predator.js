// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = 255;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 3;
    // Display properties
    this.fillColor = fillColor;
    this.radius = radius;
    // Input properties
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;
    // The number of prey eaten
    this.preyEaten = 0;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;

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
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
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
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      // Also increase the number of prey eaten
      if (prey.health < 0) {
        prey.reset();
        this.preyEaten += 1;
      }
    }
  }

  // handleHealing
  //
  // Takes a Healer object as an argument and checks if the predator
  // overlaps it. If so, reduces the Healer's health and increases
  // the predator's. If the Healer dies, it gets reset.
  handleHealing(healer) {
    // Calculate distance from this predator to the healer
    let d = dist(this.x, this.y, healer.x, healer.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + healer.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      healer.health -= this.healthGainPerEat;
      // Check if the healer died and reset it if so
      if (healer.health < 0) {
        healer.reset();
      }
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas.
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
    // Displaying health.
    this.displayHealth()
  }

  // displayHealth
  //
  // Displays a health bar on top of the predator.
  // The color changes based on the the amount left.
  displayHealth() {
    push();
    rectMode(CENTER);
    // Health will be red at critical levels
    if (this.health <= 85) {
      fill(255, 0 , 0);
    }
    // Health will be yellow at medium levels
    else if (this.health <= 168) {
      fill(255, 220, 0);
    }
    // Health is green otherwise
    else {
      fill(0, 255, 0);
    }
    rect(this.x, this.y - this.radius * 2, this.health, 30);
    pop();
  }
}
