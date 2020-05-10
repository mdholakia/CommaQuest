function SceneThree() {
var mountainWidth;
var cometTimer;
let facethree;
let starOffX;
let starOffY;
var sceneExitDelay;
let xOff;
const stars = []

  this.preload = () => {

  }

  this.setup = () => {
    xOff = mouseX;
    for (let i = 0; i < 100; i++) {
        stars.push({
        x: random(0, displayWidth),
        y: random(0, displayHeight)
        })
    }
  faceThree = new smileyFace(sceneMargin - 40,sceneBottomMargin, 30);
  cometTimer = 0;
  mountainWidth = displayWidth - 2*sceneMargin;
  starOffX = 0;
  starOffY = 0;
  startSound(soundThree_sea);
  soundOne_orchestra.loop()
  soundOne_orchestra.setVolume(.003);
  soundThree_lullaby.loop();
  // soundThree_chatter.loop();
  }


  this.draw = () => {

    let nightColor = color(10, 0, 10);

    const interpolationFactor = getLerpFactor(faceThree.x, displayWidth / 2, mountainWidth)
    soundThree_lullaby.setVolume(map(interpolationFactor,0,1,0,0.3))


    if(faceThree.x < displayWidth/2) {
      soundThree_sea.setVolume(map(interpolationFactor,0,1,.1,0))
    }
    else {
      soundThree_sea.setVolume(.02)


    }


    let skyColor = lerpColor(backgroundColor,nightColor,interpolationFactor)
    background(skyColor);

    textDisplay("The mountains are like a bridge to the sky. You feel tiny by comparison. You want to stop, to lie down in their shadow, but something calls you forward.");

    textFont("Amatic SC")
    let x = displayWidth/2 - sceneMargin;
    let y = displayHeight/2;
    let size = 800





      randomSeed(4);

      colorMode(RGB, 255, 255, 255, 1);
      const numOfStars = interpolationFactor * 100
      noStroke();
      for(var i = 0; i < numOfStars; i++) {
        const star = stars[i]
        colorMode(RGB, 255, 255, 255, 1);
        fill(255, 255, 255);
        circle(star.x,star.y,random(0,3));
      }



      randomSeed(10);
      for (let x = sceneMargin; x < displayWidth - sceneMargin; x+=1) {
        const yMap = map(getLerpFactor(x,displayWidth/2,mountainWidth), 0, 1, 0, Math.PI / 2)
        const y = displayHeight - Math.sin(yMap) * 400 - 50
        // draw punc at x, y

        let mountainColor = color(3 + map(mouseY,0,displayHeight,0,30), random(40,70) + map(mouseY,0,displayHeight,0,30), random(40,70) - map(mouseY,0,displayHeight,0,20));
        drawPunct("^",round(random(50,70)),x - 10,random(y ,displayHeight),mountainColor)
      }

    faceThree.leftEye= true;
    angleMode(RADIANS);
    faceThree.display(25);
    moveThree(interpolationFactor, faceThree);

    cometTime(faceThree, skyColor);
    nextScene(faceThree);

  }

  this.mouseClicked = () => {


  }

  //helper Functions

  function getLerpFactor(xPos, center, mountainWidth) {
    const distToCenter = Math.abs(xPos - center)
    const withinMountain = distToCenter < mountainWidth / 2
    if (withinMountain) {
      let ratio = (1 - distToCenter / (mountainWidth / 2));
      let sinRatio = map(ratio,0,1,0,PI/2);
      return Math.sin(sinRatio);
    }
    return 0
  }

function nextScene(face) {
  if(face.x >= displayWidth*.98) {
      if(sceneExitDelay ===undefined) {
        sceneExitDelay = setTimeout(function() {
          soundThree_lullaby.stop();
          soundThree_sea.stop();
          mgr.showNextScene();
        }, 1000);

      }

  }
}
function  moveThree(lerpFactor, face) {
    angleMode(RADIANS);

    const yMap = map(lerpFactor, 0, 1, 0, Math.PI / 2)
    face.y = displayHeight - Math.sin(yMap) * 400 - 50



    if (keyIsDown(LEFT_ARROW)) {
      face.x -= 2;


    }

    if (keyIsDown(RIGHT_ARROW)) {

      if(face.x < windowWidth/2) {
      face.x += map(lerpFactor,0,1,1,2);
      }
      else {
        face.x += map(lerpFactor,1,0,2,5);
      }

    }

}





function cometTime(face, skyColor) {
  if((face.y < displayHeight - 400) || cometTimer > 0) {
    comet(skyColor);
  }

}

function comet(skyColor) {

  if (!(cometTimer > displayWidth)) {
    // fill(200);
    // circle(cometTimer, 500 * (1 - sin(map(cometTimer, 0, displayWidth/2, 0, Math.PI / 2))/2) ,10);
    noStroke();
    for(var i = cometTimer - 60 ; i < cometTimer ; i+=3) {
        var ope = map(i,cometTimer - 60,cometTimer,0,1);
      //fill(255,0,0);
      fill(255, 255, 120,ope/3);

      circle(i, 500 * (1 - sin(map(i, 0, displayWidth/2, Math.PI / 5, Math.PI / 2))), map(i,cometTimer - 60, cometTimer,2,15));

      fill(255,255,255,ope *ope);
      circle(i, 500 * (1 - sin(map(i, 0, displayWidth/2, Math.PI / 5, Math.PI / 2))), map(i,cometTimer - 60, cometTimer,.4,10));


    }
    cometTimer+=12;
  }

  if ((cometTimer < displayWidth/2 + 20) && (cometTimer > displayWidth/2 - 20)) {

    faceThree.rightEye = true;
    // soundThree_chime.play();
    // soundThree_chime.setVolume(.03);

  }

  if((cometTimer < displayWidth/2 + 100) && (cometTimer > displayWidth/2 -100)) {

    starOffY= (map(sin(cometTimer)/5,0,1,0,TWO_PI ));
    starOffX =(map(cos(cometTimer)/5,0,1,0,TWO_PI));

  }


}
}
