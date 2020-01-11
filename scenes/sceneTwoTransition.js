function SceneTwoTransition() {

let startX;
let startY;
let crumbs;
let specCrumbs;
let endX;
let endY;


  this.setup = () => {
    faceTrans = new smileyFace(sceneTopMargin,mouseY,100);
    faceTrans.leftEye = true;
    startX = mouseX;
    startY = mouseY;
    endX = sceneMargin;
    endY = sceneBottomMargin;
    let startVec = createVector(startX,startY);
    let endVec = createVector(endX,endY);

     crumbs = [];
     specCrumbs = {
      length: 40,
      0: createVector(0.6741573033707865,0.6744868035190615),
      1: createVector(0.6629213483146067,0.6422287390029325),
      2:createVector(0.6629213483146067,0.6422287390029325),
      3:createVector(0.6629213483146067,0.6422287390029325),
      4:createVector(0.6448189762796505,0.5943304007820137),
      5:createVector(0.6210986267166042,0.5513196480938416),
      6:createVector(0.5986267166042447,0.5210166177908113),
      7:createVector(0.5642946317103621,0.49364613880742914),
      8:createVector(0.5305867665418227,0.4838709677419355),
      9:createVector(0.5062421972534332,0.46920821114369504),
      10:createVector(0.4656679151061174,0.45454545454545453),
      11:createVector(0.4188514357053683,0.4359726295210166),
      12:createVector(0.38264669163545567,0.41055718475073316),
      13:createVector(0.3782771535580524,0.3870967741935484),
      14:createVector(0.3757802746566791,0.3479960899315738),
      15:createVector(0.3857677902621723,0.32160312805474095),
      16:createVector(0.4069912609238452,0.30498533724340177),
      17:createVector(0.4363295880149813,0.2991202346041056),
      18:createVector(0.46878901373283394,0.29521016617790813),
      19:createVector(0.49063670411985016,0.2913000977517107),
      20:createVector(0.49063670411985016,0.24535679374389052),
      21:createVector(0.47503121098626716,0.21114369501466276),
      22:createVector(0.43196004993757803,0.19159335288367546),
      23:createVector(0.398876404494382,0.20039100684261973),
      24:createVector(0.3595505617977528,0.20332355816226785),
      25:createVector(0.3252184769038702,0.2287390029325513),
      26:createVector(0.30274656679151063,0.2697947214076246),
      27:createVector(0.2852684144818976,0.31671554252199413),
      28:createVector(0.27902621722846443,0.3675464320625611),
      29:createVector(0.2752808988764045,0.41935483870967744),
      30:createVector(0.2752808988764045,0.49560117302052786),
      31:createVector(0.27902621722846443,0.5366568914956011),
      32:createVector(0.28963795255930086,0.5826001955034213),
      33:createVector(0.299625468164794,0.6383186705767351),
      34:createVector(0.31273408239700373,0.6881720430107527),
      35:createVector(0.3233458177278402,0.7409579667644184),
      36:createVector(0.3383270911360799,0.7966764418377321),
      37:createVector(0.3433208489388265,0.8621700879765396),
      38:createVector(0.3383270911360799,0.9032258064516129),
      39:createVector(0.3089887640449438,0.9217986314760508),
      40:createVector(0.27403245942571786,0.9081133919843597),






     }
  }


  this.draw = () => {

    textDisplay("You follow stone steps cut into a mossy landscape.")

    cursor();

  fill(0);
  circle(startX,startY,20);
  fill(255);

  //textFont("Amatic SC");
  drawPunct('X',100,endX,endY,0);
  textFont("Caveat Brush");

  randomSeed(40);
  for(let i = 0;i <specCrumbs.length; i++) {
  fill(140,0,150);
  // circle(specCrumbs[i].x* windowWidth,specCrumbs[i].y* windowHeight,random(10,20));
  drawPunct('-',random(50,200),specCrumbs[i].x* windowWidth,specCrumbs[i].y * windowHeight,0);

  }
  faceTrans.display(50);
  moveTwoTransition(faceTrans);

  }


  function moveTwoTransition(face) {
  face.x = mouseX;
  face.y = mouseY;

  }
  function onX(face) {
    if(((face.x > endX - 50) && (face.x < endX + 50)) && ((face.y > endY - 50) && face.y <endY + 50)) {
      mgr.showNextScene();

    }
  }
  function stepSound() {
    if(colorMatch(face.x,face.y)) {

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

  this.mouseClicked = () => {
    onX(faceTrans);
  }
}
