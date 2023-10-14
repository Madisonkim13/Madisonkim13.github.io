var numberOfButtons = 7;
var buttonSize = 100
var offset = 0
var radius;

var buttons = [];

var links = [
    "dark.html",
    "doll.html",
    "heart.html",
    "heights.html",
    "light.html",
    "small.html",
    "web.html",
]

function preload() {
    soundFormats('mp3');
    mySound = loadSound('assets/cover.mp3');
    
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // var test = createImg("assets/spider-Sprite.png", "");
    // var test2 = createA("heights2.html", "");
    // test.parent(test2);
    // test.position(10, 10)
    rectMode(CENTER);
    noStroke();

    radius = Math.min(windowWidth / 2, windowHeight / 2) * 0.7;

    for (var i = 0; i < numberOfButtons; i++) {
        var x = windowWidth / 2 + radius * Math.sin(i / numberOfButtons * Math.PI * 2 + offset)
        var y = windowHeight / 2 + radius * Math.cos(i / numberOfButtons * Math.PI * 2 + offset)
        var c = 255;
        buttons.push({x: x, y: y, c: c, currentX: x, currentY: y});
    }

    mySound.loop();
}

function draw() {
    background(0)

    for (var i = 0; i < numberOfButtons; i++) {
        if (mouseX < buttons[i].x + buttonSize / 2 && mouseX > buttons[i].x - buttonSize / 2 &&
            mouseY < buttons[i].y + buttonSize / 2 && mouseY > buttons[i].y - buttonSize / 2) {
                buttons[i].currentX += Math.random() * 10 - 5;
                buttons[i].currentY += Math.random() * 10 - 5;
            }
    }
    buttons.map(drawButton)
    buttons.map(resetButton)
}

function drawButton(b) {
    fill(b.c);
    rect(b.currentX, b.currentY, buttonSize, buttonSize);
}

function resetButton(b) {
    b.currentX = b.x;
    b.currentY = b.y;
    b.c;
}

function mouseClicked() {
    for (var i = 0; i < numberOfButtons; i++) {
        if (mouseX < buttons[i].x + buttonSize / 2 && mouseX > buttons[i].x - buttonSize / 2 &&
            mouseY < buttons[i].y + buttonSize / 2 && mouseY > buttons[i].y - buttonSize / 2) {
                window.open(links[i]);
                window.close();
            }
    }
}