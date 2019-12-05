function preload() {
}

//scene manager
var mgr;
var backgroundColor;
var sceneWidth;
var sceneMargin;
var sceneTopMargin;
var sceneBottomMargin;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(245, 240, 228);
  sceneMargin = (windowWidth - windowWidth/2)/2;
  sceneTopMargin = windowHeight/5;
  sceneBottomMargin = windowHeight - windowHeight/10;
  sceneWidth = windowWidth/2;
  face = new smileyFace(windowWidth/2, windowHeight/2,50);
  frame = new screen();

  mgr = new SceneManager();
  mgr.addScene ( SceneOne );
  mgr.addScene ( SceneTwo );
  mgr.addScene ( SceneThree );
  mgr.showNextScene();
  mgr.showNextScene();
  mgr.showNextScene();
}

function draw() {
  mgr.draw();
}

//sketch global helpers

function inBounds(x,y) {
  var bound;
  if (x < sceneMargin || x> sceneMargin + sceneWidth || y > sceneBottomMargin || y < sceneTopMargin) {

    bound = false;
  }
  else {
    bound = true;
  }

return bound;
}

function mouseClicked() {

  mgr.handleEvent("mouseClicked");
}
