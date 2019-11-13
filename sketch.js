//
// Note:
// Stuck on how to implement forest and indicate that one tree in particular can be "shaken"



function preload() {
}

  var textCase = 0;
  var drawCase = 0;
  var sceneWidth;
  var sceneMargin;
  var sceneTopMargin;
  var sceneBottomMargin;
function setup() {

  // put setup code here
  textFont("Stoke");
  createCanvas(windowWidth, windowHeight);

sceneMargin = (windowWidth - windowWidth/2)/2;
sceneTopMargin = windowHeight/5;
sceneBottomMargin = windowHeight - windowHeight/10;
sceneWidth = windowWidth/2;
face = new face(windowWidth/2, windowHeight/2,50);
frame = new screen();

snowFall = [];
//set first item in array to be number of snowflakes
snowFall[0] = 50;
for (let i = 1; i < 50; i++) {
    snowFall.push(new snowFlake());
  }
}
function draw() {


  //setGradient(0, windowWidth, 0, windowHeight, c1, c2, Y_AXIS);
//background(155,155,155);
background(227, 227, 216);
//background(247, 246, 230);
  // put drawing code here
  noStroke();
  frame.display();
  stroke(0);

}
//checks if the cursor is inside a bounding box defined by it's upper left and bottom right points
function mouseOver(x1,y1,x2,y2) {
if( (mouseX > x1) && (mouseX <x2) && (mouseY > y1) && (mouseY <y2))
{
    console.log("Yeah!");
  return true;

}


      else {
        //console.log("no we're not on it");
  console.log("No!");
        return false;

  }

}
function inBounds(x,y) {
  var bound;
  if (x < sceneMargin || x> sceneMargin + sceneWidth || y > sceneBottomMargin || y < sceneTopMargin) {

    bound = false;
  }
  else {
    bound = true;
  }

return bound;
}

function getCoord() {
  console.log(mouseX);
  console.log(mouseY);
}


function drawPunct(char,size,x,y,color) {

noSmooth();
var c = color;
fill(c);
textSize(size);
text(char,x,y);

}



class face {
constructor (xpos,ypos, radius) {

  this.radius = 50;
  this.x = xpos;
  this.y = ypos;
  this.leftEye = false;
  this.rightEye = false;
  this.mouth = false;
}
  move(rad) {
  this.x = mouseX;
  this.y = mouseY;
  this.radius = rad;

  }
   display(){
      if(inBounds(mouseX,mouseY)){
      fill(255);
      noStroke();
      circle(this.x,this.y,this.radius);

              if (this.leftEye) {
                noStroke();
                fill(0);
                var leftX = (this.x - (.2*this.radius));
                var leftY= (this.y - (.1*this.radius));
                circle(leftX,leftY,3);
              }

              if (this.rightEye) {
                noStroke();
                fill(0);
                var rightX = (this.x + (.2*this.radius));
                var rightY= (this.y - (.1*this.radius));
                circle(rightX,rightY,3);
              }

              if(this.mouth) {
                noFill();
              stroke(0);
                  arc(this.x, this.y + .1*this.radius, 2*(leftX-this.x),15,0, PI);
              noStroke();
              }

            stroke(0);
          }
        }
        //For Scene one
        moveShrink() {
          this.x = mouseX;
          this.y = mouseY;
          this.radius = map(mouseY,200,windowHeight-200,0,100);

        }


}

class screen {

  constructor() {

  }

          display() {
          //setup text styles for Punctuation Calls
          textAlign(CENTER);
          var textBoxSize= 500;
          textSize(24);
          fill(0);

          //draw the horizon line

          //text-dependent on case:
          switch (drawCase) {
            case 0:
            //Statements executed when the
            //result of expression matches value1

            sceneZero();

              break;
            case 1:
            //Statements executed when the
            //result of expression matches value2

            sceneOne();

              break;

            case 2:
            //Statements executed when the
            //result of expression matches valueN
            sceneTest();
              break;
            }

            //Sets up text-styles for the text calls
            textSize(18);
            noStroke();
            fill(0);
            textAlign(LEFT);
            //Text will be drawn this far from the bottom
            var marginBottom = windowHeight/8;
          //text-dependent on case:
          textFont("Stoke");
          switch (textCase) {



            case 0:
            //Statements executed when the
            //result of expression matches value1


              text("You wake up. You remember nothing. You are in a field and the field goes on forever. You pick a direction. You begin to walk.",sceneMargin, marginBottom,sceneWidth);
              break;
            case 1:
            //Statements executed when the
            //result of expression matches value2
              text("You reach a forest. There are tall trees and on them, a rich dark fruit. You remember hunger. The fruit is so close you want to reach out and touch it. ",windowWidth/2 - textBoxSize/2, marginBottom,textBoxSize);

              break;

            case 2:
            //Statements executed when the
            //result of expression matches valueN

              text("This is case 3",windowWidth/2 - textBoxSize/2, marginBottom,textBoxSize);

              break;
            }

          }

          }


