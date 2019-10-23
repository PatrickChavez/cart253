// DangerZone
//
// A class that represents a harmful cage that saps the player's health
// if they come into contact with it.
// It bounces around the canvas.

class DangerZone {
  // constructor
  //
  // Sets the initial values for the Danger Zone's properties
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
    this.radius = radius;
  }

  // move
  //
  // Makes the Danger Zone move based on its speed
  // Moves based on the resulting velocity
  // It also bounces around the canvas by reversing its velocity
  move() {
    // Update position based on velocity
    this.x += this.vx;
    this.y += this.vy;
    // Check for collisions with top or bottom of the canvas
    if (this.y < 0 || this.y > height) {
      // It hit so reverse velocity
      this.vy = -this.vy;
    }
    // Check for collisions with the left or right of the canvas
    if (this.x < 0 || this.x > width) {
      // It hit so reverse velocity
      this.vx = -this.vx;
    }
  }

  // handleEating
  //
  // Takes a Predator object as an argument and checks if the Danger Zone
  // overlaps it. If so, greatly reduces the predator's health.
  damage(predator) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + predator.radius) {
      // Decrease predator health by a large amount
      predator.health = predator.health - 2;
    }
  }

  // display
  //
  // Draw the Danger Zone as an ellipse on the canvas
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
}
