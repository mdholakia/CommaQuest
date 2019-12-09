function SceneOne() {
  let faceOne;
  this.preload = () => {

  }

  this.setup = () => {
    faceOne = new smileyFace(windowWidth/2,windowHeight - sceneBottomMargin,50);
  }

  this.draw = () => {
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

    // if ((mouseY < 202) && (mouseY !=0)) {
    //   drawCase = drawCase +1;
    //   textCase = textCase + 1;
    //
    // }

    moveOne(faceOne);
    faceOne.display(null);
  }

  //helper functions

  //For Scene one
  function moveOne(face) {
    face.x = map(mouseX,0,windowWidth, sceneMargin,windowWidth - sceneMargin);
    face.y = mouseY;
    face.radius = map(mouseY,200,windowHeight-200,0,100);


    if(face.radius < 5) {
      //mgr.showNextScene();
      console.log("here we would switch to scene two");
    }

  }


}
