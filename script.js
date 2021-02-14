var code;
function generator() {
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
    canv.width = 100;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = '25px "Comic Sans MS", cursive, sans-serif';
    ctx.strokeText(captcha.join(""), 0, 30);
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
