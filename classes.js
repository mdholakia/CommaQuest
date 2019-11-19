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

//multiple checks to whether the face should be displayed
  displayCheck() {
    //if in bounds
    if (!inBounds(mouseX,mouseY)) {
      return false;
    }
    //if scene is with trees in which case add that

    if ((drawCase == 1 && mouseY < 792) || !(inBounds(mouseX,mouseY))) {
      console.log("im here");
      return false;
    }

    return true;

  }
   display(){
     noCursor();
      if(this.displayCheck()){
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


          function treeCanopy(treeSize,x,y,c,d) {
            var leafColor = c;
            var fruitColor = d;
            canopySize = treeSize/2;
            //wgere we start drawing our canopy from
            canopyHeight = y - treeSize * 3/4;
            canopyStart = x;
            randomSeed(4);
            for (var angle = 0; angle < 365; angle = angle + 45 + noise(angle,angle)*5 ) {


            push();

            //move our canvas to be leave a left margin and give us room on the top
           translate(canopyStart,canopyHeight);
           angleMode(DEGREES);
           rotate(angle);
            drawPunct('83',canopySize + random(-9,9),0,0,leafColor);

            if((angle % 5) == 0 ){


                   if (inBounds(0+canopyStart, 0+canopyHeight) ){
                   drawPunct('.',canopySize, 0 + random(-canopySize *.72,canopySize *.75), 0 + random(-canopySize *.75,canopySize *.75),fruitColor);
                 }
            }
            pop();


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
