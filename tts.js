var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


var speechcall;

function makeid(length) {
   var result           = [];
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result[i] = characters.charAt(Math.floor(Math.random() * charactersLength + ''));
   }
   return result;
}
var speechcall = [];
speechcall = makeid(5); // this is our input txt for the program

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

    for(i = 0; i < 5; i++){
    
    var utterThis = new SpeechSynthesisUtterance(speechcall[i]);
    utterThis.voice = voices[8];
    utterThis.pitch = 9;
    utterThis.rate = 0.3;
    synth.speak(utterThis);
    }