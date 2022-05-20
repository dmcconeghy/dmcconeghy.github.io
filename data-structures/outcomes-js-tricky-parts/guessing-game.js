// function guessingGame() {

//     const magicNum = Math.floor(Math.random()*100)
//     let win = false

//     return function myGame(num){
//         if (win) return "You've already won."

//         if (num == magicNum) {
//             win = true
//             return "You win!"
//         }

//         if(num < magicNum) return "Too low!"
//         if (num > magicNum) return "Too high!"
//     }
// }

// Your tests ask for things not included in the prompt. 
// Here's your boilerplate. 

function guessingGame() {
    const ANSWER = Math.floor(Math.random() * 100);
    let isOver = false;
    let numGuesses = 0;
  
    return function guess(num) {
      if (isOver) return "The game is over, you already won!";
      numGuesses++;
      if (num === ANSWER) {
        isOver = true;
        const guess = numGuesses === 1 ? "guess" : "guesses";
        return `You win! You found ${num} in ${numGuesses} ${guess}.`;
      }
      if (num < ANSWER) return `${num} is too low!`;
      if (num > ANSWER) return `${num} is too high!`;
    };
  }




module.exports = { guessingGame };
