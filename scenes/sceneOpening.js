function SceneOpening() {
let clearBool;
let sceneExitDelay;
let buttonX;
let buttonY;
let x = 0;
let w = displayWidth;
let y = 0;
let h = displayHeight;
let cPos
  this.setup = () => {
    buttonX = windowWidth/2 - buttonBegin.width/3 + 10;
    buttonY = windowHeight/2 + buttonBegin.height/2 + 25 + 50;
    sceneExitDelay = false;
    cPos = 0;
  }


  this.draw = () => {

    // let fakeColor = color(get(0,0));
    // background(240)
    randomSeed(5);
    background(0);
    fill(0);
    cursor();
    fill(0);
        for(let i = 0; i < 400; i++) {
        fill(255,255,255, random(150,255));
        circle(random(0, w), random(0, h),1);
        fill(255);
        circle(random(0, w), random(0, h),2);

      }

      rectMode(CENTER); // Set rectMode to CENTER
      noFill();
      stroke(255);
      strokeWeight(1.5);

      rect(windowWidth/2, windowHeight/2, windowWidth/3*2.5, windowHeight/3*2.5,4); // Draw gray rect using CENTER mode
      noStroke();
      rectMode(CORNER);
    let string = "You can use arrow keys and mouse-clicks to interact with the world."
    fill(0);
    textFont("Amatic SC");
    var textBoxSize= 600;




    // text(string,windowWidth/2 , windowHeight/2 - 100,textBoxSize);
    image(titleCard, windowWidth/2 - titleCard.width/2 ,windowHeight/2 - titleCard.height + 90);
    textLeading(28);
    fill(0);

   textSize(40);
   textFont("Amatic SC");

   let button = "Begin"
   fill(0);
   fill(255);
   image(buttonBegin, buttonX + 20,buttonY,buttonBegin.width/2, buttonBegin.height/2);
   //text(button,textStart, sceneTopMargin * 2/3 + titleCard.height + 40,textBoxSize);

   if(clearBool) {
     background(color(0));
     randomSeed(5);
     fill(0);
         for(let i = 0; i < 400; i++) {
         fill(255,255,255, random(150,255));
         circle(random(0, w), random(0, h),1);
         fill(255);
         circle(random(0, w), random(0, h),2);

       }
     fill(255);
     textSize(30);
     textAlign(LEFT);
     textFont("Roboto");
       noCursor();
     var textStart = windowWidth/2 - textBoxSize/2;
     text(string,textStart,windowHeight/2 - 40,textBoxSize);

     if(!sceneExitDelay){
     setTimeout(function() {
       mgr.showNextScene();
     }, 3000);
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
