function SceneThree() {
var mountainWidth;
var cometTimer;
let facethree;
let starOffX;
let starOffY;
var sceneExitDelay;
const stars = []

  this.preload = () => {

  }

  this.setup = () => {
    for (let i = 0; i < 100; i++) {
        stars.push({
        x: random(0, windowWidth),
        y: random(0, windowHeight)
        })
    }
  faceThree = new smileyFace(sceneMargin,windowHeight - sceneBottomMargin, 30);
  cometTimer = 0;
  mountainWidth = windowWidth - 2*sceneMargin;
  starOffX = 0;
  starOffY = 0;
  }


  this.draw = () => {

    let nightColor = color(10, 0, 10);
    const interpolationFactor = getLerpFactor(mouseX, windowWidth / 2, mountainWidth)
    let skyColor = lerpColor(backgroundColor,nightColor,interpolationFactor)
    background(skyColor);

    textDisplay("The mountains are like a bridge to the sky. You feel tiny by comparison. You want to stop, to lie down in their shadow, but something calls you forward.");

    textFont("Amatic SC")
    let x = windowWidth/2 - sceneMargin;
    let y = windowHeight/2;
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

      fill(backgroundColor);
      //  arc(windowWidth/2, windowHeight, windowWidth - sceneMargin*2,windowHeight  ,PI, TWO_PI);

      randomSeed(10);
      for (let x = sceneMargin; x < windowWidth - sceneMargin; x+=1) {
        const yMap = map(getLerpFactor(x,windowWidth/2,mountainWidth), 0, 1, 0, Math.PI / 2)
        const y = windowHeight - Math.sin(yMap) * 400 - 50
        // draw punc at x, y

        let mountainColor = color(3 + map(mouseY,0,windowHeight,0,30), random(40,70) + map(mouseY,0,windowHeight,0,30), random(40,70) - map(mouseY,0,windowHeight,0,20));
        drawPunct("^",round(random(50,70)),x - 10,random(y ,windowHeight),mountainColor)
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
  if(face.x >= windowWidth*.98) {
      fadeOut();
      if(sceneExitDelay ===undefined) {
        sceneExitDelay = setTimeout(function() {
          mgr.showNextScene();
        }, 1000);

      }

  }
}
function  moveThree(lerpFactor, face) {
    angleMode(RADIANS);
    face.x = mouseX
    const yMap = map(lerpFactor, 0, 1, 0, Math.PI / 2)
    face.y = windowHeight - Math.sin(yMap) * 400 - 50
  }


function cometTime(face, skyColor) {
  if((face.y < windowHeight - 400) || cometTimer > 0) {
    comet(skyColor);
  }

}

function comet(skyColor) {

  if (!(cometTimer > windowWidth)) {
    // fill(200);
    // circle(cometTimer, 500 * (1 - sin(map(cometTimer, 0, windowWidth/2, 0, Math.PI / 2))/2) ,10);
    noStroke();
    for(var i = cometTimer - 60 ; i < cometTimer ; i+=3) {
        var ope = map(i,cometTimer - 60,cometTimer,0,1);
      //fill(255,0,0);
      fill(255, 255, 120,ope/3);

      circle(i, 500 * (1 - sin(map(i, 0, windowWidth/2, Math.PI / 5, Math.PI / 2))), map(i,cometTimer - 60, cometTimer,2,15));

      fill(255,255,255,ope *ope);
      circle(i, 500 * (1 - sin(map(i, 0, windowWidth/2, Math.PI / 5, Math.PI / 2))), map(i,cometTimer - 60, cometTimer,.4,10));


    }
    cometTimer+=12;
  }

  if ((cometTimer < windowWidth/2 + 20) && (cometTimer > windowWidth/2 - 20)) {

    faceThree.nose = true;

  }

  if((cometTimer < windowWidth/2 + 100) && (cometTimer > windowWidth/2 -100)) {

    starOffY= (map(sin(cometTimer)/5,0,1,0,TWO_PI ));
    starOffX =(map(cos(cometTimer)/5,0,1,0,TWO_PI));

  }


}
}
