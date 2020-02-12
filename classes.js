//Classes.js includes all shared classes for Comma Quest scenes

class smileyFace {
constructor(xpos,ypos, radius) {

this.radius = 25;
this.x = xpos;
this.y = ypos;
this.leftEye = false;
this.rightEye = false;
this.mouth = false;
this.upsideDownMouth = false;
this.nose = false;

}

halo() {
fill(color(255,255,255,.4))
circle(this.x,this.y,this.radius +35)
}
move(rad,face) {
face.x = mouseX;
face.y = mouseY;
face.radius = rad;

}

display(rad) {

if(rad!= null){
this.radius = rad;
}

noCursor();
textFont('Caveat Brush');
fill(255);
noStroke();
circle(this.x,this.y,this.radius);
if(this.radius > 20) {
beginShape();
angleMode(RADIANS);
for(var i = 0; i < TWO_PI ; i+= .1) {
let xOff = map(noise(i) * sin(i*4),-1,1,-5,5);
let yOff = map(noise(i) * sin(i*4),-1,1,-5,5);
let x = this.x +xOff + (this.radius -23) * cos(i);
let y = this.y +yOff + (this.radius - 23) * sin(i );
vertex(x, y);
}

endShape();
}
if (this.leftEye) {
noStroke();
fill(0);
var leftX = (this.x - (.3*this.radius));
var leftY= (this.y - (.08*this.radius));
drawPunct(".",this.radius/2.5,leftX,leftY,20)

//circle(leftX,leftY,this.radius/30);
}

if (this.rightEye) {
noStroke();
fill(0);
var rightX =(this.x + (.3*this.radius));
var rightY=(this.y - (.08*this.radius));
drawPunct(".",this.radius/2.5,rightX,rightY,20)

}

if(this.mouth) {
noFill();
stroke(0);
arc(this.x, this.y + .12*this.radius, 1.5*(leftX-this.x),this.radius/3 ,0, PI);
//inverse mouth
}

if(this.upsideDownMouth) {

noFill();
stroke(0);
arc(this.x, this.y  + .3*this.radius, 1.5*(leftX-this.x),this.radius/3,PI, TWO_PI);

}

if(this.nose) {
drawPunct("[",this.radius/2.5,this.x - (.05*this.radius),(this.y +(.02*this.radius))  ,20);
drawPunct("] ",this.radius/2.5,this.x + (.05*this.radius),(this.y + (.02*this.radius)),20)

}




}


inverseDisplay(rad){

if(rad!= null){
this.radius = rad;
}
noCursor();
if(displayCheck(this)){
fill(255);
push()
translate(this.x, this.y);
var oldX = this.x;
var oldY = this.y;

rotate(PI);
this.x = 0;
this.y = 0;
this.display(rad);

pop();
this.x = oldX;
this.y = oldY;
}
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

sceneThree();
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
