var morseTutorUi = function() {
    /**
     * Stop sending any currently playing sequence
     */
    const stop = function() {
        morseSender.stopSending();
    } 

    const updateFrequency = function(toneInput) {
        document.getElementById("frequencyRange").value = toneInput;
        document.getElementById("frequencyNum").value = toneInput;
        tone.frequency = toneInput; 
    }

    const updateVolume = function(volumeInput) {
        document.getElementById("volumeRange").value = volumeInput;
        document.getElementById("volumeNum").value = volumeInput;
        tone.volume = volumeInput; 
    }

    const updateSendSpeed = function(sendSpeedInput) {
        document.getElementById("sendSpeedRange").value = sendSpeedInput;
        document.getElementById("sendSpeedNum").value = sendSpeedInput;
        sendOptions.speed = sendSpeedInput;
    }

    const updateGroupSize = function(sendGroupInput) {
        sendOptions.groupSize = sendGroupInput;
    }

    const updateGroupCount = function(sendGroupCountInput) {
        sendOptions.groupCount = sendGroupCountInput;
    }

    const tone = {
        frequency : 440,
        volume : 15,
        frequencyMin : 250,
        frequencyMax : 2000,
        maxVolume : 100,
        minVolume : 0,
    }

    const sendOptions = {
        speed : 15,
        maxSendSpeed : 40,
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
        }  else {
            let idx = enabledAlphabet.indexOf(this);
            enabledAlphabet.splice(idx, 1);
        }

    };

    const alphabet = [
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

    const enabledAlphabet = [];

    var currentSequence = [];
    
    /**
     * Get a single random Letter object from the enabled alphabet.
     */
    function getRandomLetter() {
        if (enabledAlphabet.length > 0) {
            let rand = Math.random();
            let scaledRand = rand * enabledAlphabet.length;
            let idx = Math.floor(scaledRand);
            return enabledAlphabet[idx];
        } else {
            return null;
        }
    }

    /**
     * Randomly generate a two dimensional array of Letters. Each
     * element in the outer array represents a word, each element
     * in the inner array is a Letter.
     */
    function generateRandomSequence() {
        var sequence = [];
        for(let i = 0; i < sendOptions.groupCount; i++) {
            sequence[i] = [];
            for (let j = 0; j < sendOptions.groupSize; j++) {
                sequence[i][j] = getRandomLetter();
            }
        }
        return sequence;
    }

    /**
     * Generate and send a sequence of characters in the form of a morse
     * encoded string. Replaces the stored currentSequence with the newly
     * generated random sequence.
     */ 
    function sendRandomSequence() {
        currentSequence = [];
        if (enabledAlphabet.length > 0) {
            currentSequence = generateRandomSequence(); 
            document.getElementById("sequenceShow").innerText = "";
            let morseSequence = generateMorseString(currentSequence); 
            morseSender.sendSequence(morseSequence, sendOptions, tone);
            
        } else {
            alert("No letters selected");
        }
    }

    /**
     * Resends the previous sequence.
     */
    function resendSequence() {
        let morseSequence = generateMorseString(currentSequence); 
        morseSender.sendSequence(morseSequence, sendOptions, tone);
    }

    /**
     * Displays the last sent sequence. Handy for users
     * to check their answers.
     */
    function showLastSequence() { 
        let displaySequence = generateDisplayString(currentSequence);
        document.getElementById("sequenceShow").innerText = displaySequence;
    }

    /**
     * Turns an array of arrays of letters into a string of morse
     * code with each word seperated by a "/".
     */
    function generateMorseString(sequences) {
        let result = "";
        for (let i = 0; i < sequences.length; i++) {
            for (let j = 0; j < sequences[i].length; j++) {
                let letter = sequences[i][j];
                result = result.concat(letter.morse);
                result = result.concat(" ");
            } 
            result = result.concat("/");
        }
        return result;
    }

    function generateDisplayString(sequences) {
        let result = "";
        for (let i = 0; i < sequences.length; i++) {
            for (let j = 0; j < sequences[i].length; j++) {
                let letter = sequences[i][j];
                result = result.concat(letter.display);
            } 
            result = result.concat(" ");
        }
        return result;
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

        //Default values 
        updateFrequency(440);
        updateVolume(50);
        updateSendSpeed(15);
    }

    return {
        init:init,
        updateFrequency:updateFrequency,
        updateVolume:updateVolume,
        updateSendSpeed:updateSendSpeed,
        updateGroupSize:updateGroupSize,
        updateGroupCount:updateGroupCount,
        sendRandomSequence,
        resendSequence,
        stop,
        enabledAlphabet:enabledAlphabet, 
        currentSequence,
        showLastSequence,
    }

}();

morseTutorUi.init();
