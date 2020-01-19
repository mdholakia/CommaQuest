function SceneOpening() {
let clearBool;
let sceneExitDelay;
let buttonX;
let buttonY;
  this.setup = () => {
    buttonX = displayWidth/2 - buttonBegin.width/3;
    buttonY = sceneTopMargin * 2/3 + titleCard.height + 20;
    sceneExitDelay = false;

  }


  this.draw = () => {
    let fakeColor = color(get(0,0));
    background(255);
    cursor();
    let string = "You can use arrow keys and mouse-clicks to interact with the world. "
    fill(0);
    textFont("Amatic SC");
    var textBoxSize= 350;
    textAlign(CENTER);
    textSize(20);



    // text(string,windowWidth/2 , windowHeight/2 - 100,textBoxSize);
    image(titleCard, displayWidth/2 - titleCard.width/2,sceneTopMargin * 2/3);
    textLeading(28);
    fill(0);
    textFont("IM Fell Double Pica");
    var textStart = displayWidth/2 - textBoxSize/2;
   text(string,textStart, sceneTopMargin * 2/3 + titleCard.height + 100,textBoxSize);
   textSize(40);
   textFont("Amatic SC");

   let button = "Begin"
   fill(0);
   fill(255);
   image(buttonBegin, buttonX,buttonY,buttonBegin.width/2, buttonBegin.height/2);
   //text(button,textStart, sceneTopMargin * 2/3 + titleCard.height + 40,textBoxSize);

   if(clearBool) {
     background(color(0));
     if(!sceneExitDelay){
     setTimeout(function() {
       mgr.showNextScene();
     }, 1500);
     sceneExitDelay = true;
    }
   }



}

this.mouseClicked = () => {
  if (mouseX > buttonX && mouseX < (buttonX + buttonBegin.width/2) && mouseY > buttonY && mouseY < (buttonY + buttonBegin.height/2)) {
    clearBool = true;
    let fs = fullscreen();

    fullscreen(!fs);

  }
}


}
