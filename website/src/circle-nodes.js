const CIRCLE = 0;
const RECT = 1;
const TRI = 2;

const COLOURS = ["lightgreen", "lightblue", "pink", "orange", "yellow", "violet", "red"]; // 6 colours
const SHAPES = [CIRCLE, RECT, TRI]; // 3 shapes

// global variables
var canvas2 = document.getElementById("circle-canvas");
var ctx = canvas2.getContext("2d");

// -------------------------------------------------------------------------- //

var id = 0;
function idGen() {
    id += 1;
    return id;
}

function colourNameToRGB(colour) {
    var colours = {"black":"#000000","blue":"#0000ff","cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined') {
        let cs = colours[colour.toLowerCase()];
        return [ cs.slice(1, 3), cs.slice(4, 6), cs.slice(7, 8)].map(s => parseInt(s, 16));
    }
        
    return false;
}

// -------------------------------------------------------------------------- //

function distance(x, y, x2, y2) {
    return Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
}

// returns true iff the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function intersects(a,b,c,d,p,q,r,s) {
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

// returns the closest distance from a point in the line segment 1->2 to p.
function distanceToCircle(px, py, x1, y1, x2, y2) {
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

        xint = (px + m1*m1 * x1 + (py - y1) * m1) / (m1*m1 + 1);
        yint = m1 * (xint - x1) + y1;
    }

    if (xint <= maxx && xint >= minx && yint <= maxy && yint >= miny) {
        return [xint, yint, distance(px, py, xint, yint)];
    } else if (distance(x1, y1, xint, yint) >= distance(x2, y2, xint, yint)) {
        return [xint, yint, distance(px, py, x2, y2)];
    } else {
        return [xint, yint, distance(px, py, x1, y1)];
    }
}

// -------------------------------------------------------------------------- //

function drawShape(shape, ctx) {
    ctx.fillStyle = shape.colour;
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, Shape.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

/*
function drawPixel(shape, ctx) {
    ctx.fillStyle = shape.colour;
    ctx.fillRect(shape.x, shape.y, 1, 1);
}*/

class Shape {
    static speed = 1;
    static radius = 10;

    static Random(canvasHeight, canvasWidth) {
        let colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        return new Shape(Math.random() * canvasHeight, Math.random() * canvasWidth, colour);
    }
    
    constructor(x, y, colour) {
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
        
        if (this.x > canvas2.width) { this.x = canvas2.width; this.changeDirection(); }
        else if (this.y > canvas2.height) { this.y = canvas2.height; this.changeDirection(); }
    }

    // TODO: improve collision detection by a bit.
    checkCollision(objects) {
        objects.forEach(obj => {
            if (obj.id != this.id && distance(this.x, this.y, obj.x, obj.y) <= 2*Shape.radius) {
                this.direction = Math.atan2((this.y-obj.y), (this.x-obj.x));
            }
        });

        // checks if this item collides with any line segments, and if so it bounces off the first one in the list only.
        for(let i = 0; i < lineSegments.length; i++) {
            let line = lineSegments[i];
            let [xint, yint, distance] = distanceToCircle(this.x, this.y, line.x, line.y, line.lastx, line.lasty);
            if (distance <= Shape.radius) {
                this.direction = Math.atan2((this.y-yint), (this.x-xint));
                break;
            }
        }
    }

};

class MouseSegment {
    constructor(x, y, lastx, lasty) {
        this.x = x;
        this.y = y;

        this.lastx = lastx;
        this.lasty = lasty;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.lastx, this.lasty);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }
}

// -------------------------------------------------------------------------- //

const epsilon = 1;
const minLineSegments = 3;
const minSegmentSize = 15;

var isMouseDown = false;

