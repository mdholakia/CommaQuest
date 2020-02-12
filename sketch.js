let titleCard;
let buttonBegin;
let soundTwo;
let soundTwo_footsteps;
function preload() {
  titleCard = loadImage('Assets/TitleCard_OneLine.png')
  buttonBegin = loadImage('Assets/Button_Begin.png')
  soundFormats('wav', 'ogg');
  soundTwo = loadSound('Assets/two.wav');
  soundTwo_footsteps = loadSound('Assets/Footsteps.wav');
  // soundTwo_footsteps.playMode('sustain');

}

//scene manager
var mgr;
var backgroundColor;
var sceneWidth;
var sceneMargin;
var sceneTopMargin;
var sceneBottomMargin;

function setup() {
  createCanvas(displayWidth, displayHeight);
  colorMode(RGB,255);
  backgroundColor = color(255, 254, 245);
	sceneMargin = (displayWidth - displayWidth/2)/2;
  sceneTopMargin = displayHeight/5;
  sceneBottomMargin = displayHeight - displayHeight/10;
  sceneWidth = displayWidth/2;
  frame = new screen();

  mgr = new SceneManager();
  mgr.addScene ( SceneOpening );
  mgr.addScene ( SceneOne );
  mgr.addScene ( SceneTwo );
  mgr.addScene ( SceneThree );
  mgr.addScene ( SceneFour );
  mgr.addScene ( SceneFive );

  mgr.showNextScene();

}

function draw() {

  clear();
  //using the get() is fucking up our color mode somehow, so we're just going to put one at the top so that the scene starts with the weird color mode
  let fakeColor = color(get(0,0));

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
function  displayCheck(face) {
    //if in bounds
  if (!inBounds(face.x,face.y)) {
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
        case '6':
            mgr.showScene( SceneOpening );
            break;

    }

    // ... then dispatch via the SceneManager.
    mgr.handleEvent("keyPressed");
}

function fadeOut() {
  console.log("fadeout")
  background(color(0,0,0));
}

function textDisplay(string) {
  var textBoxSize= 700;
  textSize(28);
  noStroke();
  fill(0);
  textAlign(LEFT);
  //Text will be drawn this far from the bottom
  var marginBottom = displayHeight/8;
  //text-dependent on case:
  textFont("IM Fell Double Pica");
  text(string,displayWidth/2 - textBoxSize/2, marginBottom * 3/4,textBoxSize);

}

function startSound(sound) {
sound.setVolume(0.1);
sound.loop();
}

function stopSound (sound) {
  sound.fade(0,.75);
}
