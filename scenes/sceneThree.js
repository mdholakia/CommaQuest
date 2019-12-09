function SceneThree() {

let facethree;
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
  }


  this.draw = () => {
    let nightColor = color(10, 0, 10);
    var mountainWidth = windowWidth - 2*sceneMargin;
    const interpolationFactor = getLerpFactor(mouseX, windowWidth / 2, mountainWidth)
    let skyColor = lerpColor(backgroundColor,nightColor,interpolationFactor)
    background(skyColor);

    textFont("Amatic SC")
    let x = windowWidth/2 - sceneMargin;
    let y = windowHeight/2;
    let size = 800




      randomSeed(4);

      colorMode(RGB, 255, 255, 255, 1);
      const numOfStars = interpolationFactor * 100
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

function  moveThree(lerpFactor, face) {
    angleMode(RADIANS);
    face.x = mouseX
    const yMap = map(lerpFactor, 0, 1, 0, Math.PI / 2)
    face.y = windowHeight - Math.sin(yMap) * 400 - 50
  }
}
