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
  constructor(x, y, speed, image, health) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = health;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.image = image;
    this.radius = 40; // Determines the size of the predator
    // Input properties
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;
    // Checks how many prey were eaten
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
  // The number of prey eaten also gets increased.
  handleEating(prey, danger) {
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
      // Increase the number of prey eaten and play a sound effect
      if (prey.health < 0) {
        preySound.play();
        prey.reset();
        this.preyEaten = this.preyEaten + 1;
        danger.speed = danger.speed + 0.2;
      }
    }
  }

  // handleSpeedup
  //
  // Takes a Speedup object as an argument and checks if the predator
  // overlaps it. If so, reduces the Speedup's health.
  // If the Speedup dies, it gets reset.
  handleSpeedup(speedup) {
    // Calculate distance from this predator to the Speedup
    let d = dist(this.x, this.y, speedup.x, speedup.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + speedup.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Gradually decrease Speedup health
      speedup.health -= this.healthGainPerEat;
      // Check if the Speedup died and reset it if so
      if (speedup.health < 0) {
        speedup.reset();
        // Increase predator speed and constrain it to its possible range
        this.speed = this.speed + 5;
        this.speed = constrain(this.speed, 5, 20);
        // Play a sound
        speedSound.play();
        // Keeping track of the predator's speed
        console.log("My speed is " + this.speed);
      }
    }
  }

  // handleSlowdown
  //
  // Takes a Slowdown object as an argument and checks if the predator
  // overlaps it. If so, reduces the Slowdown's health.
  // If it dies, it gets reset.
  handleSlowdown(slowdown) {
    // Calculate distance from this predator to the Slowdown
    let d = dist(this.x, this.y, slowdown.x, slowdown.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + slowdown.radius) {
      // Gradually decrease Slowdown health
      slowdown.health -= this.healthGainPerEat;
      // Check if the Slowdown died and reset it if so
      if (slowdown.health < 0) {
        slowdown.reset();
        // Decrease predator speed and constrain it to its possible range
        this.speed = this.speed - 2;
        this.speed = constrain(this.speed, 5, 40);
        // Play a sound
        slowSound.play();
        // Keeping track of the predator's speed
        console.log("My speed is" + this.speed);
      }
    }
  }

  // display
  //
  // Draw the predator as a witch on the canvas with a fixed radius.
  display() {
    push();
    noStroke();
    // Centering image for precise collision
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
    this.displayHealth();
    this.displayScore();
  }

  // displayHealth
  //
  // Shows a health bar on top of the predator
  displayHealth() {
    // The color changes based on the number of health left
    rectMode(CENTER);
    noFill();
    if (this.health < 13.2) {
      fill(255, 0, 0);
    } else if (this.health < 26.4) {
      fill(255, 255, 0);
    } else {
      fill(0, 255, 0);
    }
    rect(this.x, this.y - this.radius * 2, this.health * 4, 20);
  }

  // displayScore
  //
  // Shows the number of prey eaten on top of the predator
  displayScore() {
    // The text is white and is displyed at the center
    textFont(cFont);
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text(this.preyEaten, this.x, this.y - this.radius - 15);
  }
}
