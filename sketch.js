let colors = [];
let bigCircles = [];
let smallStrokeCircles = [];
let kpatternColors = [];
let kCircle = [];
let concentricCircles = [];
let whiteDotLayers = [];
let yellowDotLayers = [];

// Set up the canvas and initialize circles
function setup() {
  createCanvas(windowWidth, windowHeight);
  
//color array  
colors = [
  color('#242062'),//1 a
  color('#0C63AD'),//2 b
  color('#0E99A2'),//3 c
  color('#FDCE23'),//4 d
  color('#199646'),//5 f
  color('#FDCE23'),//6 d
  color('#DF3E86'),//7 e
  color('#F0A428'),//8 g
  color('#DF3E86'),//9 e
  color('#F0A428'),//10 g
  color('#0C63AD'),//11 b
  color('#F0A428'),//12 g
  color('#199646'),//13 f
  color('#242062'),//14 a
  color('#0E99A2'),//15 c
  color('#FDCE23')//16 d
 ];

  // Calculate radius based on canvas size
  let r = min(width, height) * 0.35;

  // Initialize big circles
  bigCircles = [
    new Circle(0.1, 0.05, r, colors[0]),
    new Circle(0.11, 0.43, r, colors[1]),
    new Circle(0.05, 0.8, r, colors[2]),
    new Circle(0.35, 0, r, colors[3]),  
    new Circle(0.3, 0.38, r, colors[4]), 
    new Circle(0.24, 0.75, r, colors[5]),//6
    new Circle(0.17, 1.1, r, colors[6]),//7
    new Circle(0.5, 0.26, r, colors[7]),//8
    new Circle(0.45, 0.68, r, colors[8]),//9
    new Circle(0.40, 1.05, r, colors[9]),//10
    new Circle(0.7, 0.24, r, colors[10]),//11
    new Circle(0.68, 0.61, r, colors[11]),//12
    new Circle(0.63, 0.98, r, colors[12]),//13
    new Circle(0.89, 0.08, r, colors[13]),//14
    new Circle(0.9, 0.57, r, colors[14]),//15
    new Circle(0.87, 1, r, colors[15])//16
  ];
//kate's pattern, dotted line circles
kpatternColors = [
  color('#FFFFFF'),//4
  color('#0C63AD'),//6
  color('#b780b7'),//8
  color('#FFFFFF'),//12
  color('#FDCE23'),//14
  color('#FFFFFF')//16
  ];

kCircle = [
  new kCircles(bigCircles[3].xScale, bigCircles[3].yScale, r, kpatternColors[0]),
  new kCircles(bigCircles[5].xScale, bigCircles[5].yScale, r, kpatternColors[1]),
  new kCircles(bigCircles[7].xScale, bigCircles[7].yScale, r, kpatternColors[2]),
  new kCircles(bigCircles[11].xScale, bigCircles[11].yScale, r, kpatternColors[3]),
  new kCircles(bigCircles[13].xScale, bigCircles[13].yScale, r, kpatternColors[4]),
  new kCircles(bigCircles[15].xScale, bigCircles[15].yScale, r, kpatternColors[5])
  ]

  // Small stroke circles with specified colors and locations
  smallStrokeCircles = [
    new SmallStrokeCircle(bigCircles[1], r * 0.4, null, color('#D43E8E'), 40, true), //  circle 2
    new SmallStrokeCircle(bigCircles[1], r * 0.2, null, color('#879F88'), 25, true), //  circle 2
    new SmallStrokeCircle(bigCircles[1], r * 0.1, null, color('#EF3D29'), 15, true), //  circle 2

    new SmallStrokeCircle(bigCircles[2], r * 0.2, null, color('#BE479A'), 30, true), //  circle 3
    new SmallStrokeCircle(bigCircles[2], r * 0.2, null, color('#F05656'), 15, true), //  circle 3
    new SmallStrokeCircle(bigCircles[2], r * 0.07, null, color('#BE479A'), 30, true), //  circle 3
    new SmallStrokeCircle(bigCircles[2], r * 0.07, null, color('#F05656'), 15, true), //  circle 3

    new SmallStrokeCircle(bigCircles[4], r * 0.3, null, color('#F05641'), 15, true), // circle 5
    new SmallStrokeCircle(bigCircles[4], r * 0.2, null, color('#D43E8E'), 15, true), // circle 5
    new SmallStrokeCircle(bigCircles[4], r * 0.1, null, color('#F05641'), 15, true), // circle 5
    new SmallStrokeCircle(bigCircles[4], r * 0.01, null, color('#42A959'), 15, true), // circle 5
    
    new SmallStrokeCircle(bigCircles[8], r * 0.4, null, color('#F05641'), 15, true), // circle 9
    new SmallStrokeCircle(bigCircles[8], r * 0.3, null, color('#FFB6E3'), 10, true), // circle 9
    new SmallStrokeCircle(bigCircles[8], r * 0.2, null, color('#F05641'), 15, true), // circle 9
    new SmallStrokeCircle(bigCircles[8], r * 0.1, null, color('#FFB6E3'), 10, true), // circle 9

    new SmallStrokeCircle(bigCircles[9], r * 0.9, null, color('#DA70AC'), 10, true), //  circle 10
    new SmallStrokeCircle(bigCircles[9], r * 0.8, null, color('#D43E8E'), 20, true), //  circle 10

    new SmallStrokeCircle(bigCircles[10], r * 0.2, null, color('#879F88'), 25, true), //  circle 11
    new SmallStrokeCircle(bigCircles[10], r * 0.1, null, color('#EF3D29'), 15, true), //  circle 11


    new SmallStrokeCircle(bigCircles[11], r * 0.15, null, color('#DA70AC'), 30, true), //  circle 12

    new SmallStrokeCircle(bigCircles[14], r * 0.2, null, color('#BE479A'), 30, true), //  circle 15
    new SmallStrokeCircle(bigCircles[14], r * 0.2, null, color('#F05656'), 15, true), //  circle 15
    new SmallStrokeCircle(bigCircles[14], r * 0.07, null, color('#BE479A'), 30, true), //  circle 15
    new SmallStrokeCircle(bigCircles[14], r * 0.07, null, color('#F05656'), 15, true), //  circle 15
   
    
    
   
    new SmallStrokeCircle(bigCircles[15], r * 0.4, null, color('#F05641'), 15, true), // circle 16
    new SmallStrokeCircle(bigCircles[15], r * 0.3, null, color('#FFB6E3'), 10, true), // circle 16
    new SmallStrokeCircle(bigCircles[15], r * 0.2, null, color('#F05641'), 15, true), // circle 16
    new SmallStrokeCircle(bigCircles[15], r * 0.1, null, color('#FFB6E3'), 10, true), // circle 16
   
   
    
    new SmallStrokeCircle(bigCircles[1], r * 0.34, null, color('#F05641'), 15, false, true), //  circle 2
    new SmallStrokeCircle(bigCircles[1], r * 0.4, null, color('#F05641'), 10, false, true), //  circle 2

    new SmallStrokeCircle(bigCircles[9], r * 0.3, null, color('#D22C91'), 12, false, true), //  circle 10
    new SmallStrokeCircle(bigCircles[9], r * 0.2, null, color('#DDD64E'), 8, false, true), //  circle 10

    new SmallStrokeCircle(bigCircles[10], r * 0.34, null, color('#F05641'), 15, false, true), //  circle 11
    new SmallStrokeCircle(bigCircles[10], r * 0.4, null, color('#F05641'), 10, false, true), //  circle 11

    new SmallStrokeCircle(bigCircles[11], r * 0.3, null, color('#D22C91'), 12, false, true), //  circle 12
    new SmallStrokeCircle(bigCircles[11], r * 0.2, null, color('#DDD64E'), 8, false, true), //  circle 12
  ];

  whiteDotLayers = [
    new WhiteDotLayers(bigCircles[5], 3, 18),
    new WhiteDotLayers(bigCircles[7], 3, 12),
    new WhiteDotLayers(bigCircles[9], 3, 12)
  ]
 yellowDotLayers = [
    new YellowDotLayers(bigCircles[0], 3, 12),
    new YellowDotLayers(bigCircles[2], 3, 14),
    new YellowDotLayers(bigCircles[1], 4, 16),
    new YellowDotLayers(bigCircles[4], 3, 12),
    new YellowDotLayers(bigCircles[6], 4, 18),
    new YellowDotLayers(bigCircles[12], 3, 16),
    new YellowDotLayers(bigCircles[14], 4, 12),]
     
// Define color palettes for concentric circles
  let concentricFiveLayerColors = [color('#199646'), color('#DF3E86'), color('#0C63AD'), color('#FDCE23'), color('#BFC3BF')];
  let concentricThreeLayerColors1 = [color('#BFC3BF'), color('#FDCE23'), color('#DF3E86')];
  let concentricThreeLayerColors2 = [color('#BFC3BF'), color('#FDCE23'), color('#0C63AD')];

  // Initialize concentric circles for bigCircles，the number will Decrease by one because in the array
  concentricCircles.push(new ConcentricCircle(bigCircles[0], concentricFiveLayerColors));
  concentricCircles.push(new ConcentricCircle(bigCircles[2], concentricFiveLayerColors));
  concentricCircles.push(new ConcentricCircle(bigCircles[3], concentricFiveLayerColors));
  concentricCircles.push(new ConcentricCircle(bigCircles[6], concentricFiveLayerColors));
  concentricCircles.push(new ConcentricCircle(bigCircles[12], concentricFiveLayerColors));
  concentricCircles.push(new ConcentricCircle(bigCircles[13], concentricFiveLayerColors));
  concentricCircles.push(new ConcentricCircle(bigCircles[8], concentricThreeLayerColors1));
  concentricCircles.push(new ConcentricCircle(bigCircles[10], concentricThreeLayerColors2));
}


