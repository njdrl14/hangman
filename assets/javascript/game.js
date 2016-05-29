var game = { 
	guessedLetters: [],
	words: ["smells like teen spirit","breakfast at tiffanys", "i want it that way ", "bittersweet symphony","jumper","bye bye bye","no rain","all the small things","basketcase","wannabe","scar tissue","wonderwall"],
	wordShown: [],
	numberOfTries: 5,
	wins: 0,
	losses: 0,
	gameRunning: false,


};


var wordRandomlySelected = "";
document.onkeyup=function (event) {
	if (game.gameRunning) {

		//shows keys on screen and checks if the condition is correct
		console.log (String.fromCharCode (event.keyCode));
		game.guessedLetters.push(String.fromCharCode (event.keyCode));
		console.log (game.guessedLetters);
		// call checking function on this line (checkGuessedLetter)
		document.querySelector("#letters").innerHTML=game.guessedLetters;

        //changed letters to game.guessedLetters in the line below
		var matchedIndices = checkGuessedLetter(game.guessedLetters);
		game.wordShown=[];
		for (var i = 0; i < wordRandomlySelected.length; i++) {
			if (wordRandomlySelected[i] == " ") {

				game.wordShown.push(" ");
			}else {

				if (matchedIndices.indexOf(i)===-1){
					game.wordShown.push("_");
				}else {
					game.wordShown.push(wordRandomlySelected[i]);
				}
			}

			
		}
			document.querySelector("#word").innerHTML=game.wordShown;
        console.log("currently matched indices in random string:");
	    console.log(matchedIndices);
        /* Now, by using the matchedIndices array, all we need to do is make sure the number of matched indices
         * is equal to the number of non-space characters in the random string to be able to tell if the user won */

		
		//function to check if the letter is in the genereated word
		
		function checkGuessedLetter(letters){
				
			//loop genererated to check player's guess against the game's word
			
			/*for (var i =0; i = wordRandomlySelected.length -1; i++) {
					//condition that checks if the user's letter matches a letter within the game's word
					if(letters = wordRandomlySelected.substring(i,i+1)){
							game.wordShown.indexOf(i)=letters;
					}
			}*/

           
           /* This function is going to return an array of numbers that will correspond to the matched
            * characters in the string. This way we will know which characters are matched and can show
            * them on the screen */
            var matchedIndices = [];
            // Loop through each character in the random string
            for (var i = 0; i < wordRandomlySelected.length; i++) {
                var character = wordRandomlySelected.charAt(i).toLowerCase();
                // Loop through each character in the array of guessed letters
                for (var j = 0; j < letters.length; j++) {
                    // If the character matches one of the guessed letters, add that character's index to the array
                    // The second condition of the if statement prevents duplicates from being added
                    if (character === letters[j].toLowerCase() && matchedIndices.indexOf(i) === -1)
                        matchedIndices.push(i);
                }
            }
            return matchedIndices;

		}

		


		//game answers
		var keypressed=String.fromCharCode (event.keyCode).toLowerCase();
			console.log(wordRandomlySelected);
			if (wordRandomlySelected.indexOf(keypressed)===-1) {
				//letter pressed is wrong
				console.log("wrong");
				game.numberOfTries--;
				document.querySelector("#lives").innerHTML=game.numberOfTries;


			}else{
				//letter pressed is right
				console.log("right");
			}

			
			if (game.wordShown.join("").toLowerCase()==wordRandomlySelected.toLowerCase()) {
				game.wins++;
				game.gameRunning=false;
				document.querySelector("#points").innerHTML=game.wins;
				document.querySelector("#go").innerHTML="You won! press a key to start again"

			}
			if (game.numberOfTries<1) {

				document.querySelector("#go").innerHTML="You Lost loser!";
				game.losses++;
				document.querySelector("#loser").innerHTML=game.losses;
				game.gameRunning=false;
			}



	}else {
		//changes "press any key to start"
		game.numberOfTries=5;
		document.querySelector("#go").innerHTML="Go!";
		game.wordShown=[];
		game.gameRunning=true;
		game.guessedLetters=[];
		//shows current word
		wordRandomlySelected = game.words[Math.floor(Math.random() * (12))]; 
		
		for (var i = 0; i < wordRandomlySelected.length; i++) {

			if (wordRandomlySelected[i] == " ") {

				game.wordShown.push(" ");
			}else {
				game.wordShown.push("_");
			}




		}

		

		document.querySelector("#word").innerHTML=game.wordShown;
	}



	console.log (event);

	
}


