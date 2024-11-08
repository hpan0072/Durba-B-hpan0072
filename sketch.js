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

  // Initialize colors, circles, and layers
  colors = [color('#242062'), color('#0C63AD'), color('#0E99A2'), color('#FDCE23'), color('#199646'), color('#DF3E86'), color('#F0A428')];
  
  // Populate bigCircles array
  let r = min(width, height) * 0.35;
  bigCircles = [
    new Circle(0.1, 0.05, r, colors[0]),
    new Circle(0.11, 0.43, r, colors[1]),
    new Circle(0.05, 0.8, r, colors[2]),
    new Circle(0.35, 0, r, colors[3]),
    new Circle(0.3, 0.38, r, colors[4])
  ];

  // Initialize concentric circles, whiteDotLayers, yellowDotLayers, and smallStrokeCircles
  concentricCircles.push(new ConcentricCircle(bigCircles[0], colors));
  whiteDotLayers.push(new WhiteDotLayers(bigCircles[1], 3, 12));
  yellowDotLayers.push(new YellowDotLayers(bigCircles[3], 3, 12));
  smallStrokeCircles.push(new SmallStrokeCircle(bigCircles[2], r * 0.5, null, color('#EF3D29'), 1, false,true));
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

  let spectrum = fft.analyze(); // Get FFT spectrum data

  // Update and display each layer based on the frequency spectrum
  for (let i = 0; i < whiteDotLayers.length; i++) {
    whiteDotLayers[i].display(map(spectrum[i % spectrum.length], 0, 255, 0.1, 0.3));
  }

  for (let i = 0; i < yellowDotLayers.length; i++) {
    yellowDotLayers[i].display(map(spectrum[i % spectrum.length], 0, 255, 0.1, 0.3));
  }

  for (let concentric of concentricCircles) {
    concentric.display(map(spectrum[20], 0, 255, 1, 3)); // Scale concentric circles based on music
  }

  for (let strokeCircle of smallStrokeCircles) {
    strokeCircle.draw(map(spectrum[10], 0, 255, 0.8, 1.2)); // Scale stroke circles based on music
  }
}

// Class definitions

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
      }
    }
  }
}

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
      }
    }
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

class SmallStrokeCircle {
  constructor(bigCircle, r, fillColor, strokeColor, strokeWeightVal, hasFill) {
    this.bigCircle = bigCircle;
    this.r = r;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWeightVal = strokeWeightVal;
    this.hasFill = hasFill;
  }

  draw(scale = 1) {
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
