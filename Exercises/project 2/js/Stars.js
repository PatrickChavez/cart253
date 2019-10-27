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
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // General aesthetics
    this.fillColor = fillColor;
    this.radius = radius;
    // Number of stars to be stored
    this.numStars = numStars;
  }
}
