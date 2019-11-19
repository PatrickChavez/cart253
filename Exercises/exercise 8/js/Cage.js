// Cage
//
// A class that represents a harmful object enclosing the predator that drains the
// predator's health. It can move with the WASD keys.

class Cage {

  // constructor
  //
  // Sets the initial values for the Cage's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Display properties
    this.fillColor = fillColor;
    this.defaultColor = fillColor;
    this.secondColor = color(0, 0, 255);
    // The radius
    this.radius = radius;
    // Input properties
    this.upKey = 87; // W key
    this.downKey = 83; // S key
    this.leftKey = 65; // A key
    this.rightKey = 68; // D key
    // Array properties
    this.array = [];
    // Color changing properties
    this.redMode = true;
    this.changedMode = false;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
    // The spacebar toggles the cage's different modes
    // to handle two colors for one button
    if (keyIsDown(32) && this.changedMode === false) {
      this.redMode = !this.redMode;
      this.changedMode = true;
    }
    else if (keyIsDown(32) === false) {
      this.changedMode = false;
    }
    // The color changes if the spacebar is pressed
    if (this.redMode) {
      this.fillColor = this.defaultColor;
    }
    else {
      this.fillColor = this.secondColor;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the Cage has gone off the canvas and
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

  // // handleEating
  // //
  // // Takes a Danger object as an argument and checks if the Cage
  // // overlaps it. If so, reduces the prey's health and constrains it.
  // handleEating(danger) {
  //   // Calculate distance from this cage to the prey
  //   let d = dist(this.x, this.y, danger.x, danger.y);
  //   // Check if the distance is less than their two radii (an overlap)
  //   if (d < this.radius + danger.radius) {
  //     // Decrease prey health and constrain it
  //     danger.health -= 1;
  //     danger.health = constrain(danger.health, 1, danger.radius);
  //   }
    // for (let i = 0; i < this.array.length; i++) {
    //   // Calculate distance from the trail to the predator
    //   let d = dist(this.array[i].x, this.array[i].y, danger[i].x, danger[i].y);
    //   // Check if the distance is less than their two radii (an overlap)
    //   if (d < this.radius + danger[i].radius) {
    //     // Decrease prey health and constrain it
    //     danger[i].health -= 1;
    //     danger[i].health = constrain(danger[i].health, 1, danger[i].radius);
    //   }
    // }
  // }

  // handleEating
  //
  // Takes a Danger object as an argument and checks if a Cage with the
  // default color overlaps it. If so, reduces the prey's health and constrains it.
  handleEating(danger) {
    // If statement to handle the method
    if (this.fillColor === this.defaultColor) {
    // Calculate distance from this cage to the prey
    let d = dist(this.x, this.y, danger.x, danger.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + danger.radius) {
      // Decrease prey health and constrain it
      danger.health -= 1;
      danger.health = constrain(danger.health, 1, danger.radius);
      }
    }
    // Else the danger receives no health loss
    else {
      danger.health -= 0;
      danger.health = constrain(danger.health, 1, danger.radius);
    }
  }

  // changedEating
  //
  // Takes a Danger object as an argument and checks if a Cage with another color
  // overlaps it. If so, reduces the prey's health and constrains it.
  changedEating(danger) {
    // If statement to handle the method
    if (this.fillColor === this.secondColor) {
    // Calculate distance from this cage to the prey
    let d = dist(this.x, this.y, danger.x, danger.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + danger.radius) {
      // Decrease prey health and constrain it
      danger.health -= 1;
      danger.health = constrain(danger.health, 1, danger.radius);
      }
    }
    else {
      danger.health -= 0;
      danger.health = constrain(danger.health, 1, danger.radius);
    }
  }
  // damage
  //
  // Takes a Predator object as an argument and checks if the Cage
  // overlaps it. If so, reduces the predator's health.
  damage(predator) {
    // Calculate distance from the cage to the predator
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + predator.radius) {
      // Decrease predator health by a good amount
      predator.health = predator.health - 1;
    }
  }

  // display
  //
  // Draw the Cage as an ellipse on the canvas
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
}
