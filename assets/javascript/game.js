var game = {
    // test word array generated from desiquintans.com Noun generator
    words : [
        "advantage",
        "advice",
        "badge",
        "bicycle",
        "camera",
        "dentist",
        "mention",
        "purchase",
        "soulmate",
        "vibraphone"
    ],

    chosenLetters : [],

    currentWord : "",

    correctGuesses: 0,

    guessesRemaining : 9,

    underscoredWord : [],

    currentState : "",

    randWord : function(){
        return this.words[Math.floor(Math.random() * this.words.length)];
    },

    update: function(evt){
        //if pressed key isnt in chosen letters, add it
        if(!this.chosenLetters.includes(evt.key.toLowerCase())) {
            this.chosenLetters.push(evt.key.toLowerCase());

            if(this.currentWord.includes(evt.key.toLowerCase())){
                for(var i = 0; i < this.currentWord.length; i++){
                        //if the chosen letter matches the current word at i, reveal it
                        //and increment correct guesses
                        if(evt.key.toLowerCase() === this.currentWord[i]){
                            this.underscoredWord[i] = this.currentWord[i];
                        }
                }
            }
            //no match decrement guessesRemaining
            else{
                this.guessesRemaining--;
            }    
        }
        //check win/lose conditions
        if(!this.underscoredWord.includes("_")){
            this.currentState = "win";
            console.log("win");
        } else if(this.guessesRemaining === 0){
            this.currentState = "lose";
            console.log("lose");
        }
        
    },

    newGame : function() {
        
        this.currentWord = this.randWord();
        this.underscoredWord = [];
        this.chosenLetters = [];
        this.correctGuesses = 0;
        this.guessesRemaining = 9;
        this.currentState = "play";

        for(var i=0; i < this.currentWord.length; i++){
            this.underscoredWord[i] = "_";
        }

        console.log(this.underscoredWord.join(" "));

    },

}

game.newGame();

document.onkeyup = function (evt) {   

    game.update(evt);
    console.log(game.underscoredWord.join(" "));
    console.log(game.guessesRemaining); 

}


