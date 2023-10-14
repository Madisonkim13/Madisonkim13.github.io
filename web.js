var maxR;
var n = 0;
var axis = 8 * 2;
var parts = []
var dR = 20;
var threads = [];

var spriteSheet;
var frames = [];
var frameWidth = 69;

var webComplete = false;
var spidersCrossing = false;
var lost = false;

var spidersR;
var spidersCrossSpeed = 8;
var webRetractSpeed = 4

var spiderX = 0;
var spiderY = 0;
var spiderSpeed = 4;

var mySound;

function preload() {
    spriteSheet = loadImage ('assets/Spider-Sprite.png');

    soundFormats('mp3');
    mySound = loadSound('assets/scuttling.mp3');

    
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    ellipseMode(CENTER);
    imageMode(CENTER);

    maxR = (windowWidth**2 + windowHeight**2)**0.5 / 2
    spidersR = maxR;
    spiderX = windowWidth / 2;
    spiderY = windowHeight / 2;

    for (var i = 0; i < 7; i++) {
        frames.push(spriteSheet.get(i*frameWidth, 0, frameWidth, 90));
        frames[i].filter(GRAY)
    }
    mySound.loop();
}

function draw() {
    background(0);


    // lines
    push();
    translate(windowWidth / 2, windowHeight / 2);
    stroke(255);
    for (var i = 0; i < axis; i++) {
        var theta = Math.PI * ((i + 0.5) / axis) * 2;
        line(0, 0, maxR*Math.sin(theta), maxR*Math.cos(theta));
    }
    pop();

    // web
    if (! webComplete) {
        build()
    } 
    stroke(255);
    noFill();
    threads.map(drawArc);

    if (webComplete && ! lost) {
        startGame();
    }

    if (lost) {
        spidersCross();
        retract(webRetractSpeed);
    }

}

function build() {
    if (n >= 0 && n < 15 * axis) {
        threads.push(makeThread(n));

        n++
    }
    else if (n >= 0) {
        for (var i = 0; i < axis; i++) {
            threads.push(makeThread(n+i));
        }
        n += axis;
    }

    if (n / axis * dR > maxR) {
        webComplete = true;
    }
}

function makeThread(x) {
    var r = dR * Math.floor(x / axis) + 1;
    var a = x * Math.PI / axis * 2;
    var w = r * Math.sin(Math.PI / axis) / Math.sin((Math.PI - Math.PI / axis)/2) * 2;

    return {a: a, r: r, w: w};
}

function retract(speed) {
    if (n >= 0) {
        n -= speed;
        for (var i = 0; i < speed; i++) {
            threads.pop();
        }
    } else {
        n = 0;
    }
}

function spidersCross() {
    spidersR -= spidersCrossSpeed;

    push();
    translate(windowWidth/2, windowHeight/2);
    for (var i = 0; i < axis; i++) {
        var theta = Math.PI * ((i + 0.5) / axis) * 2;
        spider(spidersR * Math.cos(theta), spidersR * Math.sin(theta), (theta) % (2 * Math.PI));
    }
    pop();

    if (spidersR <= -maxR) {
        spidersR = maxR;
        webComplete = false;
        lost = false;
        spiderX = windowWidth / 2;
        spiderY = windowHeight / 2;
        spiderSpeed = 4;
    }
}

function startGame() {
    var diffX = mouseX - spiderX;
    var diffY = mouseY - spiderY;

    var spiderDirection = Math.atan2(diffY, diffX);
    spiderX += spiderSpeed * Math.cos(spiderDirection);
    spiderY += spiderSpeed * Math.sin(spiderDirection);


    spider(spiderX, spiderY, spiderDirection);

    spiderSpeed += 0.1;

    var tolerance = 50;
    if (Math.abs(diffX) < tolerance && Math.abs(diffY) < tolerance) {
        lost = true;
    }
}

function drawArc(thread) {
    push();
    translate(windowWidth / 2, windowHeight / 2);
    rotate(thread.a);
    translate(0, -thread.r);
    arc(0, 0, thread.w, thread.w, 0, Math.PI);
    pop();

}

function spider(x, y, r) {
    frame = Math.floor(frameCount / 2) % frames.length;

    push();
    translate(x, y);
    rotate((r + Math.PI / 2) % Math.PI);
    image(frames[frame], 0, 0);
    pop();
}
