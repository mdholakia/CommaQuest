function SceneTwo() {
  let faceTwo;
  var snowFall = [];
  var specialTreeY;
  var specialTreeX;
  var specialTreeSize;
  let fruit;
  var oldMouseY = mouseY;
  var sceneExitDelay;
  this.preload = () => {

  }

  this.setup = () => {
    specialTreeY = sceneBottomMargin - 30;
    faceTwo = new smileyFace(sceneTopMargin,mouseY,50);
    specialTreeX= windowWidth * 2/3 - 50;
    specialTreeSize = windowHeight/1.8;
    fruit = new specialFruit(600,specialTreeX + 30, specialTreeY - specialTreeSize * 3/4,color(255,0,10));
    snowFall = []
    snowFall[0] = 50;
    for (let i = 1; i < snowFall[0]; i++) {

        snowFall.push(new snowFlake());
    }
  }


  this.draw = () => {
    textDisplay("You reach a forest. There are tall trees and on them, a rich dark fruit.You remember hunger.")
  //   noCursor();
  //   //display our character on our cursor
    moveTwo(faceTwo);
    faceTwo.display(50);
    textFont("Amatic SC");
    var noiseAmp = 45;
    var hSpace = 80;
    var vSpace = 60;
    var row;
    var originalSize = windowHeight/3.8;
    var treeRows = 5;
    var itemsInRow = 15;
    var startPoint = sceneMargin;
  //
  //   //Seed the noise field so we get the same noise values & forest each time
     noiseSeed(48);
  //
  //
  //

    for(var i = 0; i < treeRows*itemsInRow; i++ ) {

      row = floor(i/itemsInRow);
      let size = originalSize+row*20;
      var x = (i%itemsInRow)*hSpace + startPoint + noise(i)*noiseAmp;
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

if(fruit.eaten && sceneExitDelay === undefined) {
  // startTime = millis();
  // while(millis() > startTime + 100) {
  //   background(0);
  // }
  sceneExitDelay = setTimeout(function() {
    mgr.showNextScene();
  }, 1000);
}

}

this.mouseClicked = () => {

  if((faceTwo.x  < specialTreeX + 100) && (faceTwo.x  > specialTreeX - 100) && !fruit.fallen) {
    fruit.fall();
  }

  //testing if you are eating the fruit
  else if(fruit.fallen && Math.abs(faceTwo.x - fruit.x) < 50 && Math.abs(faceTwo.y - fruit.y) < 50) {
    console.log("Eating fruit");
    faceTwo.leftEye = true;
    fruit.eaten = true;


  }

}

//Scene Two Classes & Helper Functions

class snowFlake {

            constructor(generation) {
              randomSeed();
              this.lifespan = round(random(-200,-400));
              //only x values in the screen area
              this.x = random(sceneMargin, windowWidth - sceneMargin);

              this.y = random(0,windowHeight/4);
              this.generation = generation || 0;

            }

            fall() {

            if(this.lifespan <= 0){


          //if the snowflake hasn't hit the bottom, then have it fall and decrease lifepsan
              //if(this.y  <=sceneBottomMargin) {


              //calibrates the rate of fall to be related to the x position of the flake
              //this.y = this.y + abs(sin(this.x))*3 + 1;

              this.y = this.y + (noise(this.x,this.x)*2)**3 + 1;
          //  }
          this.lifespan = this.lifespan + 1;

          }
            //create a new flake
            //if(round(this.y) == round(sceneBottomMargin)) {

            //when it hits the end of its fall cycle
            if (this.lifespan == 0) {
          //  this.y = this.y + 1;

            snowFall.push(new snowFlake(this.generation+1));
            snowFall[0] = snowFall[0] + 1;
            this.lifespan = this.lifespan + 1;
          }

          //draw the snowflake;
          noStroke();
          let stop = (this.generation*5)%100;
          //draw it where it is, unless the y has gone too far. In which case, draw it on the bottom.
          if(this.y < sceneBottomMargin - stop){
          drawPunct('*',20,this.x,this.y,255);
          }

          else {

            drawPunct('*',20,this.x, sceneBottomMargin - stop,255);
          }

          }


          }

function specialTree () {

  //This section checks how to draw the interactive tree based on whether the mouse is over it and whether the fruit has fallen
  if(fruit.fallen) {
    //draw the single interactive tree
  drawPunct("Y",specialTreeSize,specialTreeX,specialTreeY,7);
  treeCanopy(specialTreeSize,specialTreeX,specialTreeY,10,color(255,0,10));
  fruit.draw();

  }

  if((mouseX < specialTreeX + 50) && (mouseX > specialTreeX - 50)) {
  //only shake the tree if the fruit hasn't fallen
  if(!fruit.fallen){
      drawPunct("Y",specialTreeSize,specialTreeX + (sin(TWO_PI * millis()/5 )*3 ),specialTreeY,7);

      push();
      translate ((sin(TWO_PI * millis()/4 ) + 2), 0);
      treeCanopy(specialTreeSize,specialTreeX,specialTreeY,10,color(255,0,10));
      pop();
      fruit.shake();
      fruit.draw();
    }

  }
  else {
    drawPunct("Y",specialTreeSize,specialTreeX,specialTreeY,7);
    treeCanopy(specialTreeSize,specialTreeX,specialTreeY,10,color(255,0,10));
    fruit.draw();

    faceTwo.display();
  }
}

class specialFruit {

    constructor (size,x,y,color) {
      this.size  = size;
      this.x = x;
      this.y = y;
      this.v = 0;
      this.color = color;
      this.fallen = false;
      this.eaten = false;
    }


    shake () {
      fruit.x = fruit.x + sin(TWO_PI * millis() *10 );
      fruit.y = fruit.y + sin(TWO_PI * millis() * 10);
    }
    fall() {
      if (this.y < sceneBottomMargin + 30) {
        this.v = .009;
      }
    this.fallen = true;

    }

    draw() {

      if (!this.eaten) {
      //draw with velocity
        if (this.y > sceneBottomMargin) {
        this.v = 0;
        }
      this.y = this.y + this.y * this.v;
      drawPunct('.',this.size,this.x,this.y, this.color);
      }

    }
  }

  function moveTwo(face) {
  face.x = mouseX;

  var diff = oldMouseY - mouseY;
  face.y = face.y - diff;

  if((face.y < sceneBottomMargin - 100 )) {
    //map the face value back down
    face.y = sceneBottomMargin -100;
  }
  if((face.y >= windowHeight )) {
    //map the face value back down
    face.y = windowHeight;
  }
  oldMouseY = mouseY;
  }
}
