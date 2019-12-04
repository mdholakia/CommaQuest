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
  sceneMargin = (windowWidth - windowWidth/2)/2;
  sceneTopMargin = windowHeight/5;

  sceneBottomMargin = windowHeight - windowHeight/10;
  sceneWidth = windowWidth/2;
  face = new smileyFace(windowWidth/2, windowHeight/2,50);
  frame = new screen();

  mgr = new SceneManager();
  mgr.addScene ( SceneOne );
  mgr.showNextScene();
}

function draw() {
  mgr.draw();
}
