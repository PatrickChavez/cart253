class Ball {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 3;
    this.vy = 3;
    this.trail = [];

    for (let i = 0; i < 100; i++) {
      let location = {
        x: this.x,
        y: this.y
      };
      this.trail.push(location);
    }
  }

  update() {
    // Move all trail positions along by one
    for (let i = this.trail.length - 1; i >= 1; i--) {
      this.trail[i].x = this.trail[i - 1].x;
      this.trail[i].y = this.trail[i - 1].y;
    }

    // Set the trail element closest to the ball to the ball's previous location
    this.trail[0].x = this.x;
    this.trail[0].y = this.y;

    // Update the ball's position
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y > height) {
      this.vy = -this.vy;
    }
  }

  display() {
    rectMode(CENTER);
    noStroke();

    for (let i = 0; i < this.trail.length; i++) {
      fill(100, 100, 50);
      rect(this.trail[i].x, this.trail[i].y, 20, 20);
    }

    fill(255);
    rect(this.x, this.y, 20, 20);

  }

}
