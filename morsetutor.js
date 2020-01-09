var morseTutorUi = function() {
    var updateFrequency = function(toneInput) {
        document.getElementById("frequencyRange").value = toneInput;
        document.getElementById("frequencyNum").value = toneInput;
        tone.frequency = toneInput; 
    }

    var updateVolume = function(volumeInput) {
        document.getElementById("volumeRange").value = volumeInput;
        document.getElementById("volumeNum").value = volumeInput;
        tone.volume = volumeInput; 
    }

    var updateSendSpeed = function(sendSpeedInput) {
        document.getElementById("sendSpeedRange").value = sendSpeedInput;
        document.getElementById("sendSpeedNum").value = sendSpeedInput;
        sendOptions.speed = sendSpeedInput;
    }

    var updateGroupSize = function(sendGroupInput) {
        sendOptions.groupSize = sendGroupInput;
    }

    var updateGroupCount = function(sendGroupCountInput) {
        sendOptions.groupCount = sendGroupCountInput;
    }

    var tone = {
        frequency : 440,
        volume : 15,
        frequencyMin : 15,
        frequencyMax : 2000,
        maxVolume : 100,
        minVolume : 0,
    }

    var sendOptions = {
        speed : 15,
        maxSendSpeed : 150,
        minSendSpeed : 5,
        groupSize: 3,
        minGroupSize: 1,
        maxGroupSize: 20,
        groupCount: 1,
        minGroupCount: 1,
        maxGroupCount: 20,
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
        new Letter("b","-..."),
        new Letter("c","-.-."),
        new Letter("d","-.."),
        new Letter("e","."),
        new Letter("f","..-."),
        new Letter("g","--."),
        new Letter("h","...."),
        new Letter("i",".."),
        new Letter("j",".---"),
        new Letter("k","-.-"),
        new Letter("l",".-.."),
        new Letter("m","--"),
        new Letter("n","-."),
        new Letter("o","---"),
        new Letter("p",".--."),
        new Letter("q","--.-"),
        new Letter("r",".-."),
        new Letter("s","..."),
        new Letter("t","-"),
        new Letter("u","..-"),
        new Letter("v","...-"),
        new Letter("w",".--"),
        new Letter("x","-..-"),
        new Letter("y","-.--"),
        new Letter("z","--.."),
        new Letter("0","-----"),
        new Letter("1",".----"),
        new Letter("2","..---"),
        new Letter("3","...--"),
        new Letter("4","....-"),
        new Letter("5","....."),
        new Letter("6","-...."),
        new Letter("7","--..."),
        new Letter("8","---.."),
        new Letter("9","----.")
    ];

    var enabledAlphabet = [];

    function sendRandomLetter() {
        if (enabledAlphabet.length > 0) {
            let rand = Math.random();
            let scaledRand = rand * enabledAlphabet.length;
            let idx = Math.floor(scaledRand);
            console.log(enabledAlphabet[idx]);
            morseSender.sendSequence(enabledAlphabet[idx].morse, sendOptions, tone);
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

        document.getElementById("sendGroupSize").min = sendOptions.minGroupSize;
        document.getElementById("sendGroupSize").max = sendOptions.maxGroupSize;
        document.getElementById("sendGroupSize").value = sendOptions.groupSize;
        document.getElementById("sendGroupsCount").min = sendOptions.minGroupCount;
        document.getElementById("sendGroupsCount").max = sendOptions.maxGroupCount;
        document.getElementById("sendGroupsCount").value = sendOptions.groupCount;

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

    return {
        init:init,
        updateFrequency:updateFrequency,
        updateVolume:updateVolume,
        updateSendSpeed:updateSendSpeed,
        updateGroupSize:updateGroupSize,
        updateGroupCount:updateGroupCount,
        sendRandomLetter:sendRandomLetter,
        tone:tone,
        sendOptions:sendOptions,
        enabledAlphabet:enabledAlphabet, 

    }

}();

morseTutorUi.init();
