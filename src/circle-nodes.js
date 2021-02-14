function button_press2() {
    alert('button was pressed!');
}

const CIRCLE = 0;
const RECT = 1;
const TRI = 2;

const COLOURS = ["lightgreen", "lightblue", "pink", "orange", "yellow", "violet", "red"]; // 6 colours
const SHAPES = [CIRCLE, RECT, TRI]; // 3 shapes

var id = 0;
function idGen() {
    id += 1;
    return id;
}

function distance(x, y, x2, y2) {
    return Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
}

// returns the closest distance from a point in the line segment 1->2 to p.
function hasIntersect(px, py, px2, py2, x1, y1, x2, y2) {
    let minx = Math.min(x1, x2);
    let maxx = Math.max(x1, x2);
    let miny = Math.min(y1, y2);
    let maxy = Math.max(y1, y2);

    let xint = 0; 
    let yint = 0;
    
    if (x1 - x2 == 0) { // case: line is vertical
        xint = x2;
        yint = py;
    } else if (y1 - y2 == 0) { // case: line is horizontal
        xint = px;
        yint = y2;
    } else {
        let m1 = (y1 - y2) / (x1 - x2); 
        let m2 = (py - py2) / (px - px2);

        xint = (-m2 * px + m1 * x1 + py - y1) / (m1 - m2);
        yint = m1 * (xint - x1) + y1;
        
    }

    if (xint <= maxx && xint >= minx && yint <= maxy && yint >= miny) {
        return true; //distance(px, py, xint, yint);
    } else {
        return false; 
    }
}

function drawShape(shape, ctx) {
    ctx.fillStyle = shape.colour;
    if (shape.type == CIRCLE) {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, Shape.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    } else if (shape.type == RECT) {

    } else if (shape.type == TRI) {

    } else {
        console.log("wot");
    }
}

class Shape {
    static speed = 1;
    static radius = 10;

    static Random(canvasHeight, canvasWidth) {
        // TODO: RANDOM shape.
        let colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        return new Shape(CIRCLE, Math.random() * canvasHeight, Math.random() * canvasWidth, colour);
    }
    
    constructor(type, x, y, colour) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.colour = colour;

        this.id = idGen(); // each object has a unique id.
      
        this.direction = 0;
        this.changeDirection();
    }

    changeDirection() {
        this.direction = Math.random() * 2 * Math.PI - Math.PI; // random theta
    }

    draw(ctx) {
        drawShape(this, ctx);
    }

    update() {
        // move in direction
        this.x += Shape.speed * Math.cos(this.direction);
        this.y += Shape.speed * Math.sin(this.direction);

        // basic bounds checking.
        if (this.x < 0) { this.x = 0; this.changeDirection(); }
        else if (this.y < 0) { this.y = 0; this.changeDirection(); }
        
        if (this.x > canvas.width) { this.x = canvas.width; this.changeDirection(); }
        else if (this.y > canvas.height) { this.y = canvas.height; this.changeDirection(); }
    }

    // TODO: improve collision detection by 2x
    checkCollision(objects) {
        objects.forEach(obj => {
            if (obj.id != this.id && distance(this.x, this.y, obj.x, obj.y) <= 2*Shape.radius) {
                this.direction = Math.atan2((this.y-obj.y), (this.x-obj.x));
            }
        });

        // TODO: collide with line segments.
    }

};

class MouseSegment {
    constructor(x, y, lastx, lasty) {
        this.x = x;
        this.y = y;

        this.lastx = lastx;
        this.lasty = lasty;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.lastx, this.lasty);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}


// global variables
var canvas = document.getElementById("circle-canvas");
var ctx = canvas.getContext("2d");

const epsilon = 3;
const minLineSegments = 10; // about 200ms or so

var isMouseDown = false;
// setting up mouse event listeners.
canvas.addEventListener("mousemove", function (e) {
    if (isMouseDown) {
        lineSegments.push(new MouseSegment(lastPoint[0], lastPoint[1], e.offsetX, e.offsetY));
        lastPoint = [e.offsetX, e.offsetY];
    
        //checks if the point is close to the starting point to set mousedown to false.
        if (lineSegments.length > minLineSegments && distance(e.offsetX, e.offsetY, startPoint[0], startPoint[1]) <= epsilon) {
            isMouseDown = false;
        }

        // checks if the newest line intersects, if it does, then it stops
        let recentLines = 2;
        for(let i = 0; i < lineSegments.length-1-recentLines; i++) {
            let line = lineSegments[i];
            let hasIntersection = hasIntersect(e.offsetX, e.offsetY, startPoint[0], startPoint[1], line.x, line.y, line.lastx, line.lasty);
            if (hasIntersection) { // & line bigger than a certain amount.
                isMouseDown = false;
                break;
            }
        }
    }
}, false);

canvas.addEventListener("mousedown", function (e) {
    startPoint = [e.offsetX, e.offsetY];
    lastPoint = [e.offsetX, e.offsetY];
    lineSegments = [];
    isMouseDown = true;
}, false);

canvas.addEventListener("mouseup", function (e) {
    isMouseDown = false;
}, false);

/*
canvas.addEventListener("mouseout", function (e) {
    //findxy('out', e)
}, false);
*/

var startPoint = [];
var lastPoint = [];
var lineSegments = [];

// generate objects
const objectCount = 30; // 25 prolly
var objects = [];
for (let i = 0; i < objectCount; i++) {
    let shape = Shape.Random(canvas.width, canvas.height)
    objects.push(shape);
}

function draw() {
    if (isMouseDown) {
        // ?
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    objects.forEach(shape => shape.draw(ctx));
    objects.forEach(shape => shape.checkCollision(objects));
    objects.forEach(shape => shape.update());

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    lineSegments.forEach(segment => segment.draw());
}

setInterval(draw, 1000/50); // 50fps