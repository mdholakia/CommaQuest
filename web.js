
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
      if(!foundP1 && (subCell[j][0] < windowWidth/4)) {
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

  //
  // //WITH FLOORING
  // for (i = 0; i < (cellArray.length); i ++) {
  //   let subCell = cellArray[i];
  //   for (j = 0; j < subCell.length; j+=1) {
  //     let p1 = subCell[j];
  //     let p2 = subCell[(j+1) % subCell.length];
  //     //is this what is causing our strings?
  //     let p1Paths = allPairs[p1.map(floor)] || [];
  //     let p2Paths = allPairs[p2.map(floor)] || [];
  //     p1Paths.push(p2.map(floor));
  //     p2Paths.push(p1.map(floor));
  //     allPairs[p1.map(floor)] = p1Paths;
  //     allPairs[p2.map(floor)] = p2Paths;
  //   }
  // }


  //check if things are types
  // let keys =  Object.keys(allPairs);
  // for(i = 0; i <keys.length ; i++  ) {
  //
  //     //this is x
  //
  //     if((typeof keys[i][0] != "number" || typeof keys[i][1] != "number"   )) {
  //       console.log ("this is the node  "  + i + "  x val  " + keys[i][0] + "  y val  " + keys[i][1]);
  //
  //     }
  //
  //
  //       }


  var firstPair = Object.entries(allPairs)[0]


  var firstValue = firstPair[1][0];
  // console.log(cellArray);
  // spider = new spiderCircle(firstValue[0], firstValue[1])
  //spider = new spiderCircle(firstPoint[0], firstPoint[1])


  // step 2, plan the spiders path


  // SAD:FLJSD:LFKJ
  // function isOkToDraw(x, index) {
  //   return index % 2 == 1 &&  x.length > 0;
  // }
  // allCells = cellArray.filter(isOkToDraw);
  // allCellsIndex = 0;
  // spiderPath = allCells[allCellsIndex];
  // spiderPathIndex = 0;
  // let pointOnLine = spiderPath[spiderPathIndex];
  // spider = new spiderCircle(pointOnLine[0],pointOnLine[1]);




  //console.log(jitter);
  //console.log(jitter[0][1]);

//spider scene global vars


}
