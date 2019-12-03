// MiniDanger
//
// A child class that inherits from Danger. It moves downward.

class MiniDanger extends Danger {
  // constructor
  //
  // Sets the initial values for the MiniDanger's properties
  // Either sets default values, uses the arguments provided
  // or inherits the parent class.
  constructor(x, y, speed, image, radius) {
    super(x, y, speed, image, radius);
    this.vx = speed;
    this.vy = speed;
  }

  // move
  //
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Update position based on velocity
    this.y += this.vy;
    // Update health
    this.health += 0.2;
    this.health = constrain(this.health, 1, this.maxHealth);
    // Handle wrapping and warping
    this.handleWrapping();
    this.warp();
  }


  // warp
  //
  // Moves the Minidanger to a random position when it
  // reaches the bottom of the screen. The radius and speed also changes.
  warp() {
    if (this.y >= height - 3) {
      this.x = random(0, width);
      this.radius = random(30, 40);
      this.speed = random(1, 3);
    }
  }

  // display
  //
  // Draw the prey as a blue wisp on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    // Centering image for precise collision
    imageMode(CENTER);
    this.radius = this.health;
    // Making it so the image doesn't flicker when it disapears or warps
    if (this.health > 0 && this.y < height - 5) {
      image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    pop();
  }
}
