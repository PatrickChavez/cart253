// Stars
//
// A class that represents a group of "stars" that move
// on screen horizontally. It is used for
// background effects and array demonstration.

class Stars {

  // constructor
  //
  // Sets the initial values for the Stars' properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = speed;
    this.vy = speed;
    this.speed = speed;
    // General aesthetics
    this.fillColor = fillColor;
    this.radius = radius;
  }

  // move
  //
  // Makes the stars move based on speed
  // Moves based on the resulting velocity
  // Handles wrapping
  move() {
    // Update position based on velocity
    this.x -= this.vx;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the stars have gone off the canvas and
  // wrap them to the other side if so
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
  // Draw the stars as a group of ellipses on the canvas
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
}
