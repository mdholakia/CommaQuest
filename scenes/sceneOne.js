function SceneOne() {
  let faceOne;
  let footStep;
  this.preload = () => {

  }

  this.setup = () => {
    faceOne = new smileyFace(displayWidth/2,sceneBottomMargin,50);
    startSound(soundOne);
    startSound(soundOne_orchestra);
    soundOne.setVolume(.08)
    soundOne_orchestra.setVolume(.02);
    footStep = 0;

  }



  this.draw = () => {

    soundOne_orchestra.setVolume(map(faceOne.y,200,displayHeight-200,0,.02));

    // soundOne_rustle.pause();
    // moveOneSound(faceOne);
    textDisplay("You wake up, you remember nothing. You are in a field and the field goes on forever. You begin to walk.");
    textFont("Stoke");
    var noiseAmp = 24;
    var hSpace = 24;
    var vSpace = 24;
    var row;
    var itemsInRow = 50;
    var startPoint = sceneMargin;
    for(var i = 0; i < 2000; i++ ) {

      row = floor(i/itemsInRow);
      var size = 2+row*2;
      var x = (i%itemsInRow)*hSpace + startPoint;
      var y = displayHeight/4 + vSpace*row + noise(i)*noiseAmp;

      if(inBounds(x,y)){
      drawPunct('"',size,x,y,0);
      }
    }
    moveOne(faceOne);
    faceOne.display(null);
  }

  //For Scene one
  // function moveOneSound(face) {
  //   if(keyIsPressed) {
  //     console.log("do we get here");
  //     if(soundOne_rustle.isPlaying()) {
  //
  //     }
  //     else {
  //       soundOne_rustle.loop();
  //     }
  //   }
  //   else {
  //     soundOne_rustle.pause();
  //   }
  //   soundOne_rustle.setVolume(map(face.y,200,displayHeight-200,0,.25),.2);
  //
  //   //
  //   // soundOne_footOne.setVolume(map(face.y,200,displayHeight-200,0,.3),.2);
  //   // soundOne_footTwo.setVolume(map(face.y,200,displayHeight-200,0,.3),.2);
  //   // if(footStep == 0 && soundOne_footOne.isPlaying()==false && soundOne_footTwo.isPlaying()== false ) {
  //   //   soundOne_footOne.play();
  //   //   footStep = 1;
  //   // }
  //   // else {
  //   //   if(footStep ==1 && soundOne_footTwo.isPlaying()== false && soundOne_footOne.isPlaying() == false)
  //   //   soundOne_footTwo.play();
  //   //   footStep = 0;
  //   // }
  // }
  function moveOne(face) {
      if (keyIsDown(LEFT_ARROW)) {

        face.x -= 4;

      }
      if (keyIsDown(RIGHT_ARROW)) {
        face.x += 4;
      }
      if (keyIsDown(UP_ARROW)) {
        face.y -= 4;

      }
      if (keyIsDown(DOWN_ARROW)) {
        face.y += 4;
      }

    face.radius = map(face.y,200,displayHeight-200,0,100);
    //switch to scene Two
    if ((faceOne.radius < 2) && (faceOne != undefined)) {
      stopSound(soundOne)
      stopSound(soundOne_orchestra);
      mgr.showNextScene();
    }

  }
}
