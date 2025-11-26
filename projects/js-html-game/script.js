/** 
TODO:
Components:
- timer
- Scores
- grid UI
- Output area
- valid word list
- working list or string

1. Create a scalable board
   [X] Generate based on the  random letters
   [X] Render them as clickable cells

2. Handle cell click
   [] If first click → select it
   [] If not first click → check if adjacent to previous and check if it has been visited.
   [] If valid → add to selected list
   [] Update the current word on screen

3. Clear button
   [] Clear selected cells
   [] Clear current word
   [] Remove highlight
4. Restart button
   [] Clear selected cells
   [] Clear current word
   [] Remove highlight
   [] Clear Output area
   
5. Submit button
   [] Build the final word from selected cells
   [] Check length >= 3
   [] Check if word is in my dictionary Set and if the word was already found
   [] If valid → add to “found words” list & update score
   [] Clear current selection

6. Timer (simple version)
   [] Start 3 mins countdown
   [] When time is up → stop selecting and submitting

7. Basic UI updates
   []  Update score display
   []  Update timer display
   []  Highlight selected cells
   
8. output area updates
   []  display valid words
   []  update it accordingly
*/

// ========= UI ELEMENT ===============
const board_size = document.getElementById("size_selector");
const boardContainer = document.getElementById("board");

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const resetBtn = document.getElementById("resetBtn");
// ========= HELPER FUNCTIONS =========
const getRandomeLetter = () => {
  patterns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return patterns.charAt(Math.floor(Math.random()* 26));
}
// ========== GAME STATE ==========

const GameState = {
  remainingTime: 180,
  score:0,
  foundWords: new Set(),

  board : [],
  selectedIdx: [],
  isActive: false
}

// ==========  MAJOR FUNCTIONS ==========
const createChars= (size) => {
  GameState.board = [];
  for(let i = 0; i < size; i++) {
    const row = []; 
    for (let j = 0; j < size; j++){
       row.push(getRandomeLetter());
    }
    GameState.board.push(row);
  }
  return GameState;
};



const renderBoard = () =>{
  let sizeValue = parseInt(board_size.value);
  createChars(sizeValue);

  const cells = boardContainer.getElementsByClassName("cell");

  GameState.board.forEach((row, rowIdx) => {
    row.forEach((AChar, colIdx)=>{
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerText = AChar;


      cell.dataset.row = rowIdx;
      cell.dataset.col = colIdx;
      
      cell.addEventListener("click", cellClickHandler);

      boardContainer.appendChild(cell);
    })
  } )

}


const cellClickHandler = (event) => {
 const cell = event.currentTarget;  
  console.log(`cell at row ${cell.dataset.row} and col ${cell.dataset.col} is clicked`);
}

const submitBtnHandler = () => {}
const clearBtnHandler = () => {}
const restartBtnHandler = () => {}
// ========= INIT =========

const init = () => {
 renderBoard();
};

// ========= EVENT LISTENERS =========
window.addEventListener("load", init)
board_size.addEventListener("change", renderBoard);
// document.getElementById("submit-word").addEventListener("click", submitBtnHandler);
// document.getElementById("clear-word").addEventListener("click", clearBtnHandler);
// document.getElementById("new-game").addEventListener("click", restartBtnHandler);


