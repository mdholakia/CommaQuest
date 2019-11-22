
// this function sets up the defaults for our voronoi web. It is called by sketch.js in setup.
function webSet()  {


  //setting up spider


  voronoiJitterStepMax(20);
  //Minimum distance between jitters
  voronoiJitterStepMin(10);

  	voronoiSiteStrokeWeight(0 );

  //Scales each jitter
  voronoiJitterFactor(2);
  //Jitter edges of diagram

  voronoiJitterBorder(true);
  voronoiSiteFlag(false);
  //Sets 30 random sites with 50 minimum distance to be added upon computing
	//Please note that this method is just for testing, you should use your own
	//method for placing random sites with minimum distance
  //voronoiRndSites(50, 4);

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
    console.log("new spiral");

    //append(cells,voronoiGetSite(x, y, false));

   }
}



  voronoi(windowWidth, windowHeight, true);
  var diagram = voronoiGetDiagram();
  let cellArray = voronoiGetCellsJitter();

  append(cells,diagram.cells[0]);
  append(jitter, cellArray);

  function isNotEmpty(x) {
    return x.length > 0;
  }
  var notEmptyCells = cellArray.filter(isNotEmpty);
  var subCell = notEmptyCells[round(random(0,notEmptyCells.length - 1))];
  let pointOnLine = subCell[round(random(0,subCell.length - 1))];
  spider = new spiderCircle(pointOnLine[0],pointOnLine[1]);




  //console.log(jitter);
  //console.log(jitter[0][1]);

//spider scene global vars


}
