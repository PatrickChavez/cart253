// Circle variables set
let CircleX = 0;
let CircleY = 0;
let CircleWidth = 1;
let CircleHight = 1;

function setup() {
// Canvas and background set
createCanvas(500,500);
background(76,237,84);

}

function draw() {

  // Strokes removed for less awkwardness
  noStroke();
  // Circle color picked
  fill(255);
  // Circle created
  ellipse(CircleX,CircleY,CircleWidth,CircleHight);

// Circle will move south
CircleX = CircleX + 2;
CircleY = CircleY + 2;
// Circle will grow in size
CircleWidth = CircleWidth + 5;
CircleHight = CircleHight + 5;
}
