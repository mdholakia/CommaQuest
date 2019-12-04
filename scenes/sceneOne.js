function SceneOne() {
  this.preload = () => {

  }

  this.setup = () => {

  }

  this.draw = () => {
    clear();
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

    face.moveShrink();
      noCursor();
    face.display(null);
  }
}
