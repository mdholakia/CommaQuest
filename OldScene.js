//
// Note:
// Stuck on how to implement forest and indicate that one tree in particular can be "shaken"



function preload() {
}

//scene manager
var mgr;
var backgroundColor;
var textCase = 0;
var drawCase = 3;
var sceneWidth;
var sceneMargin;
var sceneTopMargin;
var sceneBottomMargin;
var snowFall = [];
var specialTreeY;
var specialTreeX;
var specialTreeSize;
let fruit;
let inverseFace;


//scene 3

let jitter = [];
let cells = [];
var spiderClickCounter;
var spider;
var allPairs = {};
let amount = .2;
var pointX;
var pointY;

//scene 4

let step;
const stars = []

function setup() {
  mgr = new SceneManager();
  mgr.addScene ( Animation1 );

  // put setup code here
  textFont("Stoke");
  createCanvas(windowWidth, windowHeight);
  backgroundColor= color(242, 232, 216);
  //color(247, 246, 230  );
sceneMargin = (windowWidth - windowWidth/2)/2;
sceneTopMargin = windowHeight/5;

sceneBottomMargin = windowHeight - windowHeight/10;
sceneWidth = windowWidth/2;
face = new smileyFace(windowWidth/2, windowHeight/2,50);
inverseFace = new smileyFace(windowWidth/2, windowHeight/2,50);
frame = new screen();
specialTreeY = sceneBottomMargin - 30;
specialTreeX= windowWidth * 2/3 - 50;
specialTreeSize = windowHeight/1.8;
fruit = new specialFruit(600,specialTreeX + 30, specialTreeY - specialTreeSize * 3/4,color(255,0,10));
spiderClickCounter = 2;
pointX = windowWidth;
pointY = windowHeight;
step = 0;
webSet();

//set first item in array to be number of snowflakes
snowFall[0] = 50;


for (let i = 1; i < snowFall[0]; i++) {

    snowFall.push(new snowFlake());
  }

for (let i = 0; i < 100; i++) {
  stars.push({
    x: random(0, windowWidth),
    y: random(0, windowHeight)
  })
}

}
function draw() {
mgr.showScene()

  //setGradient(0, windowWidth, 0, windowHeight, c1, c2, Y_AXIS);
//background(155,155,155);

background(backgroundColor);
//background(247, 246, 230);
//background(3, 34, 87);
  // put drawing code here
  noStroke();
  frame.display();
  stroke(0);



}

