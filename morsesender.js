var morseSender = function() {
    const MILLIS_PER_SECOND = 60000;

    // See the description of the dotLengthMillis for the meaning of 'CODEX' 
    // and this number
    const CODEX_DOT_LENGTH = 56;

    const audioContext = new AudioContext();
    
    const sendSequence = function(sequence, sendOptions, toneOptions) {
        const dotLength = dotLengthMillis(sendOptions.speed);
        let totalLength = 0;
        for (let i = 0; i < sequence.length; i++) {
            symbol = sequence[i];
            if (symbol === '.') {
                totalLength += 2;//Includes dot and space after
            } else if (symbol === '-') {
                totalLength += 4;//Includes dash and apce after
            } else if (symbol === ' ') {
                totalLength += 3; //Space represents gaps between letters in the same word
            } else if (symbol === '/') {
                totalLength += 7; // '/' represents seperation between words
            } else {
                console.log("Invalid symbol:" + symbol);
            }
        }
        
        console.log("total dot length: " + totalLength); 
        console.log("A dot length: " + dotLength); 
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
        return MILLIS_PER_SECOND/(wpm*CODEX_DOT_LENGTH); 
    }  

    return {
        sendSequence:sendSequence,
    } 
}();
