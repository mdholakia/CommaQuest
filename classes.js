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
            sceneTwo();
              break;

            case 3:

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
class crawler {
  constructor(x0,y0,x1,y1) {
              this.x0 = x0;
              this.y0 = y0;
              this.x1 = x1;
              this.y1 = y1;
              this.step = .1;
              this.moveBool = true;
            }


    display() {

      //if we should be moving
      if(this.moveBool){
      let v1 = createVector(this.x0,this.y0);
      let v2 = createVector(this.x1,this.y1);
      let v3 = p5.Vector.lerp(v1,v2,this.step);
      this.step += 2/(dist(v1.x,v1.y,v2.x,v2.y));
      if(this.step >= 1) {
        this.nextPoint();
      }
      circle(v3.x,v3.y,24);
    }

    else {
            circle(this.x1,this.y1,24);

    }
    }



    nextPoint() {

      this.step = .1;

          //finds the array of all points that are connected to this point
          var allConnecting = allPairs[[floor(this.x1), floor(this.y1)]]
          console.log(allConnecting);

          let rightMove = null;
          let leftMove = null;
          for (let index = 0; index < allConnecting.length ; index++) {
            console.log(index);
            console.log("This is right move" + rightMove);
            console.log("this is left move" + leftMove);
            console.log("This is our current point" + this.x1 + "  " + this.y1)
            let xTest = allConnecting[index][0];
            let yTest = allConnecting[index][1];

            //&& !(xTest == this.x1 && yTest == this.y1)
            //if we shouldn't be moving
            if(!this.moveBool) {
              return;
            }
            if(this.x1 >= windowWidth) {
              this.moveBool = false;
            }

            let vOrigin = createVector(this.x1,this.y1);
            let vTest = createVector(xTest,yTest);
            console.log(validSegment(vOrigin,vTest) + vOrigin + "  " + vTest);
            if(validSegment(vOrigin,vTest)) {


                    //if our proposed point is farther right and not our current end point
                    if( xTest >= this.x1 ) {
                    //if we don't already have a rightward move
                        if (rightMove == null) {
                          // console.log("we're assigning a right move");
                          rightMove = allConnecting[index];
                        }
                        //if we do have a rightmove already
                        else {
                          //flip a coin
                          let r = random(0,1);
                          if (r > .5) {
                            rightMove = allConnecting[index]
                          }

                          }

                    }


                    //our proposed point is to the left of our current endpoint
                    else {
                      //if we don't have a left Move yet, set this point to leftMove.
                      if((leftMove == null) ) {
                        leftMove = allConnecting[index];
                      }
                      else {

                        //if the left move we have stored is backtracking, then accept the new left. If we don't get a new left, we're fine to backtrack
                        if(leftMove[0] == this.x0 && leftMove[1] == this.x1) {

                          leftMove = allConnecting[index]

                        }

                        else {
                          let r = random(0,1);
                          if (r > .5) {
                            leftMove = allConnecting[index]
                          }

                        }

                        //do nothing, we already have a left move that works

                      }
                      }
                    }
                  }

        //check to see if there were no valid segments
        if(rightMove == null && leftMove == null) {
          // console.log("i'm saying that both left and right are null" +console.log(rightMove) + "  " + console.log(leftMove))
          this.moveBool = false;
        }
        else {
          //once we've run through all our possibilities
          //temporarily store our old start point
          let originX = this.x0;
          let originY = this.y0;
            this.x0 = this.x1;
            this.y0 = this.y1;

            //if right move exists and isn't backtracking
            if (rightMove !== null ) {
              // console.log("this is right move when right move should not be null" +rightMove);
              // console.log("are we trying to move right and erroring?")

              //if our right move isn't backtracking
              // if(rightMove[0] != originX && rightMove[1] != originY) {
                this.x1 = rightMove[0];
                this.y1 = rightMove[1];
              // }

              // else {
                //if our right move is backtracking and if left Move isn't null
              //   if(leftMove !==null) {
              //     this.x1 = leftMove[0];
              //     this.y1 = leftMove[1];
              //
              //   }
              //   else {
              //     //moving right we would back track, so let's just stop isntead
              //     this.moveBool = false;
              //   }
              // // }
            }

            else {

              //just do the left Move
              this.x1 = leftMove[0];
              this.y1 = leftMove[1];
            }




        }



}
}

//helper functions for crawler class
function  validSegment(v0,vTest) {

      let blackCount = 0;
      let distance = dist(v0.x,v0.y,vTest.x,vTest.y);
      let sampleSize = 10;

      for(var step = 0; step < 1 ; step+= sampleSize/100 ) {
        let vProjected = p5.Vector.lerp(v0,vTest,step);
        // console.log(vProjected);

        if (colorMatch(vProjected.x,vProjected.y)) {
          blackCount++;

        }
      }


      console.log("this is blackCount" + blackCount);
      if(blackCount >= 2) {

        return true;
      }
      else {
        return false;
      }

    }

function colorMatch(x,y) {
      let black = color(0,0,0,255);
      let nextColor = color(get(x,y));

       //console.log("this is black" + black.toString());
       //console.log("this is next pixel" + nextColor.toString());
      if (black.toString() ==  nextColor.toString()) {
        return true;

      }
      else {
        return false;
      }
    }
