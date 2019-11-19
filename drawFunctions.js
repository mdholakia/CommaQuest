
// Draw functions includes functions which draw images to our screen. This does not include objects which have their own internal display functions.

function drawPunct(char,size,x,y,color) {

noSmooth();
noStroke();
var c = color;
fill(c);
textSize(size);
text(char,x,y);

}


function specialTree() {

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

    face.move(50);
    face.display();
  }
  else {

    //draw the single interactive tree (the fruit has not fallen yet)

    drawPunct("Y",specialTreeSize,specialTreeX,specialTreeY,7);

    treeCanopy(specialTreeSize,specialTreeX,specialTreeY,10,color(255,0,10));

    fruit.draw();

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
