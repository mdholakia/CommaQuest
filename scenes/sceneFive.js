function SceneFive() {
  faceFive = new smileyFace(windowWidth/2,windowHeight/2 - 200,50);
  let caption;
  inverseFace = new smileyFace(windowWidth/2, windowHeight/2,50);
  let oldMouseY = mouseY;
  this.preload = () => {

  }

  this.setup = () => {
    caption = "Water stretches out in front of you, calm and clear. In the ripples you see a vision of yourself."
    faceFive.nose = true;
    faceFive.leftEye = true;
    faceFive.rightEye = true;
    faceFive.mouth = false;
    inverseFace.leftEye = true;
    inverseFace.rightEye = true;
    inverseFace.mouth = true;
    inverseFace.nose = true;
    inverseFace.upsideDownMouth = false;

  }


  this.draw = () => {
  textDisplay(caption)
  textFont("Stoke");
  var noiseAmp = 24;
  var hSpace = 24;
  var vSpace = 24;
  var row;
  var size = 30;
  var itemsInRow = 50;
  //Vertical Start & horizontal startß
  var startPoint = sceneMargin + 3;
  var vStart = windowHeight * 2/4;
  //river bank
  randomSeed(4);
  fill(0);
  let vStartBank  = vStart- 35;


  if(faceFive.mouth == false) {
  //if face moves into the water
  if(faceFive.y > vStartBank) {
    approach(inverseFace,faceFive);
  }
  else {
  follow(inverseFace);
  }
  inverseFace.inverseDisplay(50);
  }
  else {
    caption = "You are whole again."
    stay(inverseFace,vStartBank);
  }

  //faceFive.upsideDownMouth = true;


  fill(0);

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
moveFive(faceFive);



  }

  function moveFive(face) {
  // face.x = map(mouseX,0,windowWidth, sceneMargin,windowWidth - sceneMargin);
  // face.y = map(mouseY,0,windowHeight,sceneTopMargin,sceneBottomMargin);
  // face.radius = rad;
  face.x = mouseX;

  var diff = oldMouseY - mouseY;
  face.y = face.y - diff;

  if((face.y < 0 )) {
    //map the face value back down
    face.y = 0;
  }
  if((face.y >= windowHeight/2 + 200 )) {
    //map the face value back down
    face.y = windowHeight/2 + 200;
  }
  oldMouseY = mouseY;


  }

  function follow(face) {
    face.x = faceFive.x + map(sin(millis()/600),-1,1,-10,10)
    face.y = faceFive.y + 200;
    inverseFace.inverseDisplay(50);
  }

  function stay(inverseFace, bankHeight) {
    if (inverseFace.y < bankHeight + 150 ){
      inverseFace.y = inverseFace.y + 1.5;
    }
    else {

    }
    inverseFace.x  = inverseFace.x +map(sin(millis()/600),-1,1,-1,1)
    inverseFace.inverseDisplay(50);

  }
  function approach(inverseFace,face) {
    inverseFace.x = face.x + map(sin(millis()/600),-1,1,-10,10)

    //as long as the face is above the inverse face
    if((face.y - inverseFace.y) <= 0) {

      inverseFace.y = inverseFace.y - 1.5;
    }
    if(floor(face.y - inverseFace.y) == 0) {
      face.mouth = true;
    }
    else {

    }
    inverseFace.inverseDisplay(50);
  }
  this.mouseClicked = () => {


}
}
