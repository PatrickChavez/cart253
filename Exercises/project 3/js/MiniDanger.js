// MiniDanger
//
// A child class that inherits from Danger.
// It moves downward and "might" come in different sizes.

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
    // this.x -= this.vx;
    this.y += this.vy;
    // Update health
    this.health += 0.2;
    this.health = constrain(this.health, 1, this.maxHealth);
    // Handle wrapping and warping
    this.handleWrapping();
    this.warp();
  }


  // damage
  //
  // Takes a Predator object as an argument and checks if the Mini Danger
  // overlaps it. If so, reduces the predator's health.
  damage(predator) {
    // Calculate distance from the danger to the predator
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + predator.radius) {
      // Decrease predator health by a good amount
      // The predator takes no damage if the Danger's radius is too low
      if (this.radius >= 30) {
        predator.health = predator.health - 1;
      }
    }
  }


  // warp
  //
  // Moves the mini danger to a random position when it
  // reaches the bottom of the screen. The radius and speed also changes.
  warp() {
    if (this.y >= height - 3) {
      this.x = random(0, width);
      this.radius = random(30, 40);
      this.speed = random(1, 5);
    }
  }
}
