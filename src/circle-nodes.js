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

    // TODO: improve collision detection
    checkCollision(objects) {
        objects.forEach(obj => {
            if (obj.id != this.id && distance(this.x, this.y, obj.x, obj.y) <= 2*Shape.radius) {
                this.direction = Math.atan2((this.y-obj.y), (this.x-obj.x));
                // this.changeDirection();
            }
        });
    }

};


// global variables
var canvas = document.getElementById("circle-canvas");
var ctx = canvas.getContext("2d");
ctx.lineWidth = 1;

// generate objects
const objectCount = 40; // 25 prolly
var objects = [];
for (let i = 0; i < objectCount; i++) {
    let shape = Shape.Random(canvas.width, canvas.height)
    objects.push(shape);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach(shape => shape.draw(ctx));
    objects.forEach(shape => shape.checkCollision(objects));
    objects.forEach(shape => shape.update());
}

setInterval(draw, 1000/50); // 50fps