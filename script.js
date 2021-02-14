var code;
function generator() {
    if ( !!!document.createElement('canvas').getContext ) {
        return false;
    }

    let min = Math.ceil(6);
    let max = Math.floor(9);
    let op = Math.floor(Math.random() * (max - min + 1) + min)/10;

    document.getElementById("captcha").innerHTML = "";
    var Charachter_Data = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){}|?<>";
    var Capthca_length = 6;
    var captcha = [];
    for (var i = 0; i < Capthca_length; i++) {
        var index = Math.floor(Math.random() * Charachter_Data.length + 1);
        if (captcha.indexOf(Charachter_Data[index]) == -1)
            captcha.push(Charachter_Data[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    var ctx = canv.getContext("2d");

    let x;
    let y;
    let number;
    let opacity = op;

    canv.width = 185;
    canv.height = 50;

    for ( x = 0; x < canv.width; x++ ) {
        for ( y = 0; y < canv.height; y++ ) {
            number = Math.floor( Math.random() * 100 );
            ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";
            ctx.fillRect(x, y, 1, 1);
        }
        }

    let grain_number = Math.floor( Math.random() * 1000);
    let counter;

    for ( counter = 0; counter < grain_number; counter++ ) {
            let grainsx = Math.floor(Math.random() * (185 - 0 + 1) + 0)
            let grainsy = Math.floor(Math.random() * (50 - 0 + 1) + 0)
            number = Math.floor( Math.random() * 1000);
            ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";
            ctx.fillRect(grainsx, grainsy, 1, 1);
    }

    var url = canv.toDataURL();
    var newImg = document.createElement("img");
    newImg.src = url;

    ctx.textAlign = "start"; 
    ctx.font = '25px "Comic Sans MS", cursive, sans-serif';
    ctx.strokeText(captcha.join(""), 30, 30);
    code = captcha.join("");
    document.getElementById("captcha").appendChild(canv);
}

function validator() {
    event.preventDefault();
    debugger;
    if (document.getElementById("Captcha_Box").value == code) {
        alert("Correct Captcha, please move forward!");
        generator();
    } else {
        alert("Invalid Captcha. Please try again.");
        generator();
    }
}