function sceneZero() {


              var noiseAmp = 24;
              var hSpace = 24;
              var vSpace = 24;
              var row;
              var itemsInRow = 50;
              /*465 is the lenght of the field with these variables*/
              var startPoint = sceneMargin;

              for(var i = 0; i < 2000; i++ ) {

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
              face.display(null);

}




function sceneOne() {



//display our character on our cursor
face.move(50);
face.display(50);
textFont("Amatic SC");
  var noiseAmp = 45;
  var hSpace = 80;
  var vSpace = 60;
  var row;
  var originalSize = windowHeight/3.8;

  //base number of rows off height of window
  var treeRows = 5;

  var itemsInRow = 15;
  var startPoint = sceneMargin;

  //Seed the noise field so we get the same noise values & forest each time
  noiseSeed(48);



  for(var i = 0; i < treeRows*itemsInRow; i++ ) {

    row = floor(i/itemsInRow);
    let size = originalSize+row*20;
    var x = (i%itemsInRow)*hSpace + startPoint + noise(i)*noiseAmp;
  //  var y = sceneBottomMargin - vSpace*row + noise(i)*noiseAmp;
    var y = sceneBottomMargin - vSpace*row + 10;


            //to create "gaps in the forest, only draw if the perlin noise val for those coordinates is above .5"
            if(inBounds(x,y) && (noise(x,y) >.3)){
            drawPunct("Y",size,x,y,0);

            //draw a canopy for each tree
            treeCanopy(size,x,y,0,color(255,0,10));
            }
            //vary the startingpoint of new row depending on if it's even or odd
            if ((row % 2) == 0) {
              startPoint = sceneMargin + 100;
              hSpace = hSpace + 4;
            }
            else {
              startPoint = sceneMargin + 10;
              hSpace = hSpace - 5;
            }
}

for (var v = 1; v < snowFall[0]; v++) {
  snowFall[v].fall();
}
//draw our special tree
specialTree();

}


function sceneTwo() {
  face.leftEye = true;
  face.move(500);
  face.display(500);
  cursor();
voronoiDraw();


let c = color(get(windowWidth/2, windowHeight/2));
  //console.log(c);
let black = color(0,0,0,255);
   push();

fill(0);


    let cellArray = jitter[0];


    for (i = 0; i < (cellArray.length); i ++) {



        let subCell = cellArray[i];
        //console.log(subCell)


          for (j = 0; j < subCell.length - 1; j+=1) {

            //so we get clean numbers that match what our spider is moving on.
            let p1 = subCell[j].map(floor);
            let p2 = subCell[j+1].map(floor);


            strokeWeight(2);
            // if(i == 4) {
            //   stroke(255);
            // }
            stroke(0);


            //heal the web by decreasing the "gap effect with modulo " i controls whole sections. j controls part of the line.
            if(i% spiderClickCounter ==0) {

            }
            else {
             line(p1[0],p1[1],p2[0],p2[1]);
            }

          }

        }

        //draw a line in the middle
        // strokeWeight(50);
        // stroke(0);
        // line(0,windowHeight/2,windowWidth,windowHeight/2);

        //draw a spider
        spider.display();

        randomSeed(23);
// colorMode(HSB)
//         for(var i = 0; i < 20 ; i++) {
//
//             x1 = random(0,windowWidth);
//             y1 = random(0,windowHeight)
//             b1 = color(noise(x1,y1),40,100);
//             b2 = color(255);
//
//           fill(b1);
//           circle(x1,y1,20);
//         }

}

function sceneThree() {

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
  inverseFace.inverseDisplay(50);
  inverseFace.follow();
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
    drawPunct("~",size,x,y,0);
    }
  }
face.leftEye = true;
face.rightEye = true;
face.upsideDownMouth = true;
face.display(50);
face.move(100);


}

function sceneTest() {

let nightColor = color(0, 0, 7);
const interpolationFactor = getLerpFactor(mouseX, windowWidth / 2, windowWidth - 2*sceneMargin)
let skyColor = lerpColor(backgroundColor,nightColor,interpolationFactor)
background(skyColor);

textFont("Amatic SC")
let x = windowWidth/2 - sceneMargin;
let y = windowHeight/2;
let size = 800
// arc(windowWidth/2, windowHeight, windowWidth - sceneMargin*2,windowHeight + 200  ,PI, TWO_PI);
randomSeed(10);
for (let x = sceneMargin; x < windowWidth - sceneMargin; x+=.7) {
  const yMap = map(getLerpFactor(x,windowWidth/2,windowWidth - 2*sceneMargin), 0, 1, 0, Math.PI / 2)
  const y = windowHeight - Math.sin(yMap) * 400 - 50
  // draw punc at x, y
  let mountainColor = color(random(0, 20), 82, 141);
  drawPunct("?;",90,x,random(y,windowHeight),mountainColor);
  // drawPunct(".",90,x,y,color(255, 0, 0));
}



  randomSeed(4);

  colorMode(RGB, 255, 255, 255, 1);
  const numOfStars = interpolationFactor * 100
  for(var i = 0; i < numOfStars; i++) {
    const star = stars[i]
    colorMode(RGB, 255, 255, 255, 1);
    fill(255, 255, 255);
    circle(star.x,star.y,random(0,3));
  }


face.leftEye= true;
face.display(30);
face.mountainMove(interpolationFactor);




}

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
