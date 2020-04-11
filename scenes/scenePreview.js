function ScenePreview() {
  let x = 0;
  let w = displayWidth;
  let y = 0;
  let h = displayHeight;
  let cPos

  this.setup = () => {
    cPos = 0;


  }


  this.draw = () => {
    randomSeed(5);
  background(0);
  noCursor();
  fill(0);
      for(let i = 0; i < 400; i++) {
      fill(255,255,255, random(150,255));
      circle(random(0, w), random(0, h),1);
      fill(255);
      circle(random(0, w), random(0, h),2);

    }
  circle(windowWidth/2, cPos + displayHeight/3, 4);
  cPos = cPos + 3;
  if (cPos > windowHeight) {
    mgr.showNextScene();
  }

  }

this.mouseClicked = () => {

}


}
