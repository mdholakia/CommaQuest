function SceneOne() {
  let faceOne;
  this.preload = () => {

  }

  this.setup = () => {
    faceOne = new smileyFace(windowWidth/2,sceneBottomMargin,50);
  }

  this.draw = () => {
    textDisplay("You wake up, you remember nothing. You are in a field and the field goes on forever. You begin to walk.");
    var noiseAmp = 24;
    var hSpace = 24;
    var vSpace = 24;
    var row;
    var itemsInRow = 50;
    /*465 is the lenght of the field with these variables*/
    var startPoint = sceneMargin;
    textFont("Stoke");
    for(var i = 0; i < 2000; i++ ) {

      row = floor(i/itemsInRow);
      var size = 2+row*2;
      var x = (i%itemsInRow)*hSpace + startPoint;
      var y = windowHeight/4 + vSpace*row + noise(i)*noiseAmp;

      if(inBounds(x,y)){
      drawPunct('"',size,x,y,0);
      }
    }



    moveOne(faceOne);
    faceOne.display(null);
  }

  //helper functions

  //For Scene one
  function moveOne(face) {
    // face.x = map(mouseX,0,windowWidth, sceneMargin,windowWidth - sceneMargin);
    // face.y = mouseY;

      if (keyIsDown(LEFT_ARROW)) {
        face.x -= 3;
      }

      if (keyIsDown(RIGHT_ARROW)) {
        face.x += 3;
      }

      if (keyIsDown(UP_ARROW)) {
        face.y -= 3;
      }

      if (keyIsDown(DOWN_ARROW)) {
        face.y += 3;
      }

    face.radius = map(face.y,200,windowHeight-200,0,100);

    //switch to scene Two
    if ((faceOne.radius < 2) && (faceOne != undefined)) {
      mgr.showNextScene();
    }


  }


}
