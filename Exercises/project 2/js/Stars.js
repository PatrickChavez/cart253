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
  constructor(x, y, speed, fillColor, radius, numStars) {
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
    // Number of stars to be stored
    this.numStars = numStars;
    // The array to store them
    this.starGroup = [];
  }

  // move
  //
  // Makes the stars move based on speed
  // Moves based on the resulting velocity
  // Handles wrapping
  move() {
    // Update position based on velocity
    this.x += this.vx;
    this.y += this.vy;
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
    // Creating a for loop that generates stars for the array
    for (let i = 0; i < this.numStars; i++) {
      this.x;
      this.y;
      this.speed;
      this.fillColor;
      this.radius;
      starGroup.push(stars);
    }
    pop();
  }
}