// Circle class for big circles
class Circle {
  constructor(xScale, yScale, r, color) {
    this.xScale = xScale; 
    this.yScale = yScale; 
    this.r = r;
    this.color = color;
  }

  display() {
    fill(this.color);
    noStroke();
      //x and y actual position are width*scale factors
    let x = width * this.xScale;
    let y = height * this.yScale;
    ellipse(x, y, this.r);
  }
}

class kCircles {
  constructor(x, y, r, color){
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  display(){
    noFill();
    stroke(this.color);
    strokeWeight(2);

    //4 layers of dotted lines
    let layers = 4;
    for(let i = 1; i <= layers; i++){
      //smaller r value refers to more dense dotted lines
      let r = this.r + this.r * i/2;

      let x = width * this.x;
      let y = height * this.y;
      //adjust r to cater for the size of the circle
      //I failed to use any formula to calculate the r value
      //so I tried different values and r/7 is perfect
      let step = 0.5;
      for(let i = 0; i < TWO_PI; i += step){
        let x1 = x + cos(i) * (r/7);
        let y1 = y + sin(i) * (r/7);
        let x2 = x + cos(i + 0.15) * (r/7);
        let y2 = y + sin(i + 0.15) * (r/7);

        line(x1, y1, x2, y2);
    }
  }
}

}
  
class SmallStrokeCircle {
  constructor(bigCircle, r, fillColor, strokeColor, strokeWeightVal, hasFill, isDashed = false) {
    this.bigCircle = bigCircle;
    this.r = r;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor; 
    this.strokeWeightVal = strokeWeightVal;
    this.hasFill = hasFill;
    this.isDashed = isDashed;
  }

