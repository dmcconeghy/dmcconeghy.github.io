/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1; 
let board = []; // global holder to mark player piece locations
let tds; // a global holder for the column-top row for dynamic mouseover player/color swapping

// makeBoard: creates an array of rows where each row is array of cells  (board[y][x])
function makeBoard() {
  // board is an array whose rows number HEIGHT
  // for each row we create, map it with an array of WIDTH length
  // for each mapped item, fill it with value null

  board = [...Array(HEIGHT)].map(() => Array(WIDTH).fill(null));
  //alternate board = Array.from({length: HEIGHT}).fill(Array.from({length: WIDTH}))
}

// makeHtmlBoard: make HTML table and row of column tops. 
function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board")

    // Create an table row element held in variable top
    // Set the id attribute of that table row to "column-top"
    // Add an on-click event listener to each table row 

  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  
    // for x set as the width of the game board
    // create a table data cell held in variable headCell
    // set the table data item's id to its x or column value
    // append it to the table row created above
    // append the headCell table row to the board

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    headCell.addEventListener("mouseover", handleHover)
    headCell.addEventListener("mouseout", handleExitHover)
    top.append(headCell);
  }

  htmlBoard.append(top);

    //for each row of HEIGHT in the game board
    // create a table row named row
    // for the WIDTH of the game, create a table data item named cell
    // set the cell's id to be its row-column or Y-X
    // append the cell to each row for each WIDTH
    // append the row to the board for each HEIGHT

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }

    htmlBoard.append(row);
  }
}

// findSpotForCol: given column x, return top empty y (null if filled)
function findSpotForCol(x) {
    //starting from the lowest Y value decrement upward to highest Y
    //checking for null locations where no pieces have been placed

  for (let lowestY = HEIGHT-1; lowestY >= 0; lowestY--){
      if(!board[lowestY][x]){
        return lowestY;
      }
  }
  return null;
}

// placeInTable: update DOM to place piece into HTML table of board 
function placeInTable(y, x) {
  // create a game piece div and give it the classes piece and player1/2
  // append the piece to the div that matches the inputed y, x 
  const gamePiece = document.createElement("div")
  gamePiece.classList.add("piece");
  gamePiece.classList.add(`player${currPlayer}`)
  document.getElementById(`${y}-${x}`).append(gamePiece);
}

/** endGame: announce game end */
function endGame(msg) {
  let playAgain = confirm(`${msg} Want to play again?`);
  if (playAgain){
    location.reload();
  } else {
    return;
  }
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {

  // get x from ID of clicked cell
  let x = +evt.target.id;
  
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // board's location set as either 1 or 2
  // piece is placed in y, x

  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    //grab the current Player to set the color
    let color = currPlayer === 1 ? "blue" : "red"

    //update the HUD
    // wait 1100ms so that the piece appears on the board before the win alert displays
    //remove the event listeners so that no more pieces can be placed
    //leave the function so that the HUD is not updated again
    document.getElementById("currentPlayer").innerText = `Player ${currPlayer} / ${color} won!`;
    setTimeout(() => {return endGame(`Player ${currPlayer} / ${color} won!`)}, 1100);
    document.getElementById("column-top").removeEventListener("click", handleClick);
    return;
  }

  // check for tie
  // if every cell of every roll is full
  if (board.every(row => row.every(cell => cell))) {
    document.getElementById("currentPlayer").innerText = "It's a tie!";
    setTimeout(() => {return endGame("It's a tie!")}, 1100)
    document.getElementById("column-top").removeEventListener("click", handleClick);
    return;
  }

  // If no winner or no tie, switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
  
  //grab the current player color and update the HUD
  color = currPlayer === 1 ? "blue" : "red"
  document.getElementById("currentPlayer").innerText = `It's now ${color}'s turn`;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

//for each row & then for each column in the row
//check horizontal victory by looking at the four cells and seeing if they are all the same player
//check vertical, diagonal down left and diagonal down right for same. 
// The changes to the X, Y indicate the cells to check starting from initial y, x
// if any one of the four directions returns T from _win then the function checkForWin returns T
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

//handleHover & handleExitHover manage the mouseover color swap to indicate turn and location
function handleHover(e){
    //if no one has won, change the background color of the column-top background piece to the current player
    //if a player has won or the players have tied, then remove all background colors from column-top
  if (!checkForWin()){
      (currPlayer === 1) ? (e.currentTarget.style.backgroundColor = "blue") : (e.currentTarget.style.backgroundColor = "red")
  } else e.currentTarget.style.backgroundColor = ""
  }

//We must check each column / td in column-top for mouseout to remove the color if the cursor moves to a different column
function handleExitHover(e){
  if (!checkForWin()){
    e.currentTarget.style.backgroundColor = ""
  } else e.currentTarget.style.backgroundColor = ""
}

makeBoard();
makeHtmlBoard();