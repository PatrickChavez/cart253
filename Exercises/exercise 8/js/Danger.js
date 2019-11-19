// Danger
//
// A class that represents a harmful object that drains the
// predator's health. However, it cannot drain health if it's radius is too small.
// It regenerates health, becomes smaller when it comes into contact with a cage and moves with noise.

class Danger {

  // constructor
  //
  // Sets the initial values for the Danger's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = 1000;
    this.ty = 1000;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
  }

  /// move
  //
  // Sets velocity based on the noise() function and the Danger's speed
  // Moves based on the resulting velocity and handles wrapping
  // Regenerates health over time
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Update health
    this.health += 0.1;
    this.health = constrain(this.health, 1, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the Danger has gone off the canvas and
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

  // damage
  //
  // Takes a Predator object as an argument and checks if the Danger
  // overlaps it. If so, reduces the predator's health.
  damage(predator) {
    // Calculate distance from the danger to the predator
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + predator.radius) {
      // Decrease predator health by a good amount
      predator.health = predator.health - 1;
    }
    // The predator takes no damage if the Danger's radius is too low
    if (this.radius <= 20) {
      predator.health = predator.health - 0;
    }
  }

  // display
  //
  // Draw the danger as an ellipse on the canvas
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
}
