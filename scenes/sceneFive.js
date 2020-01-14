function SceneFive() {
  faceFive = new smileyFace(displayWidth/2,displayHeight/2 - 200,50);
  let caption;
  let doorBool;
  inverseFace = new smileyFace(displayWidth/2, displayHeight/3,50);
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
  var vStart = displayHeight * 2/4;
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
    doorBool = true;
  }

  //faceFive.upsideDownMouth = true;


  fill(0);

  for (var j = startPoint - 5; j < displayWidth - sceneMargin - 5 ; j++) {

    noStroke();
    circle(j,vStartBank + (random(-10,15)),2);
  }
  for (var j = startPoint - 5; j < displayWidth - sceneMargin - 5 ; j++) {

    noStroke();
    circle(j,vStartBank - 10 + random(-2,-1),2);
  }
  stroke(20);
  strokeWeight(2);
  fill(0);
  //line(startPoint - 5,vStartBank - 10,displayWidth - sceneMargin - 5, vStartBank -10);

  for(var i = 0; i < 500; i++ ) {

    row = floor(i/itemsInRow);

    let x = (i%itemsInRow)*hSpace + startPoint + map(sin(millis()/400*cos(i)),-1,1,-3,3);
    let y = vStart + vSpace*row + map(sin(millis()/400*cos(i)),-1,1,-3,3);
    //noise(i)*noiseAmp;

    if(inBounds(x,y)){
    drawPunct("~",size,x ,y,0);
    }
  }


if(doorBool == true) {
  door(displayWidth - sceneMargin - 3,vStartBank - 12);
}

if(doorBool != true ) {
  faceFive.display(50);
}
else {
  faceFive.display( );
}

moveFive(faceFive);



  }

  function moveFive(face) {


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
  if((face.y < displayHeight/2 - 75  )) {
    //map the face value back down
    face.y = displayHeight/2 - 75 ;
  }
  if((face.y >= displayHeight/2 + 200 )) {
    //map the face value back down
    face.y = displayHeight/2 + 200;
  }



  }

  function door(x,y) {
    let h= 100;
    let w = 60;
    fill (0);
    rect(x - w,y - h,w,h);
    circle(x + w/2 - w,y - h, w );
    randomSeed(30);
    for(let i = 0; i < 40; i++) {
      fill(255,255,255, random(150,255));
      circle(random(x - w, x), random(y - h, y + h),1);
      fill(255);
      circle(random(x - w, x), random(y - h, y + h),2);

    }

    if(onDoor(h,w,x,y)) {
      ascend(faceFive);
    }


  }

  function onDoor(h,w,x,y) {
    if((faceFive.x < x && faceFive.x > x - .75*w) && (faceFive.y > y - h && faceFive.y < y)) {
      return true;
      }

  }

  function ascend(face) {
    if(faceFive.radius > 0) {
    faceFive.radius = faceFive.radius  - .5;
    }
    else {

      fadeOut();
    }


  }
  function follow(face) {
    face.x = faceFive.x + map(sin(millis()/600),-1,1,-10,10)
    face.y = faceFive.y + 200;
    inverseFace.inverseDisplay(50);
  }

  function stay(inverseFace, bankHeight) {
    if (inverseFace.y < bankHeight + 150 ){
      inverseFace.y = inverseFace.y + .75;
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
    if(abs(floor(face.y - inverseFace.y)) < 3) {
      console.log("face y" + face.y);
      console.log("inverse y" +inverseFace.y);

        console.log("floor" + floor(face.y - inverseFace.y));
      face.mouth = true;
    }
    else {

    }
    inverseFace.inverseDisplay(50);
  }
  this.mouseClicked = () => {


}
}
