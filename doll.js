
var mySound;
var mic;
var t;
var numberOfCandles = 5;

function preload() {
    soundFormats('mp3');
    mySound = loadSound('assets/doll.mp3')
    // mySound.playMode(sustain);

}

function setup() {
    createCanvas(windowWidth, windowHeight); 

    mic= new p5.AudioIn();
    mic.start();
    
    mySound.loop()
    mySound.setVolume(0.2)      ;

    rectMode(CENTER)
    ellipseMode(CENTER)

}


function draw() {
    var vol= mic.getLevel();

    background(vol*150, vol*50, 0);


    var threshold = 0.05
    if (vol < threshold) {
        console.log("play")
            if (frameCount - t > 40) {
            mySound.setVolume(0.2);
        }

    } else {
        console.log("pause");
        // if (mySound.isLooping()) {
            mySound.setVolume(0);
            t = frameCount;
        // }
    }

    drawCandle(windowWidth/2, windowHeight/2 - 300, vol)
    drawCandle(windowWidth/2-250, windowHeight/2-150, vol)
    drawCandle(windowWidth/2+250, windowHeight/2-150, vol)
    drawCandle(windowWidth/2-125, windowHeight/2+100, vol)
    drawCandle(windowWidth/2+125, windowHeight/2+100, vol)
}

function drawCandle(x, y, v) {
    stroke(200)
    fill(255)
    arc(x, y+60, 100, 50, Math.PI, 0)
    noStroke()
    fill(255);
    rect(x, y+160-25, 100, 150);
    fill(150);
    rect(x, y+60, 15, 30); 

    noStroke();
    fill(255, 0, 0);
    ellipse(x, y-10, v * 100, 150)
    fill(255, 125, 0);
    ellipse(x, y-10, v * 60, 100);
    fill(255, 255, 0);
    ellipse(x, y-10, v * 30, 50); 
    


    stroke(200)
    noFill()
    arc(x, y+60, 100, 50, 0, Math.PI)
    fill(255)
    arc(x, y+210, 100, 50, 0, Math.PI)
    noStroke()
    
}
