// Snow
//
// A class that represents a background object that emulates the
// movement of falling snow.

class Snow {
  // constructor
  //
  // Sets the initial values for the Snow's properties
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


}
