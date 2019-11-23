// Healer
//
// A child class that inherits from Prey.
// It moves across the width of the canvas and heals the predator.

class Healer extends Prey {
  // constructor
  //
  // Sets the initial values for the Healer's properties
  // Either sets default values, uses the arguments provided
  // or inherits the parent class.
  constructor(x, y, speed, image, radius) {
    super(x, y, speed, image, radius);
    // Velocity and speed
    this.vx = speed;
    this.vy = speed;
  }

  // move
  //
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Update position based on velocity
    this.x += this.vx;
    // Handle wrapping and warping
    this.handleWrapping();
    this.warp();
  }

  // warp
  //
  // Moves the Healer to a random position when it
  // reaches the bottom of the screen. The radius also changes.
  warp() {
    if (this.x > width - 4) {
      this.y = random(0, height);
    }
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
  }
}
