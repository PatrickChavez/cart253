// MiniDanger
//
// A child class that inherits from Danger.
// It moves downward and comes in different sizes.

class MiniDanger extends Danger {
  // constructor
  //
  // Sets the initial values for the MiniDanger's properties
  // Either sets default values, uses the arguments provided
  // or inherits the parent class.
  constructor(x, y, speed, fillColor, radius) {
    super(x, y, speed, fillColor, radius);
    this.vx = speed;
    this.vy = speed;
  }

  // move
  //
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Update position based on velocity
    this.y += this.vy;
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
      predator.health = predator.health - 0.5;
    }
  }

  // display
  //
  // Draw the danger as an ellipse on the canvas
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }

  // warp
  //
  // Moves the mini danger to a random position when it
  // reaches the bottom of the screen. The radius and speed also changes.
  warp() {
    if (this.y > height - 4) {
      this.x = random(0, width);
      this.radius = random(10, 40);
      this.speed = random(3, 8);
    }
  }
}
