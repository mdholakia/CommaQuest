function SceneFour() {
let jitter = [];
let cells = [];
var spiderClickCounter;
var spider;
var allPairs = {};
let amount = .2;
var pointX;
var pointY;
let faceFour;
  this.preload = () => {

  }

  this.setup = () => {
  faceFour = new smileyFace(windowWidth,windowHeight,500);
  spiderClickCounter = 2;
  //setting up spider web
  voronoiJitterStepMax(20);
  //Minimum distance between jitters
  voronoiJitterStepMin(10);
  voronoiSiteStrokeWeight(0 );
  //Scales each jitter
  voronoiJitterFactor(2);
  //Jitter edges of diagram
  voronoiJitterBorder(true);
  voronoiSiteFlag(false);

  angleMode(RADIANS);
  let r;
  let a = 2;
  let b = .1;
  let spirals = 20;
  for (angle = 0; angle < TWO_PI*spirals; angle = angle + .5) {

      r = a*exp(b*angle)
      //r = r + random(-sqrt(r),sqrt(r))*random(1,15);
      let x = r*cos(angle)+ windowWidth/2;
      let y = r*sin(angle) + windowHeight/2;

     if(noise(x,y) > .4 ) {
      voronoiSite(x ,y);
      //append(cells,voronoiGetSite(x, y, false));

      }
  }

    //second spiral
    let r1;
    let a1 = 30;
    let b1 = .1;
    let spirals1 = 8;

    for (angle1 = 0; angle1 < TWO_PI*spirals1; angle1 = angle1 + .1) {

        r1 = a1*exp(b1*angle1)
        //r = r + random(-sqrt(r),sqrt(r))*random(1,15);
        let x1 = r1*cos(angle1) + 100;
        let y1 = r1*sin(angle1 + 100);

       if(noise(x1,y1) > .4 ) {
        voronoiSite(x1 ,y1);


        //append(cells,voronoiGetSite(x, y, false));

       }
    }

  voronoi(windowWidth, windowHeight, true);
  var diagram = voronoiGetDiagram();
  let cellArray = voronoiGetCells();
  let cellArrayJitter = voronoiGetCellsJitter()
  append(cells,diagram.cells[0]);
  append(jitter, cellArrayJitter);

  // step 1, build up everything
  //WITH FLOORING

  let foundP1 = false;
  let firstPoint;
  for (i = 0; i < (cellArray.length); i ++) {
    let subCell = cellArray[i];
    for (j = 0; j < subCell.length; j+=1) {
      if(!foundP1 && (subCell[j][0] < windowWidth/4) && (subCell[j][1] > 60)) {
        firstPoint = subCell[j];
        foundP1 = true;
      }
      let p1;
      let p2;
      //exit case to connect the last segment to the first segment
      if(j == subCell.length - 1) {
        p1 = subCell[j];
        p2 = subCell[0];

      }
      else {
         p1 = subCell[j];
         p2 = subCell[(j+1)];
      }

      let p1Paths = allPairs[p1.map(floor)] || [];
      //let p2Paths = allPairs[p2.map(floor)] || [];
      p1Paths.push(p2.map(floor));
      //p2Paths.push(p1.map(floor));
      allPairs[p1.map(floor)] = p1Paths;
      //allPairs[p2.map(floor)] = p2Paths;
      }
    }
      console.log(firstPoint);
      var allConnecting = allPairs[[floor(firstPoint[0]), floor(firstPoint[1])]]

      spider  = new crawler(floor(firstPoint[0]),floor(firstPoint[1]), floor(allConnecting[0][0]),floor(allConnecting[0][1]));

      var firstPair = Object.entries(allPairs)[0]


      var firstValue = firstPair[1][0];


    }




  this.draw = () => {


    faceFour.leftEye = true;
    faceFour.upsideDownMouth = true;
    faceFour.nose = true;
    faceFour.display(200);
    moveFour(200,faceFour);
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

        //draw a spider
        spider.display();

  }

  this.mouseClicked = () => {
  spiderClickCounter = spiderClickCounter * 2;
  spider.moveBool = true;

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
    body(x,y) {
      textFont("Stoke");
      push();

      fill(7);
      circle(x,y,50);
      angleMode(DEGREES);
      for (var l = 0; l < 360 ; l+= 40) {
        stroke(7);
        strokeWeight(3);
        line(x,y, x + 60*cos(l),y + sin(l)*60);
        line(x + 60*cos(l),y + sin(l)*60,x + 60*cos(l) + 10*cos(l), y + sin(l)*60 );

      }
      drawPunct(")",10,x + 5, y - 7,255);
      drawPunct(")",10,x + 5, y + 9,255);
      if(!this.moveBool) {

        drawPunct("-- %$%^$",random(18,20),x + 100, y,random(2,10));


      }
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

      this.body(v3.x,v3.y);
    }

    else {
      this.body(this.x1,this.y1);

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

                          if (abs(rightMove[1] - windowWidth/2) > abs(allConnecting[index][1] -windowWidth/2)) {

                            rightMove = allConnecting[index]

                          }
                          // let r = random(0,1);
                          // if (r > .5) {
                          // }

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


function moveFour(rad,face) {
face.x = mouseX;
face.y = mouseY;
face.radius = rad;

}
}
