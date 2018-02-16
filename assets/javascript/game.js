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

    guessesRemaining : 7,

    underscoredWord : [],

    currentState : "",

    randWord : function(){
        return this.words[Math.floor(Math.random() * this.words.length)];
    },

    update: function(evt){
        var keyPress = evt.key.toLowerCase();
        //if pressed key isnt in chosen letters, add it
        if(!this.chosenLetters.includes(keyPress)) {
            this.chosenLetters.push(keyPress);

            if(this.currentWord.includes(keyPress)){
                for(var i = 0; i < this.currentWord.length; i++){
                        //if the chosen letter matches the current word at i, reveal it
                        //and increment correct guesses
                        if(keyPress === this.currentWord[i]){
                            this.underscoredWord[i] = this.currentWord[i];
                        }
                }
            }
            //no match decrement guessesRemaining
            else{
                this.guessesRemaining--;
            }    
        }

        //print update to header display
        var wordDisplay = document.getElementById("word");
        wordDisplay.textContent = this.underscoredWord.join(" ");

        //print update to stats footer
        var remaining = document.getElementById("remaining");
        remaining.textContent = "Guesses Remaining: " + this.guessesRemaining;
        var guessed = document.getElementById("guessed");
        guessed.textContent =" Letters Guessed: " + this.chosenLetters.join(" ");

        //update stormtrooper image and play sounds based on guesses left
        var stormtrooper =  document.getElementById("stormtrooper");
        switch(this.guessesRemaining) {
            case 0:
                var loseSound  = new Audio();
                var loseSrc  = document.createElement("source");
                loseSrc.type = "audio/mpeg";
                loseSrc.src  = "assets/sounds/nerfherder.mp3";
                loseSound.appendChild(loseSrc);
                loseSound.play();
                stormtrooper.src = "assets/images/stormtroopercut.png"
                var playArea = document.getElementById("play-area");
                playArea.classList.add("lose");
                var boundNewGame = this.newGame.bind(this);
                setTimeout(boundNewGame, 4000);
                break;
            case 1:
                stormtrooper.src = "assets/images/stormtrooper5.png"
                break;
            case 2:
                stormtrooper.src = "assets/images/stormtrooper4.png"
                break;
            case 3:
                stormtrooper.src = "assets/images/stormtrooper3.png"
                break;
            case 4:
                stormtrooper.src = "assets/images/stormtrooper2.png"
                break;
            case 5:
                stormtrooper.src = "assets/images/stormtrooper1.png"
                break;
            case 6:
                stormtrooper.src = "assets/images/stormtrooper0.png"
                break;

        }

        //check win/lose conditions
        if(!this.underscoredWord.includes("_")){
            this.currentState = "win";
            console.log("win");
        } 
        // else if(this.guessesRemaining === 0){
        //     this.currentState = "lose";
        //     console.log("lose");
        // }
        
    },

    newGame : function() {
        //reset initial values
        this.currentWord = this.randWord();
        this.underscoredWord = [];
        this.chosenLetters = [];
        this.correctGuesses = 0;
        this.guessesRemaining = 7;
        this.currentState = "play";

        for(var i=0; i < this.currentWord.length; i++){
            this.underscoredWord[i] = "_";
        }

        var wordDisplay = document.getElementById("word");
        wordDisplay.textContent = this.underscoredWord.join(" ");
        console.log(this.underscoredWord.join(" "));
        var stormtrooper = document.getElementById("stormtrooper");
        stormtrooper.src = "";
        
        var playArea = document.getElementById("play-area");
        playArea.classList.remove("lose");

        var remaining = document.getElementById("remaining");
        remaining.textContent = "Guesses Remaining: " + this.guessesRemaining;
        var guessed = document.getElementById("guessed");
        guessed.textContent =" Letters Guessed: " + this.chosenLetters.join(" ");

    },

}

game.newGame();

document.onkeyup = function (evt) {   

    game.update(evt);
    console.log(game.underscoredWord.join(" "));
    console.log(game.guessesRemaining); 

}


