// Healer
//
// A child class that inherits from Prey.
// It moves across the width of the canvas, regenerates its health
// and heals the predator.

class Healer extends Prey {
  // constructor
  //
  // Sets the initial values for the Healer's properties
  // Either sets default values, uses the arguments provided
  // or inherits from the parent class.
  constructor(x, y, speed, image, radius) {
    super(x, y, speed, image, radius);
    // Velocity and speed
    this.vx = speed;
    this.vy = speed;
  }

  // move
  //
  // Moves based on the resulting velocity, regenerates and handles wrapping.
  move() {
    // Update position based on velocity
    this.x += this.vx;
    // Update health
    this.health += 0.1;
    this.health = constrain(this.health, 1, this.maxHealth);
    // Handle wrapping and warping
    this.handleWrapping();
    this.warp();
  }

  // warp
  //
  // Moves the Healer to a random position when it reaches
  // the width of the canvas.
  warp() {
    if (this.x > width - 4) {
      this.y = random(0, height);
    }
  }

  // display
  //
  // Draw the prey as a green wisp on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    // Centering image for precise collision
    imageMode(CENTER);
    this.radius = this.health;
    // Making it so the image doesn't flicker when it disapears or warps
    if (this.health > 0 && this.x < width - 6) {
      image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health and
  // radius back to default.
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
