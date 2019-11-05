let state; // TITLE, INSTRUCTIONS, PLAY, GAMEOVER

function setup() {
  state = "TITLE";
}

function draw() {
  if (state === "TITLE") {
    displayTitle();
  }
  else if (state === "INSTRUCTIONS") {
    displayInstructions();
  }
}

function mousePressed() {
  if (state === "TITLE") {
    state = "INSTRUCTIONS";
  }
  else (state === "INSTRUCTIONS") {
    state = "PLAY";
  }
}
