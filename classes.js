//Classes.js includes all custom classes for Comma Quest

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
     noCursor();
      if(displayCheck()){
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


              text("You wake up. You remember nothing. You are in a field and the field goes on forever. You begin to walk.",sceneMargin, marginBottom,sceneWidth);
              break;
            case 1:
            //Statements executed when the
            //result of expression matches value2
              text("You reach a forest. There are tall trees and on them, a rich dark fruit. You remember hunger. ",sceneMargin, marginBottom,sceneWidth);

              break;

            case 2:
            //Statements executed when the
            //result of expression matches valueN

              text("This is case 3",windowWidth/2 - textBoxSize/2, marginBottom,textBoxSize);

              break;
            }

          }

          }


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

class spiderCircle {
  constructor(x,y) {
    this.x = x;
    this.y = y
    this.lastMove = [x,y];
  }

  move() {
    fill(0)
    rectMode(CENTER);
    rect(this.x,this.y,25,25)
  }

  colorMatch(x,y) {
    let black = color(0,0,0,255);
    let nextColor = color(get(x,y));

    // console.log("this is black" + black.toString());
    // console.log("this is next pixel" + nextColor.toString());
    if (black.toString() ==  nextColor.toString()) {
      return true;

    }
    else {
      return false;
    }
  }



  follow() {
    var allConnecting = allPairs[[floor(this.x), floor(this.y)]]
    var index = 0;
    while(this.x >= allConnecting[index][0]) {
      index +=1;
      if (index>allConnecting.length) {

        let keys =  Object.keys(allPairs);
        let closestNode = keys[0];
        for(i = 1; i <keys.length ; i++  ) {
          if((keys[i] - this.x) < (closetNode - this.x) ) {
            closestNode = keys[i];

          }
          this.x = closestNode;
          return; 
        }



      }
      if (this.x >= windowWidth) {
        return;
      }
    }
    this.x = allConnecting[index][0];
    this.y = allConnecting[index][1];
    // ATTEMPT #2
    // var x = spiderPath[spiderPathIndex % spiderPath.length][0];
    // spiderPathIndex++;
    // if (x > this.x) {
    //   this.x = x;
    //   this.y = spiderPath[spiderPathIndex % spiderPath.length][1]
    // } else if (allCellsIndex < allCells.length - 1) {
    //   allCellsIndex++;
    //   spiderPath = allCells[allCellsIndex];
    // }

// ATTEMPT #1; follow the black parts
//     let tempX = this.x;
//     let tempY = this.y;
// //gotta check it against our last move;
//     if(this.colorMatch(this.x +1, this.y)) {
//       this.x = this.x + 1;
//     }
//
//     else {
//         if(this.colorMatch(this.x +1, this.y + 1)) {
//               this.x = this.x + 1;
//               this.y = this.y + 1;
//         }
//
//           else {
//             if(this.colorMatch(this.x +1, this.y - 1)) {
//                   this.x = this.x + 1;
//                   this.y = this.y - 1;
//             }
//
//             else {
//               if(this.colorMatch(this.x, this.y - 1)) {
//
//                 //checking if we're going in a loop
//                 if ((this.lastMove[0] === this.x) && (this.lastMove[1] === this.y - 1)) {
//                   this.x = this.x + 1;
//                 }
//
//                 //otherwise do our regular move
//                 else {
//                     this.y = this.y - 1;
//                 }
//
//
//
//               }
//               else {
//                 if(this.colorMatch(this.x, this.y + 1)) {
//                     //
//                     this.y = this.y + 1;
//                 }
//
//                 else {
//
//                 }
//
//
//               }
//
//             }
//
//
//           }
//     }
//
//     this.lastMove[0] = tempX;
//     this.lastMove[1] = tempY;

  }

}
