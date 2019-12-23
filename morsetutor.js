var updateFrequency = function(toneInput) {
    tone.frequency = toneInput; 
}

var updateVolume = function(volumeInput) {
    tone.volume = volumeInput; 
}


var updateSendSpeed = function(sendSpeedInput) {
    sendOptions.speed = sendSpeedInput;
}

var tone = {
    frequency : 440,
    volume : 15,
    frequencyMin : 15,
    frequencyMax : 2000,
    maxVolume : 100,
    minVolume : 0,

    set frequency(newFreq) {
        document.getElementById("frequencyRange").value = newFreq;
        document.getElementById("frequencyNum").value = newFreq;
        
    },

    set volume(newVolume) {
        document.getElementById("volumeRange").value = newVolume;
        document.getElementById("volumeNum").value = newVolume;
    }

}

var sendOptions = {
    speed : 15,
    maxSendSpeed : 150,
    minSendSpeed : 5,

    set speed(newSpeed) {
        document.getElementById("sendSpeedRange").value = newSpeed;
        document.getElementById("sendSpeedNum").value = newSpeed;
    }
}



function Letter(display, morse) {
    this.display = display;
    this.morse = morse;
    this.enabled = false; 
}

Letter.prototype.getInnerHtml = function() {
    let listTag = document.createElement("li");
    listTag.innerHTML = this.display;

    let inputTag = document.createElement("input");
    inputTag.setAttribute('type','checkbox');
    inputTag.addEventListener('click',this.toggle.bind(this));
    listTag.appendChild(inputTag);
    return listTag;
};

Letter.prototype.toggle = function() {
    this.enabled = !this.enabled;
    if (this.enabled) {
        enabledAlphabet.push(this); 
        console.log(this);
    }  else {
        let idx = enabledAlphabet.indexOf(this);
        enabledAlphabet.splice(idx, 1);
    }
    console.log(enabledAlphabet);

};

var alphabet = [
    new Letter("a",".-"),
    new Letter("b","-...")
];

var enabledAlphabet = [];

function sendRandomLetter() {
    if (enabledAlphabet.length > 0) {
        let rand = Math.random();
        let scaledRand = rand * enabledAlphabet.length;
        let idx = Math.floor(scaledRand);
        console.log(enabledAlphabet[idx]);
        alert(enabledAlphabet[idx].display);
    } else {
        alert("No letters selected");
    }
}

function init() {
    document.getElementById("frequencyRange").min = tone.frequencyMin;
    document.getElementById("frequencyNum").min = tone.frequencyMin;
    document.getElementById("frequencyRange").max = tone.frequencyMax;
    document.getElementById("frequencyNum").max = tone.frequencyMax;


    document.getElementById("volumeRange").max = tone.maxVolume;
    document.getElementById("volumeNum").min = tone.minVolume;
    document.getElementById("volumeRange").max = tone.maxVolume;
    document.getElementById("volumeNum").min = tone.minVolume;

    document.getElementById("sendSpeedRange").min = sendOptions.minSendSpeed;
    document.getElementById("sendSpeedRange").max = sendOptions.maxSendSpeed;
    document.getElementById("sendSpeedNum").min = sendOptions.minSendSpeed;
    document.getElementById("sendSpeedNum").max = sendOptions.maxSendSpeed;

    let alphabetFieldset = document.getElementById("alphabet");
    alphabet.forEach(function(letter) {
        console.log(letter);
        alphabetFieldset.appendChild(letter.getInnerHtml());
    });

    //Default values, forces setters to be called. 
    tone.frequency = 440;
    tone.volume = 50;
    sendOptions.speed = 15;
}

init();


