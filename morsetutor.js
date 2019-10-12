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

    set speed(newSpeed) {
        document.getElementById("sendSpeedRange").value = newSpeed;
        document.getElementById("sendSpeedNum").value = newSpeed;
    }
}

function init() {
    var frequencyMin = 15;
    var frequencyMax = 2000;
    document.getElementById("frequencyRange").min = frequencyMin;
    document.getElementById("frequencyNum").min = frequencyMin;
    document.getElementById("frequencyRange").max = frequencyMax;
    document.getElementById("frequencyNum").max = frequencyMax;


    var maxVolume = 100;
    var minVolume = 0;
    document.getElementById("volumeRange").max = maxVolume;
    document.getElementById("volumeNum").min = minVolume;
    document.getElementById("volumeRange").max = maxVolume;
    document.getElementById("volumeNum").min = minVolume;

    var maxSendSpeed = 150;
    var minSendSpeed = 5;
    document.getElementById("sendSpeedRange").min = minSendSpeed;
    document.getElementById("sendSpeedRange").max = maxSendSpeed;
    document.getElementById("sendSpeedNum").min = minSendSpeed;
    document.getElementById("sendSpeedNum").max = maxSendSpeed;
}

init();

tone.frequency = 440;
tone.volume = 50;
sendOptions.speed = 15;
