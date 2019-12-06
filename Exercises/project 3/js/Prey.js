// Prey
//
// A class that represents a simple prey. It doesn't move, but movement
// variables are implemented for child classes.

class Prey {

  // constructor
  //
  // Sets the initial values for the Prey's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, image, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.image = image;
    this.radius = this.health;
  }

  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
  // wraps it to the other side if so
  // Method unused but preserved for child classes.
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

  // display
  //
  // Draw the prey as a pile of coins on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    // Centering image for precise collision
    imageMode(CENTER);
    this.radius = this.health;
    // Making it so the image doesn't flicker when it disapears
    if (this.health > 0) {
      image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
  }
}
