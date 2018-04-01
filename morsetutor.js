var updateFrequency = function(toneInput) {
    tone.frequency = toneInput; 
}

var updateVolume = function(volumeInput) {
    tone.volume = volumeInput; 
}

var tone = {
    frequency : 440,
    volume : 15,

    set frequency(newFreq) {
        document.getElementById("frequencyRange").value = newFreq;
        document.getElementById("frequencyNum").value = newFreq;
        
    },

    set volume(newVolume) {
	alert("Hey!");
	document.getElementById("volumeRange").value = newVolume;
	document.getElementById("volumeNum").value = newVolume;
    }

}

var frequencyMin = 15;
var frequencyMax = 2000;
document.getElementById("frequencyRange").min = frequencyMin;
document.getElementById("frequencyNum").min = frequencyMin;
document.getElementById("frequencyRange").max = frequencyMax;
document.getElementById("frequencyNum").max = frequencyMax;

tone.frequency = 440;

var maxVolume = 100;
var minVolume = 0;
document.getElementById("volumeRange").min = maxVolume;
document.getElementById("volumeNum").min = minVolume;
document.getElementById("volumeRange").max = maxVolume;
document.getElementById("volumeNum").max = minVolume;

tone.volume = 50;
