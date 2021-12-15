// This     of the classic game Battleship was made by Dave McConeghy.
// Like the original, players must search a 10x10 grid for hidden items.
// Items are hidden randomly within the game board.  
// Guesses are marked and "hits" reveal the hidden treasures.
// High scores determined by the number of guesses needed to reveal all items. 
// A future reach addition might include playing against the computer. 
// It may be fun to see how various hiding patterns fare against different search algorithms.
// High scores would be the increasing the minimum guesses the computer needs to reveal all treasures

const containerDiv = document.getElementById("container");
const hudDiv = document.getElementById("hud");
const gameboardDiv = document.getElementById("gameboard");
const gameboard = []
const width = 11;
const height = 10;

// A future update should turn this into a treasure hunting shovel!
gameboardDiv.style.cursor = "pointer";

//Create a gameboard and its labels
//Play area is 10x10 with the first column and first row reserved for labels
board = [...Array(height)].map(() => Array(width).fill(null));

function generateBoard(){

    const top = document.createElement("tr");
    const letters = 'ABCDEFGHIJ'
    //Need to change this from x as array index to letters. Spread a string A-J?
    for (let x = 0; x < width; x++) {
        const headCell = document.createElement("td");
        if (x >= 1){
        headCell.setAttribute("id", letters.charAt(x-1));
        headCell.innerText = letters.charAt(x-1);
        headCell.classList.add("grid-labels");
        } else {
            headCell.setAttribute("id", "0-0");
        }
        top.append(headCell);
      }

    gameboardDiv.append(top);

    
    for (let y = 0; y < height; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < width; x++) {
          const cell = document.createElement("td");
          if (x >=1 ){
            cell.setAttribute("id", `${y+1}-${x}`);
            cell.innerText = `${y+1}-${x}`;
            cell.classList.add("game-square");
            cell.addEventListener("click", (e) => {
                e.currentTarget.style.backgroundColor = "red";
            })
          } else {
              cell.setAttribute("id", `${y+1}`)
              cell.innerText = `${y+1}`
              cell.classList.add("grid-labels")
          }
          row.append(cell);
        }
    
        gameboardDiv.append(row);
    }
}





//Ask for initial settings (num of treasures)

//Create the treasure objects

//Hide the objects in the gameboard

//Handle player misses and hits

function handleGuesses (){
    
}

generateBoard();

//Handle win condition

//Save high scores and offer replay