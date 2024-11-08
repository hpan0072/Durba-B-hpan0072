let colors = [];
let bigCircles = [];
let smallStrokeCircles = [];
let kpatternColors = [];
let kCircle = [];
let concentricCircles = [];
let whiteDotLayers = [];
let yellowDotLayers = [];

// Music and FFT variables
let song, fft;
let button;

function preload() {
  song = loadSound('assets/Music.MP3'); // Load the music file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  fft = new p5.FFT(0.8, 64); // FFT with smoothing and 64 frequency bins
  song.connect(fft);

  button = createButton('Play/Pause');
  button.position((width - button.width) / 2, height - button.height - 20);
  button.mousePressed(playPause);

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
  // Populate bigCircles array
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

function playPause() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.loop();
  }
}
function draw() {
  background(200);
  // Draw big circles
for (let circle of bigCircles) {
  circle.display();
}
//draw the dottedline circles
for(let kcircles of kCircle){
  kcircles.display();
}

let spectrum = fft.analyze(); // Get FFT spectrum data
  // Update and display each layer based on the frequency spectrum
  for (let concentric of concentricCircles) {
    concentric.display(map(spectrum[20], 0, 255, 1, 3)); // Scale concentric circles based on music
  }

  for (let strokeCircle of smallStrokeCircles) {
    strokeCircle.draw(map(spectrum[10], 0, 255, 0.8, 1.2)); // Scale stroke circles based on music
  }
  for (let i = 0; i < whiteDotLayers.length; i++) {
    whiteDotLayers[i].display(map(spectrum[i % spectrum.length], 0, 255, 0.05, 0.3));
  }

  for (let i = 0; i < yellowDotLayers.length; i++) {
    yellowDotLayers[i].display(map(spectrum[i % spectrum.length], 0, 255, 0.05, 0.3));
  }}


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
    let x = width * this.xScale;
    let y = height * this.yScale;
    ellipse(x, y, this.r);
  }
}
    class ConcentricCircle {
      constructor(parentCircle, colors) {
        this.parentCircle = parentCircle;
        this.colors = colors;
        this.shiftSpeed = 0; // Control shift speed using FFT
      }
    
      display(scale = 1) {
        if (!this.parentCircle) return;
    
        let x = width * this.parentCircle.xScale;
        let y = height * this.parentCircle.yScale;
        let baseRadius = this.parentCircle.r * 0.3 * scale;
    
        // Update shift speed from FFT (e.g., spectrum[10]) to slow down shifts, but only if song is playing
        if (song.isPlaying()) {
          let shiftIntensity = map(fft.getEnergy("lowMid"), 0, 255, 0, 1); // Using a lower frequency band for a smooth effect
          this.shiftSpeed += shiftIntensity * 0.02; // Smaller multiplier for a slower effect
          if (this.shiftSpeed >= 1) {
            this.colors.unshift(this.colors.pop()); // Rotate colors
            this.shiftSpeed = 0; // Reset shift speed
          }
        }
    
        // Draw each layer with the shifted color order
        for (let i = 0; i < this.colors.length; i++) {
          let radius = baseRadius * (1 - i * 0.2) * scale;
          fill(this.colors[i]);
          noStroke();
          ellipse(x, y, radius);
        }
      }
    }

class WhiteDotLayers {
  constructor(bigCircle, numLayers, numDots) {
    this.bigCircle = bigCircle;
    this.numLayers = numLayers;
    this.numDots = numDots;
  }

  display(scale = 1) {
    if (!this.bigCircle) return;

    let x = width * this.bigCircle.xScale;
    let y = height * this.bigCircle.yScale;
    for (let layer = 1; layer <= this.numLayers; layer++) {
      let radius = this.bigCircle.r * 0.3 * scale + layer * 5;
      for (let i = 0; i < this.numDots; i++) {
        let angle = TWO_PI / this.numDots * i;
        let dotX = x + radius * cos(angle);
        let dotY = y + radius * sin(angle);
        fill(255);
        noStroke();
        ellipse(dotX, dotY, 20 * scale);
      }}}}

class YellowDotLayers {
  constructor(bigCircle, numLayers, numDots) {
    this.bigCircle = bigCircle;
    this.numLayers = numLayers;
    this.numDots = numDots;
  }

  display(scale = 1) {
    if (!this.bigCircle) return;

    let x = width * this.bigCircle.xScale;
    let y = height * this.bigCircle.yScale;
    fill('#fabd4d');
    noStroke();
    for (let layer = 1; layer <= this.numLayers; layer++) {
      let radius = this.bigCircle.r * 0.2 * scale + layer * 5;
      for (let i = 0; i < this.numDots; i++) {
        let angle = TWO_PI / this.numDots * i;
        let dotX = x + radius * cos(angle);
        let dotY = y + radius * sin(angle);
        ellipse(dotX, dotY, 20 * scale);
      }}}}



      class SmallStrokeCircle {
        constructor(bigCircle, r, fillColor, strokeColor, strokeWeightVal, hasFill) {
          this.bigCircle = bigCircle;
          this.r = r;
          this.fillColor = fillColor;
          this.strokeColor = strokeColor;
          this.strokeWeightVal = strokeWeightVal;
          this.hasFill = hasFill;
        }
      
        display(scale = 1) {
          if (!this.bigCircle) return;
      
          let x = width * this.bigCircle.xScale;
          let y = height * this.bigCircle.yScale;
          let radius = this.r * scale;
          if (this.hasFill) fill(this.fillColor);
          else noFill();
          stroke(this.strokeColor);
          strokeWeight(this.strokeWeightVal);
          ellipse(x, y, radius);
        }
      }


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button.position((width - button.width) / 2, height - button.height - 20);
}
