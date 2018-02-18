var game = {
    // test word array generated from desiquintans.com Noun generator
    words : [
        "jedi",
        "tatooine",
        "lightsaber",
        "force",
        "yoda",
        "chewbacca",
        "nerfherder",
        "droid",
        "stormtrooper",
        "padawan"
    ],

    winSounds: ["forcealways.mp3", "nomatch.mp3", "yodalaughing.mp3"],

    loseSounds: ["nerfherder.mp3", "jabbalaugh.mp3","laughfuzzball.mp3"],

    badSounds: ["vaderbreath.mp3", "light-saber-on.mp3", "chewy_roar.mp3", "blasterstun.mp3", "Muchfear.mp3"],

    chosenLetters : [],

    currentWord : "",

    correctGuesses: 0,

    guessesRemaining : 7,

    underscoredWord : [],

    wins : 0,

    losses: 0,

    randWord : function(){
        return this.words[Math.floor(Math.random() * this.words.length)];
    },

    update: function(evt){
        var keyPress = evt.key.toLowerCase();

        //regular expression to check that keyPress is a single lowercase char
        if (keyPress.length === 1 && keyPress.match(/[a-z]/i)){
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
            var winLoss = document.getElementById("win-loss");
            winLoss.textContent = "Wins: " + this.wins + " Losses: " + this.losses;
            var guessed = document.getElementById("guessed");
            guessed.textContent =" Letters Guessed: " + this.chosenLetters.join(" ");

            //update stormtrooper image and play sounds based on guesses left
            var stormtrooper =  document.getElementById("stormtrooper");
            switch(this.guessesRemaining) {
                case 0:
                    this.losses++;

                    document.getElementById("theme-song").volume = 0.05;
                    var loseSound  = new Audio();
                    var loseSrc  = document.createElement("source");
                    loseSrc.type = "audio/mpeg";
                    loseSrc.src  = "assets/sounds/" + this.loseSounds[Math.floor(Math.random() * this.loseSounds.length)];
                    loseSound.appendChild(loseSrc);
                    loseSound.volume = 0.25;
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
                    var badSound  = new Audio();
                    var badSrc  = document.createElement("source");
                    badSrc.type = "audio/mpeg";
                    badSrc.src  = "assets/sounds/" + this.badSounds[Math.floor(Math.random() * this.badSounds.length)];
                    badSound.appendChild(badSrc);
                    badSound.volume = 0.25;
                    badSound.play();

                    stormtrooper.src = "assets/images/stormtrooper4.png"
                    break;
                case 3:
                    stormtrooper.src = "assets/images/stormtrooper3.png"
                    break;
                case 4:
                    var badSound  = new Audio();
                    var badSrc  = document.createElement("source");
                    badSrc.type = "audio/mpeg";
                    badSrc.src  = "assets/sounds/" + this.badSounds[Math.floor(Math.random() * this.badSounds.length)];
                    badSound.appendChild(badSrc);
                    badSound.volume = 0.25;
                    badSound.play();

                    stormtrooper.src = "assets/images/stormtrooper2.png"
                    break;
                case 5:
                    stormtrooper.src = "assets/images/stormtrooper1.png"
                    break;
                case 6:
                    stormtrooper.src = "assets/images/stormtrooper0.png"
                    break;

            }

            //check win condition
            if(!this.underscoredWord.includes("_")){
                console.log("win");
                this.wins++;
                var playArea = document.getElementById("play-area");
                playArea.classList.add("win");
                
                var winSound  = new Audio();
                winSrc  = document.createElement("source");
                winSrc.type = "audio/mpeg";
                winSrc.src  = "assets/sounds/" + this.winSounds[Math.floor(Math.random() * this.winSounds.length)];
                winSound.appendChild(winSrc);
                winSound.volume = 0.25;
                winSound.play();

                var boundNewGame = this.newGame.bind(this);
                setTimeout(boundNewGame, 4000);
            }
        } 
        
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
        playArea.classList.remove("win");

        var remaining = document.getElementById("remaining");
        remaining.textContent = "Guesses Remaining: " + this.guessesRemaining;
        var winLoss = document.getElementById("win-loss");
        winLoss.textContent = "Wins: " + this.wins + " Losses: " + this.losses;
        var guessed = document.getElementById("guessed");
        guessed.textContent =" Letters Guessed: " + this.chosenLetters.join(" ");

        document.getElementById("theme-song").volume = 0.1;

    },

}

game.newGame();

document.onkeyup = function (evt) {   

    game.update(evt);
 

}


