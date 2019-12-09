function SceneFive() {
  faceFive = new smileyFace(windowWidth/2,windowHeight/2,50);
  inverseFace = new smileyFace(windowWidth/2, windowHeight/2,50);
  this.preload = () => {

  }

  this.setup = () => {

  }


  this.draw = () => {

  textFont("Stoke");
  var noiseAmp = 24;
  var hSpace = 24;
  var vSpace = 24;
  var row;
  var size = 30;
  var itemsInRow = 50;

  inverseFace.leftEye = true;
  inverseFace.rightEye = true;
  inverseFace.mouth = true;
  inverseFace.nose = true;
  inverseFace.upsideDownMouth = false;
  inverseFace.inverseDisplay(50);
  follow(inverseFace);
  faceFive.nose = true;
  faceFive.leftEye = true;
  faceFive.rightEye = true;
  faceFive.mouth = false;
  faceFive.upsideDownMouth = true;
  /*465 is the lenght of the field with these variables*/

  //Vertical Start & horizontal startß
  var startPoint = sceneMargin + 3;
  var vStart = windowHeight * 2/4;

  //river bank
  randomSeed(4);
  fill(0);
  let vStartBank  = vStart- 35;
  for (var j = startPoint - 5; j < windowWidth - sceneMargin - 5 ; j++) {

    noStroke();
    circle(j,vStartBank + (random(-10,15)),2);
  }
  for (var j = startPoint - 5; j < windowWidth - sceneMargin - 5 ; j++) {

    noStroke();
    circle(j,vStartBank - 10 + random(-2,-1),2);
  }
  stroke(20);
  strokeWeight(2);
  fill(0);
  //line(startPoint - 5,vStartBank - 10,windowWidth - sceneMargin - 5, vStartBank -10);

  for(var i = 0; i < 500; i++ ) {

    row = floor(i/itemsInRow);

    let x = (i%itemsInRow)*hSpace + startPoint + map(sin(millis()/400*cos(i)),-1,1,-3,3);
    let y = vStart + vSpace*row + map(sin(millis()/400*cos(i)),-1,1,-3,3);
    //noise(i)*noiseAmp;

    if(inBounds(x,y)){
    drawPunct("~",size,x ,y,0);
    }
  }

faceFive.display(50);
moveFive(50, faceFive);


  }

  function moveFive(rad,face) {
  face.x = map(mouseX,0,windowWidth, sceneMargin,windowWidth - sceneMargin);
  face.y = map(mouseY,0,windowHeight,sceneTopMargin,sceneBottomMargin);
  face.radius = rad;

  }

  function follow(face) {
    //this.x = mouseX * (.98 + noise(this.x,this.x)/100);
    face.x = faceFive.x + map(sin(millis()/600),-1,1,-10,10)
    face.y = mouseY + 200;
  }

  this.mouseClicked = () => {


}
}
