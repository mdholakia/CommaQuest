function SceneOpening() {


  this.setup = () => {
  }


  this.draw = () => {
    cursor();
    let string = "You can use arrow keys and mouse-click to interact with the world. To begin, move the circle onto the square.  "
    fill(0);
    textFont("Amatic SC");
    var textBoxSize= 480;
    textAlign(CENTER);
    textSize(18);
    background(color(0,0,0));
    // text(string,windowWidth/2 , windowHeight/2 - 100,textBoxSize);
    image(titleCard, sceneMargin - 150,sceneTopMargin);
    textLeading(28);
    fill(235);
    textFont("Verdana");
   text(string,windowWidth * .53, sceneTopMargin + 60,textBoxSize);
   fill(255);
   rect(0,0,100,100);
  }

this.mouseClicked = () => {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    console.log("I'm trying to full screen")
    fullscreen(!fs);

  }
}

}
