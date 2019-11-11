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
  }

  // move
  //
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Update position based on velocity
    this.y += this.vy;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the MiniDanger has gone off the canvas and
  // wraps them to the other side if so
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
}
