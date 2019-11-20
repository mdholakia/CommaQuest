//
// Note:
// Stuck on how to implement forest and indicate that one tree in particular can be "shaken"



function preload() {
}
  var backgroundColor;
  var textCase = 0;
  var drawCase = 2;
  var sceneWidth;
  var sceneMargin;
  var sceneTopMargin;
  var sceneBottomMargin;
  var snowFall = [];
var specialTreeY;
var specialTreeX;
var specialTreeSize;
let fruit;

//scene 3

let jitter = [];
let cells = [];
function setup() {

  // put setup code here
  textFont("Stoke");
  createCanvas(windowWidth, windowHeight);
  backgroundColor= color(227, 227, 216);

sceneMargin = (windowWidth - windowWidth/2)/2;
sceneTopMargin = windowHeight/5;

sceneBottomMargin = windowHeight - windowHeight/10;
sceneWidth = windowWidth/2;
face = new face(windowWidth/2, windowHeight/2,50);
frame = new screen();
specialTreeY = sceneBottomMargin - 30;
specialTreeX= windowWidth * 2/3 - 50;
specialTreeSize = 600;
fruit = new specialFruit(600,specialTreeX + 30, specialTreeY - specialTreeSize * 3/4,color(255,0,10));

webSet();

//set first item in array to be number of snowflakes
snowFall[0] = 50;


for (let i = 1; i < snowFall[0]; i++) {

    snowFall.push(new snowFlake());
  }

}
function draw() {


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
              face.display();

}




function sceneOne() {
textFont("Amatic SC");


//display our character on our cursor
face.move(50);
face.display();

  var noiseAmp = 45;
  var hSpace = 80;
  var vSpace = 60;
  var row;
  var size = 280;

  //base number of rows off height of window
  var treeRows = 5;

  var itemsInRow = 15;
  var startPoint = sceneMargin;

  //Seed the noise field so we get the same noise values & forest each time
  noiseSeed(48);

  for(var i = 0; i < treeRows*itemsInRow; i++ ) {

    row = floor(i/itemsInRow);
    size = 280+row*20;
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


function sceneTest() {
  face.leftEye = true;
  face.move(500);
  face.display();

   push();
   //translate(sceneMargin,sceneTopMargin);

 	// voronoiDraw(0, 0, false, true);
//
  //draw a mask to block out border
  // noFill();
  // strokeWeight(10);
  // stroke(backgroundColor);
  // rect(0,0,700,500);
  // stroke(0);
  // strokeWeight(1);


    let cellArray = jitter[0];
    for (i = 0; i < (cellArray.length); i ++) {

        let subCell = cellArray[i];
        //console.log(subCell)

          for (j = 0; j < subCell.length - 1; j+=1) {


            let p1 = subCell[j];
            let p2 = subCell[j+1];


            strokeWeight(.5);
            // if(i == 4) {
            //   stroke(255);
            // }
            stroke(0);
            //heal the web by decreasing the "gap effect with modulo " i controls whole sections. j controls part of the line.
            if(j%4 ==0) {
              stroke(color(10,0,255));
            }

            line(p1[0],p1[1],p2[0],p2[1]);


          }
        }
        


}