  draw() {
    let x = width * this.bigCircle.xScale;
    let y = height * this.bigCircle.yScale;

    if (this.isDashed) {
        this.drawDashedCircle(x, y, this.r);
    } else {
        if (this.hasFill && this.fillColor) {
            fill(this.fillColor);
        } else {
            noFill();
        }
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeightVal);
        ellipse(x, y, this.r);
    }}

drawDashedCircle(x, y, diameter) {
    let numDashes = 20; // Number of dashes in the circle
    let angleStep = TWO_PI / numDashes;
    let gapRatio = 0.7; // Ratio of gap size to total segment size (adjust this to change spacing)
    stroke(this.strokeColor);
    strokeWeight(this.strokeWeightVal);
    strokeCap(ROUND); // Makes the ends of dashes rounded

    for (let i = 0; i < numDashes; i++) {
        let angle = i * angleStep;
        let x1 = x + cos(angle) * diameter / 2;
        let y1 = y + sin(angle) * diameter / 2;
        let x2 = x + cos(angle + angleStep * (1 - gapRatio)) * diameter / 2;
        let y2 = y + sin(angle + angleStep * (1 - gapRatio)) * diameter / 2;
        line(x1, y1, x2, y2);
    }}}

// ConcentricCircle class with multiple layers and colors
class ConcentricCircle {
  constructor(parentCircle, colors) {0
    this.parentCircle = parentCircle; // Associate with bigCircle
    this.colors = colors;
  }

