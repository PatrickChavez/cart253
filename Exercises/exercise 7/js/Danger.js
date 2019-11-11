// Danger
//
// A class that represents a harmful object that drains the
// predator's health. It can move.

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
    this.vx = speed;
    this.vy = speed;
    this.speed = speed;
    // Display properties
    this.fillColor = fillColor;
    // The radius
    this.radius = radius;
  }

  // move
  //
  // Sets movement based on the Danger's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Check for collisions with top or bottom of the canvas
   if (this.y < 0 || this.y > height) {
     // It hit so reverse velocity
     this.vy = -this.vy;
   }
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
}
