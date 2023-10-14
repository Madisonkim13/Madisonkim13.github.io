
var mySound;
var mySound2;
var mySound3;
// var mic;
var amp;
var volhistory = [];
var offset = 0;
var t = 0;

function preload() {
    soundFormats('mp3');
    mySound = loadSound('assets/heartbeat.mp3');
    mySound2= loadSound('assets/flatline.mp3');

    mySound3= loadSound('assets/breathing.mp3')

}

function setup() {
    createCanvas(windowWidth, windowHeight); 
    // mic= new p5.AudioIn();
    // mic.start();
    amp= new p5.Amplitude();
    frameRate(120)

    mySound2.setVolume(0.7);
    mySound3.setVolume(0.4);

    background(0)

}

function draw() {

    background(0, 0, 0, 3);

     
    var vol= amp.getLevel();
    volhistory.push(vol);
    
    // var vol= mic.getLevel();
    var x = frameCount - t

    var k = 2;
    offset = -( Math.sin(x/10) * (100 - 0.5*x));

    if(x > 200) {
        offset = 0;
    }

 for (var i = 1; i < 4; i++ ) {
        noStroke()
        if(i == 1) {
            fill(255,0,0)
        } else if (i == 2) {
            fill(0,255,0)
        } else {
            fill(0,0,255)
        }
    ellipse(frameCount % windowWidth, windowHeight*i/4  + offset, 10, 20);
    ellipse((frameCount+50) % windowWidth, windowHeight*i/4  + offset+100, 10, 20);
    // ellipse(frameCount % windowWidth/2, windowHeight*i/5  + offset, 15, 20);
    ellipse(windowWidth - (frameCount % windowWidth), windowHeight*i/4  + offset, 10, 20)
    ellipse(windowWidth - (frameCount+50) % windowWidth, windowHeight*i/4  + offset+100, 10, 20);
    // ellipse(windowWidth - (frameCount % windowWidth/2), windowHeight*i/5  - offset, 15, 20)
    // ellipse(windowWidth - (frameCount % windowWidth/2), windowHeight*i/5  + offset, 15, 20)
  

 }

    if(x == 180) {
            mySound2.loop();
            mySound3.pause();
    }

    // for (var i=0; i< volhistory.length; i++);
    // var y =map(volhistory[i], 0, 1, windowHeight, 0);
    // vertex(i, y);
}


function keyPressed () {
    mySound.play(); 
    t = frameCount;
    mySound2.pause()

    if(! mySound3.isLooping()) {
        mySound3.loop();
    }

}





// function canvasPressed() {
//     mySound.play(); 
// }