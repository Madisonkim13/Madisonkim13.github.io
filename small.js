
var space = 800
var _mouseX;
var _mouseY;
var sens = 1500;

var rotX = 0;
var rotY = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

  }

  
function draw() {
  scale(0.5);
  background(0);


  push();
  // normalMaterial();
  translate(0, 0, Math.min(-180 +frameCount, 700));
  rotY += 0.003;
  noFill(0);
  stroke(255);
  strokeWeight(5)

  if (-180 + frameCount > 700) {
    if (mouseIsPressed){
      rotY += (_mouseX - mouseX) / Math.PI / sens;
      rotX += (_mouseY - mouseY) / Math.PI / sens;
    }
  }
  rotateX(rotX);
  rotateY(rotY);
  sphere(space, 20, 20);
}

function mousePressed() {
  _mouseX = mouseX
  _mouseY = mouseY
}