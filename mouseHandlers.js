
//mouseHandlers.js includes all functions which reference our mouseX & mouse Y 
function mouseClicked() {
  getCoord();

  console.log(inBounds(mouseX,mouseY));

  if (drawCase == 1) {
    mouseClickedSceneOne();
  }

}

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

function getCoord() {
  console.log(mouseX);
  console.log(mouseY);
}

//checks if the cursor is inside a bounding box defined by it's upper left and bottom right points
function mouseOver(x1,y1,x2,y2) {
if( (mouseX > x1) && (mouseX <x2) && (mouseY > y1) && (mouseY <y2))
{

  return true;

}


      else {
        //console.log("no we're not on it");
        return false;

  }

}

//multiple checks to whether the face should be displayed
function  displayCheck() {
    //if in bounds
    if (!inBounds(mouseX,mouseY)) {
      return false;
    }
    //if scene is with trees in which case add that

    if ((drawCase == 1 && mouseY < 792) || !(inBounds(mouseX,mouseY))) {
      console.log("im here");
      return false;
    }

    return true;

  }

function mouseClickedSceneOne() {
  if((mouseX < specialTreeX + 50) && (mouseX > specialTreeX - 50) && !fruit.fallen) {
    fruit.fall();
  }

  //testing if you are eating the fruit
  else if(fruit.fallen && Math.abs(mouseX - fruit.x) < 50 && Math.abs(mouseY - fruit.y) < 50) {
    console.log("Eating fruit");
    face.leftEye = true;
    fruit.eaten = true;
  }
}