function sceneZero() {


              var noiseAmp = 24;
              var hSpace = 24;
              var vSpace = 24;
              var row;
              var itemsInRow = 50;
              /*465 is the lenght of the field with these variables*/
              var startPoint = sceneMargin;

              for(var i = 0; i < 1000; i++ ) {

                row = floor(i/itemsInRow);
                var size = 2+row*2;
                var x = (i%itemsInRow)*hSpace + startPoint;
                var y = windowHeight/4 + vSpace*row + noise(i)*noiseAmp;

                if(inBounds(x,y)){
                drawPunct('"',size,x,y,0);
                }
              }

              if ((mouseY < 202) && (mouseY !=0)) {
                drawCase = drawCase +1;
                textCase = textCase + 1;

              }

              face.moveShrink();
                noCursor();
              face.display();

}


function mouseClicked() {
  getCoord();

  console.log(inBounds(mouseX,mouseY));
}

class snowFlake {

  constructor() {
    randomSeed();
    this.lifespan = round(random(-100,-300));
    //only x values in the screen area
    this.x = random(sceneMargin, windowWidth - sceneMargin);

    this.y = random(0, sceneTopMargin + 400);

  }

  fall() {

  if(this.lifespan <= 0){
    //drawPunct('*',20,this.x,this.y,255);

//if the snowflake hasn't hit the bottom, then have it fall and decrease lifepsan
    //if(this.y  <=sceneBottomMargin) {


    //calibrates the rate of fall to be related to the y position of the flake
    this.y = this.y + abs(sin(this.x))*3 + 1;
//  }
this.lifespan = this.lifespan + 1;

}
  //create a new flake
  //if(round(this.y) == round(sceneBottomMargin)) {

  //when it hits the end of its fall cycle
  if (this.lifespan == 0) {
//  this.y = this.y + 1;

  snowFall.push(new snowFlake());
  snowFall[0] = snowFall[0] + 1;
  this.lifespan = this.lifespan + 1;
}

//draw the snowflake;
noStroke();
//draw it where it is, unless the y has gone too far. In which case, draw it on the bottom.
if(inBounds(this.x,this.y)){
drawPunct('*',20,this.x,this.y,255);  }

else {

  drawPunct('*',20,this.x,sin(this.x)*3 +sceneBottomMargin,255);
}

}


}

function sceneOne() {
textFont("Amatic SC");

//This is the "frame in which we want our forest to appear. We'll be translating the canvas to this point to simplify the math of drawing"
var x = sceneMargin
var y = windowHeight/2.4;
var size = 130;

//This is the starting point for our forest, we'll update this as we draw each tree at a new X coordinate
var trunkStart = sceneMargin;
var canopyStart = sceneMargin;



//display our character on our cursor
face.move(50);
face.display();



//This stabilizes our random function to generate the same values on each draw() call.
//good numbers: 25
randomSeed(25);

//Draw 50 trees
for(var i= 0; i <18; i++){

//Save our old canvas, now translate our canvas to where we should start drawing our new tree
  push();
  //0,0 is now at trunkStart & y
    translate(trunkStart,y);
    var c = color(0,0,0,255);

    //if our drawing point is in-bounds of our story frame
    if (inBounds(trunkStart,y) ){
    //the X coordinate we're going to be drawing at is the zero point in our translated area
    var xTree = 0;

    //This yTree is the bottom point on our tree. Randomness gives the "forest effect" by creating a spread of y values.
    var yTree =size*(2 + random(-.8,.2))
    //draw the trunk, multiply size by 2.2 for the correct ratio between trunks and leaves
    drawPunct('Y',size*2.2,xTree,yTree,c);
    //because we're translating by background start, otherwise it would always be 0

}
else {

  console.log(i);
}



  pop();

  //We're now moving across the screen, rightward to draw a new tree at a new X point
  trunkStart = trunkStart + 30;

}




randomSeed(4);

//this will draw 10 circles of leaves positioned over our trunks
for (var i =0; i < 10 ; i++) {

  for (var angle = 0; angle < 365; angle = angle + 20) {

    push();
    //move our canvas to be leave a left margin and give us room on the top
    translate(canopyStart,y);
    angleMode(DEGREES);
    rotate(angle);


    if (inBounds(0+canopyStart, 0+y) ){
    drawPunct('83',size + random(0,5)*10,0,0,0);
    }

    //draw fruit, but only if i is divisible by 3

    if(angle % 6=== 0){

      var fruitColor = color(255,0,70)
      if (inBounds(0+canopyStart, 0+y) ){
      drawPunct('.',size*2, 0 + random(-size *.72,size *.75), 0 + random(-size *.75,size *.75),fruitColor);
    }

  }
    pop();



  }



canopyStart = canopyStart + 150;

}

//draw the single interactive tree
// push();
//   translate(sceneMargin,y);
//   var yspecialTree =size*2.2;
//   noStroke();
//   drawPunct('Y',size*2.2,windowWidth/4.2,yspecialTree,color(255));
// pop();

for (var i = 1; i < snowFall[0]; i++) {

  snowFall[i].fall();
}


}

function sceneTest() {
  var x1 = windowWidth/2;
  var x2 = windowWidth/2 + 50;
  var y1 = windowHeight/2;
  var y2 = windowWidth/2 + 50;

fill(0);
rect(x1,y1,50,50);
mouseOver(x1,y1,x1+50,y1+50);

}