  display() {
    let x = width * this.parentCircle.xScale;
    let y = height * this.parentCircle.yScale;
    let baseRadius = this.parentCircle.r * 0.3;
    let layers = this.colors.length;

    // Draw each layer with progressively smaller radii
    for (let i = 0; i < layers; i++) {
      let radius = baseRadius * (1 - i * 0.2); // Decreasing radius for each layer
      noStroke();
      fill(this.colors[i]);
      ellipse(x, y, radius * 10/layers);
    }
  }
}
// White dot layers class
class WhiteDotLayers {
  constructor(bigCircle, numLayers, numDots) {
    this.bigCircle = bigCircle;
    this.numLayers = numLayers;
    this.numDots = numDots;
   
  }
  display() {
    let x = width * this.bigCircle.xScale;
    let y = height * this.bigCircle.yScale;
    for (let layer = 1; layer <= this.numLayers; layer++) {
      let radius = this.bigCircle.r * 0.3 + layer * 30;
      for (let i = 0; i < this.numDots; i++) {
        let angle = TWO_PI / this.numDots * i;
        let dotX = x + radius * cos(angle);
        let dotY = y + radius * sin(angle);
        fill(255);
        noStroke();
        ellipse(dotX, dotY, 20);
      }
    }
  }
}
// Yellow dot layers class
class YellowDotLayers {
  constructor(bigCircle, numLayers, numDots) {
    this.bigCircle = bigCircle;
    this.numLayers = numLayers;
    this.numDots = numDots;
    
  }

  display() {
    let x = width * this.bigCircle.xScale;
    let y = height * this.bigCircle.yScale;
    fill('#fabd4d');
    noStroke();
    for (let layer = 1; layer <= this.numLayers; layer++) {
      let radius = this.bigCircle.r * 0.20 + layer * 30;
      for (let i = 0; i < this.numDots; i++) {
        let angle = TWO_PI / this.numDots * i;
        let dotX = x + radius * cos(angle);
        let dotY = y + radius * sin(angle);
        ellipse(dotX, dotY, 20);
      }
    }
  }
}

function draw() {
  background(255);

  // Draw big circles
  for (let circle of bigCircles) {
    circle.display();
  }

  
  // Draw concentric circles
  for (let concentric of concentricCircles) {
    concentric.display();
  }
   //draw the dottedline circles
   for(let kcircles of kCircle){
    kcircles.display();
  }

  // Draw small stroke circles on top
  for (let smallCircle of smallStrokeCircles) {
    smallCircle.draw();
  }
  //Draw white dot layers
  for (let dotLayer of whiteDotLayers){ dotLayer.display();
  }
  // Draw yellow dot layers
  for (let dotLayer of yellowDotLayers) {dotLayer.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
