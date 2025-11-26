/** 
TODO:
Components:
- timer
- Scores
- grid UI
- Output area
- valid word list
- working list or string

1. Create a 4×4 board
   [] Generate 16 random letters
   [] Render them as clickable cells

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



const generateBoard = (size) =>{
  
  boardContainer.style.setProperty('--size-grid', size);

  boardContainer.innerHTML = '';

  for(let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    boardContainer.appendChild(cell);
  }

}

const renderBoard = () =>{
  let sizeValue = parseInt(board_size.value);
  createChars(sizeValue);
  generateBoard(sizeValue);

  const cells = boardContainer.getElementsByClassName("cell");
  const charsList = GameState.board.flat();

  charsList.forEach((aChar, index) => {
    cells[index].innerHTML = aChar;
  })
}


const cellClickHandler = (cell) => {}
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


