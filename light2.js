var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;

var rain= [];
var rainingNow=true;

var lightningNow = false;

var mySound; 

function preload() {
  soundFormats('mp3');
  mySound = loadSound('assets/lightning.mp3');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(15);
  x2 = 0;
  y2 = windowHeight / 2;


  for (i=0; i< 100; i++) {
    rain[i]= new Rain(random(0, windowWidth), random(0, windowHeight), i);
  }
}

function draw() {
    background(0, 0, 50);

    if (rainingNow==true) {
      for (i =0; i< rain.length; i++) {
        rain[i].dropRain();
      }
    }

    if (lightningNow == true) {
    for (var i = 0; i < 30; i++) {
      x1 = x2;
      y1 = y2;
      x2 = x1 + int(random(-20, 20));
      y2 = y1 + int(random(-10, 20));
      strokeWeight(random(1, 3));
      stroke(255, 255, random(0, 255));

      line(x1, y1, x2, y2);
      line(x1 + 100, y1, x2+ 100, y2);
      line(x1 + 300, y1, x2+ 300, y2);
  
  
      line(windowWidth - x1, y1, windowWidth- x2, y2);
      line(windowWidth - x1 - 100, y1, windowWidth - x2- 100 , y2);
      line(windowWidth - x1 - 300, y1, windowWidth - x2- 300 , y2);
  
      if ((y2 > windowHeight)) {
        clear();
  
        x2 = int(random(50, windowWidth- 50));
        y2 = 0;
        lightningNow = false;
  
      }
    }
  }



}




function Rain(x,y,i) {
  this.x= x;
  this.y= y;
  this.length = 15; 
  this.r =0;
  this.opacity= 200; 
  this.i = i;

  this.dropRain= function()
  {
    noStroke();
    fill(255, 255, 255, 200);
    ellipse(this.x, this.y, 3, this.length)
    this.y= this.y + 6
    if (this.y > windowHeight) {
      this.length= this.length-5;
    }
    if (this.length < 0) {
      this.length=0;
      rain[i] = new Rain(random(0, windowWidth), 0, i)
    }
 
  }

}
function mousePressed() {
  mySound.play()
  lightningNow = true;
  
}

