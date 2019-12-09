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
  frame = new screen();

  mgr = new SceneManager();
  mgr.addScene ( SceneOne );
  mgr.addScene ( SceneTwo );
  mgr.addScene ( SceneThree );
  mgr.addScene ( SceneFour );
  mgr.addScene ( SceneFive );

  mgr.showNextScene();

}

function draw() {
  clear();
  background(backgroundColor);
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



//multiple checks to whether the face should be displayed
function  displayCheck() {
    //if in bounds
    if (!inBounds(mouseX,mouseY)) {
      return false;
    }

    return true;

  }


function mouseClicked() {

  mgr.handleEvent("mouseClicked");
}

function keyPressed()
{
    // You can optionaly handle the key press at global level...
    switch(key)
    {
        case '1':
            mgr.showScene( SceneOne );
            break;
        case '2':
            mgr.showScene( SceneTwo );
            break;
        case '3':
            mgr.showScene( SceneThree );
            break;
        case '4':
            mgr.showScene( SceneFour );
            break;
        case '5':
            mgr.showScene( SceneFive );
            break;
    }

    // ... then dispatch via the SceneManager.
    mgr.handleEvent("keyPressed");
}
