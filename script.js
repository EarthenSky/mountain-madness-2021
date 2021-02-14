var code; 
var checker;
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

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var speechcall = [];
function makeid() {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    let length = 5;
    for ( var i = 0; i < length; i++ ) {
        result[i] = characters.charAt(Math.floor(Math.random() * charactersLength + ''));
    }
    speechcall = result;
    return result;
}

var synth = window.speechSynthesis;
var pitchValue = 1; //the pitch value will be normal
var rateValue = 1; // the rate of the voice will be normal
var voices = [];

function populateVoiceList() {
        voices = synth.getVoices();
    
        for(i = 0; i < voices.length ; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
        if(voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }
    
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
        }
}

function tts(){
    for(i = 0; i < 5; i++){
        var utterThis = new SpeechSynthesisUtterance(speechcall[i]); //this will read the values
        utterThis.voice = voices[8];
        utterThis.pitch = 9;
        utterThis.rate = 0.3;
        synth.speak(utterThis);
    }
    checker = speechcall.join("");
}

function voice_validator() {
    event.preventDefault();
    debugger;
    if (document.getElementById("voice_box").value == checker) {
        alert("Correct Captcha, please move forward!");
    } else {
        alert("Invalid Captcha. Please try again.");
    }
}