// setting up mouse event listeners.
canvas2.addEventListener("mousemove", function (e) {
    if (isMouseDown && distance(e.offsetX, e.offsetY, lastPoint[0], lastPoint[1]) >= minSegmentSize) {
        //checks if the point is close to the starting point to set mousedown to false.
        if (lineSegments.length > minLineSegments && distance(e.offsetX, e.offsetY, startPoint[0], startPoint[1]) <= epsilon) {
            isMouseDown = false;
            lineSegments.push(new MouseSegment(lastPoint[0], lastPoint[1], startPoint[0], startPoint[1]));
            checkSelection();
            return;
        }

        // checks if the newest line intersects somewhere, and if it does, then it stops
        for(let i = 0; i < lineSegments.length-2; i++) {
            let line = lineSegments[i];
            let hasIntersection = intersects(e.offsetX, e.offsetY, lastPoint[0], lastPoint[1], line.x, line.y, line.lastx, line.lasty);
            if (hasIntersection) {
                isMouseDown = false;
                lineSegments.push(new MouseSegment(lastPoint[0], lastPoint[1], startPoint[0], startPoint[1]));
                checkSelection();
                return;
            }
        }

        lineSegments.push(new MouseSegment(lastPoint[0], lastPoint[1], e.offsetX, e.offsetY));
        lastPoint = [e.offsetX, e.offsetY];
    }
}, false);

canvas2.addEventListener("mousedown", function (e) {
    startPoint = [e.offsetX, e.offsetY];
    lastPoint = [e.offsetX, e.offsetY];
    console.log("testse");
    lineSegments = [];
    isMouseDown = true;
}, false);

canvas2.addEventListener("mouseup", function (e) {
    if (isMouseDown) { checkSelection(); }
    isMouseDown = false;
}, false);


function inCanvas(x) {
    return x >= 0 && x < canvas2.width; // assumes canvas2 is square.
}

function checkSelection() {
    // Uses the polygon intersection algorithm!
    // -> for each node check if it is in the shape. all current should be in and not current outside.
    // time is O(nodes * pathlen)

    let isValid = true;
    for(let i = 0; i < objects.length; i++) {
        let shape = objects[i];
        let intersections = 0;
        lineSegments.forEach(segment => { 
            if(intersects(shape.x, shape.y, 0, 0, segment.x, segment.y, segment.lastx, segment.lasty)) {
                intersections += 1;
            }
        });

        if (shape.colour == targetColour && intersections % 2 == 0) {
            isValid = false;
            break;
        } else if (shape.colour != targetColour && intersections % 2 == 1) {
            isValid = false;
            break;
        }
    }

    if(isValid) {
        // first, find positions of all nodes with a certain colour.
        let colouredNodes = [];
        objects.forEach(shape => { if (shape.colour == targetColour) {colouredNodes.push(shape.id);} });
        
        // removes all nodes of the valid colour.
        colouredNodes.forEach(el => {
            let index = objects.findIndex(obj => obj.id == el);
            objects.splice(index, 1);
        });

        lineSegments = [];
        circleCaptchaComplete = true;
        document.getElementById("cap3-complete").innerHTML = "You completed this captcha!";
        alert("Correct Captcha, you have actually captchad them all!!");

    } else {
        lineSegments = [];
    }
}

// -------------------------------------------------------------------------- //

var startPoint = [];
var lastPoint = [];
var lineSegments = [];

// generate objects
const objectCount = 25; // 25 prolly
var objects = [];
for (let i = 0; i < objectCount; i++) {
    let shape = Shape.Random(canvas2.width, canvas2.height)
    objects.push(shape);
}

// -------------------------------------------------------------------------- //

function draw() {
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    objects.forEach(shape => shape.draw(ctx));
    objects.forEach(shape => shape.checkCollision(objects));
    objects.forEach(shape => shape.update());

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    lineSegments.forEach(segment => segment.draw(ctx));
}

setInterval(draw, 1000/50); // 50fps

// -------------------------------------------------------------------------- //

var circleCaptchaComplete = false;
var selectedColours = [];
var targetColour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
document.getElementById("cap3-title").innerHTML = "Captcha 3: Circle all of the " + targetColour + " nodes only";
