var buildings = [];
var heightValue = 1;

var _xOffset;
var _yOffset;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // create buildings
    var space = 75;
    var size = 30;
    for (var i = windowWidth / 2 / space; i >= 0; i--) {
        for (var j = windowHeight / 2 / space; j >= 0; j--) {
            var b = new Building(-i * space - size, -j * space - size / 2, size, size);
            buildings.push(b);
        }
    }
}

function draw() {
    background(255)

    // at the moment, heightValue is controlled by the mouse.
    heightValue = mouseX / windowWidth;
// 

    // if(mouseIsPressed) {
    //     console.log("a")
    //     if (heightValue == 1) {
    //         heightValue = 0.99
    //     } else {
    //         heightValue = heightValue ** 2
    //     }

    // } else {
    //     if (heightValue == 0) {
    //         heightValue += 0.01
    //     } else {
    //     heightValue = heightValue ** 0.5
    //     }
    // }

    for (var i = 0; i < buildings.length; i++) {
        buildings[i].drawReflect();
    }

    
}

// ----------------------------------------------------------
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //distance between this point and an other
    dist(other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2), + Math.pow(this.y - other.y), 2);
    }

    offSet(pt) {
        return new Point(this.x - pt.x, this.y - pt.y);
    }
}

class Building {
    // always top left side of screen
    // p0 - top left
    // p1 - top right
    // p2 - bottom left
    // p3 - bottom right
    constructor(xOffset, yOffset, w, h) {
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.w = w;
        this.h = h;
        this.p0 = new Point(xOffset, yOffset);
        this.p1 = new Point(xOffset - w, yOffset);
        this.p2 = new Point(xOffset, yOffset - h);
        this.p3 = new Point(xOffset - w, yOffset - h);
    }

    drawReflect() {
        this.drawLinesReflect();

        stroke(0);
        strokeWeight(1);
        fill(255);
        rect(windowWidth / 2 - this.xOffset, windowHeight / 2 - this.yOffset, this.w, this.h);
        rect(windowWidth / 2 + this.xOffset - this.w, windowHeight / 2 - this.yOffset, this.w, this.h);  
        rect(windowWidth / 2 - this.xOffset, windowHeight / 2 + this.yOffset - this.h, this.w, this.h);  
        rect(windowWidth / 2 + this.xOffset - this.w, windowHeight / 2 + this.yOffset - this.h, this.w, this.h);
    }

    drawLinesReflect() {
        var o = new Point(- windowWidth / 2, - windowHeight / 2);

        var end0 = new Point(-o.x + this.p0.x * (1 - heightValue), -o.y + this.p0.y * (1-heightValue));
        var end1 = new Point(-o.x + this.p1.x * (1 - heightValue), -o.y + this.p1.y * (1 - heightValue));
        var end2 = new Point(-o.x + this.p2.x * (1 - heightValue), -o.y + this.p2.y * (1 - heightValue));

        var _p0 = this.p0.offSet(o)
        var _p1 = this.p1.offSet(o);
        var _p2 = this.p2.offSet(o);

        //pointPolygon draws sharp edges so we use it to fill and draw lines indvidually
        noStroke();
        fill(255);
        pointPolygonReflect([_p0, _p1, end1, end0]);
        fill(0);
        pointPolygonReflect([_p0, end0, end2, _p2]);

        stroke(0);
        strokeWeight(1);
        pointLineReflect(_p0, _p1);
        pointLineReflect(_p1, end1);
        pointLineReflect(end1, end0);
        pointLineReflect(end0, end2);
        pointLineReflect(end2, _p2);
        pointLineReflect(_p2, _p0);
        pointLineReflect(_p0, end0);
        
    }

}

function lineReflect(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
    line(windowWidth - x1, y1, windowWidth - x2, y2);
    line(x1, windowHeight - y1, x2, windowHeight - y2);
    line(windowWidth - x1, windowHeight - y1, windowWidth - x2, windowHeight - y2);
}

function pointLineReflect(p1, p2) {
    lineReflect(p1.x, p1.y, p2.x, p2.y);
}

// draws a polygon using an array of points
function pointPolygon(pointArray) {
    beginShape();
    for (var i = 0; i < pointArray.length; i++) {
        vertex(pointArray[i].x, pointArray[i].y);
    }
    endShape(CLOSE);

}

// draws a polygon reflected 4 times
function pointPolygonReflect(pts) {
    var pts2 = [];
    var pts3 = [];
    var pts4 = [];

    for (var i = 0; i < pts.length; i++) {
        pts2.push(new Point(windowWidth - pts[i].x, pts[i].y));
        pts3.push(new Point(pts[i].x, windowHeight - pts[i].y));
        pts4.push(new Point(windowWidth - pts[i].x, windowHeight - pts[i].y));
    }

    pointPolygon(pts);
    pointPolygon(pts2);
    pointPolygon(pts3);
    pointPolygon(pts4);
}

// // functions for drawing squares with mouse, used for testing
// var _mouseX;
// var _mouseY;

// function keyReleased() {
//     buildings.pop();
// }
  
// function mousePressed() {
//     _mouseX = mouseX;
//     _mouseY = mouseY;
// }
  
// function mouseReleased() {
//     var x1 = _mouseX - windowWidth / 2;
//     var y1 = _mouseY - windowHeight / 2;
//     var x2 = mouseX - windowWidth / 2;
//     var y2 = mouseY - windowHeight / 2;
  
//     var b = new Building((x1 + x2) / 2, (y1 + y2) / 2, Math.abs(x1 - x2), Math.abs(y1 - y2))
  
//     buildings.push(b);
// }