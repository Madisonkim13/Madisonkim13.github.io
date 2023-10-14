var eyeC = 100;
var radius = 50;
var eyes = []
var back = 255;
var numberOfClicks = 0;



function preload() {
    soundFormats('mp3');
    mySound = loadSound('assets/dark.mp3');
    
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    eyes.push(new Eye(450, 400, true))
}

function draw() {
    back = back - Math.random() * 2

    if (mouseIsPressed) {
        background(255 - Math.random()*50)
    } else {
        background (back + Math.random() * 30 - 15);
        if (back < 0) {
            for(var i = 0; i < eyes.length; i++) {
                eyes[i].draw()
            } 
        }
    }
}

class Eye {
    constructor(x, y, isRed) {
        this.x = x;
        this.y = y;
        this.isRed = isRed;
        this.isBlinking = true;
        this.blinkTime = 30 + Math.random() * 60;
        this.t = this.blinkTime / 2;
    }
    
    draw() {
        noStroke();

        if (this.isRed) {
            fill (eyeC, 0, 0);
        } else {
            fill(eyeC, eyeC, 0)
        }

        if (this.isBlinking) {
            ellipse(this.x - radius, this.y,  40, 30 - Math.sin(this.t / this.blinkTime * Math.PI) *30); 
            ellipse(this.x + radius, this.y,  40, 30 - Math.sin(this.t / this.blinkTime * Math.PI) *30); 
            this.t++;

            if (this.t > this.blinkTime) {
                this.isBlinking = false;
                this.t = 0;
            }
        } else {
            ellipse(this.x - radius, this.y,  40, 30); 
            ellipse(this.x + radius, this.y,  40, 30); 

            if (Math.random() < 0.01) {
                this.isBlinking = true;
                this.t = 0;
                this.blinkTime = 30 + Math.random() * 60;
            }
        }
        
        // pupils
        fill(0);
        ellipse(this.x - radius, this.y, 10, 30); 
        ellipse(this.x + radius, this.y, 10, 30);
    }
}

function mouseClicked() {
    if (numberOfClicks == 0) {
        eyes.push(
            new Eye(700, 300, false),
            new Eye(700, 600, true)

        )

        mySound.play(); 
    }

    if (numberOfClicks == 1) {
        eyes.push(
            new Eye(450, 150, false),        
            new Eye(700, 300, false),
            new Eye(450, 750, true),
            new Eye(150, 300, false),
            new Eye(150, 600, true),
            new Eye(1000, 150, true),
        )
    }

    if (numberOfClicks == 2) {
        eyes.push( 
            new Eye(1000, 400, true),
            new Eye(1000, 750, false)
        )
    }

    numberOfClicks++;
}

function mouseReleased (){
    back = 0;
}
  