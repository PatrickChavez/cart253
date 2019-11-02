// DangerZone
//
// A class that represents a harmful area that saps the player's health
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
    // An array to display a trail of danger zones
    this.trail = [];
    // Setting up a for loop to generate the number of trail "bits"
    for (let i = 0; i < 50; i++) {
      let location = {
        x: this.x,
        y: this.y,
      };
      this.trail.push(location);
    }
  }

  // move
  //
  // Makes the Danger Zone move based on its speed
  // Moves based on the resulting velocity
  // It also bounces around the canvas by reversing its velocity
  // The trail follows the previous "unit's" movements
  move() {
    // Update position based on velocity
    this.x += this.vx;
    this.y += this.vy;

    // Move all trail positions along by one
    for (let i = this.trail.length - 1; i >= 1; i--) {
      this.trail[i].x = this.trail[i - 1].x;
      this.trail[i].y = this.trail[i - 1].y;
    }
    // Set the trail element closest to the "core" to the core's previous location
    this.trail[0].x = this.x;
    this.trail[0].y = this.y;

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
    // Calculate distance from the predator to the prey
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + predator.radius) {
      // Decrease predator health by a large amount
      predator.health = predator.health - 1;
    }
  }

  // display
  //
  // Draw the Danger Zone as a group of ellipses on the canvas
  display() {
    push();
    noStroke();
    // The trail gets a different color
    push();
    for (let i = 0; i < this.trail.length; i++) {
      fill(100, 0, 0);
      ellipse(this.trail[i].x, this.trail[i].y, this.radius * 2);
    }
    pop();
    fill(this.fillColor);
    ellipse(this.x,this.y,this.radius * 2);
    pop();
  }
}
