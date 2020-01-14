var morseSender = function() {
    const MILLIS_PER_MIN = 60000;
    const TRANSITION_TIME = 0.001;

    // See the description of the dotLengthMillis for the meaning of 'CODEX' 
    // and this number
    const WORD_DOT_LENGTH = 56;
    var audioCtx;

    
    const sendSequence = function(sequence, sendOptions, toneOptions) {
        const toneGain = toneOptions.volume/100;
        const dotLength = dotLengthMillis(sendOptions.speed);
        audioCtx =  new(window.AudioContext || window.webkitAudioContext)();

        let oscillator = audioCtx.createOscillator();
        oscillator.frequency.value = toneOptions.frequency;
        let gainNode = audioCtx.createGain();
        //Since we can't start and top the oscillator easily, the plan is to manuplate
        //the gain to make dots and dashes.
        gainNode.gain.value = 0; 
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        let totalLength = 0;
        let runningTime = audioCtx.currentTime;
        oscillator.start(runningTime);
        for (let i = 0; i < sequence.length; i++) {
            symbol = sequence[i];
            if (symbol === '.') {
                //Play the dot
                gainNode.gain.setTargetAtTime(toneGain, runningTime, TRANSITION_TIME); 
                runningTime += (dotLength/1000);
                gainNode.gain.setTargetAtTime(0, runningTime, TRANSITION_TIME); 
                //Add a dot length afterwards
                runningTime += (dotLength/1000);
                //Includes dot and space after
                totalLength += 2;
            } else if (symbol === '-') {
                //Play the dash
                gainNode.gain.setTargetAtTime(toneGain, runningTime, TRANSITION_TIME); 
                runningTime += (dotLength/1000)*3;
                gainNode.gain.setTargetAtTime(0, runningTime, TRANSITION_TIME); 
                //Add a dot length afterwards
                runningTime += (dotLength/1000);
                totalLength += 4;//Includes dash and sapce after
            } else if (symbol === ' ') {
                runningTime += (dotLength/1000)*3;
                totalLength += 3; //Space represents gaps between letters in the same word
            } else if (symbol === '/') {
                runningTime += (dotLength/1000)*7;
                totalLength += 7; // '/' represents seperation between words
            } else {
                console.log("Invalid symbol:" + symbol);
            }
        }

        let totalTime = (totalLength*dotLength);
        console.log("Will Send: " + sequence + " Total time:" + totalTime);
    }

    /**
     * Calculates the length of a 'dot' from a given words-per-minute number.
     * The whole system is based on the length of a 'dot'. All other tone
     * and gap lengths are based on that.  
     * " - The length of a dot is 1 time unit.
     *   - A dash is 3 time units.
     *   - The space between symbols (dots and dashes) of the same letter is 1 time unit.
     *   - The space between letters is 3 time units.
     *   - The space between words is 7 time units*
     * (From http://www.codebug.org.uk/learn/step/541/morse-code-timing-rules/ )
     * 
     * To convert from words per minute to number of milliseconds for a dot, we
     * need to take a word and see how many 'time units' pass to send the whole
     * word. The FCC used to use 'CODEX' as this word, so I'll base the
     * calculations on that. 
     * 
     * CODEX -> -.-./---/-.././-..- 
     * In that word we have 9 dashes and 7 dots. This adds up to be 34 'time 
     * units'. 
     * Add to that 10 gaps between symbols and 4 gaps between words and we end up
     * with 56 time units total:
     * (9*3) + 7 + 10 + (4*3) = 56 'dots' per word.
     * 
     * Now to get this in terms of 'milliseconds per dot'
     * x words/1 minute * 56 dots/word = x*56 dots/minute.
     * 
     * Or to put it another way:
     * In one minute one woud send X WPM number of 'dots'. Or,
     * 1 minute = x * 56 dots. 
     *
     * 1 minute = 60,000 milliseconds = x*56 dots
     *
     * 1 dot = 60,000 millisecons / x*56 
     * 
     */
    const dotLengthMillis = function(wpm) {
        return MILLIS_PER_MIN/(wpm*WORD_DOT_LENGTH); 
    }  

    return {
        sendSequence:sendSequence,
    } 
}();
