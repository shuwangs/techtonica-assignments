
// ========= UI ELEMENT ===============
const TOTALPLAYTIME = 60;
const SCOREAMOUNT = 5;
const board_size = document.getElementById("size_selector");
const boardContainer = document.getElementById("board");

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.querySelector(".countdown_display h3");
const wordDisplay = document.getElementsByClassName("display_selected_words");

const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const resetBtn = document.getElementById("resetBtn");
 
// ========== GAME STATE ==========
const GameState = {
  remainingTime: TOTALPLAYTIME,
  score:0,
  foundWords: new Set(),

  board : [],
  selectedIdx: [],
  isActive: false
}

// ========= HELPER FUNCTIONS =========
const getRandomeLetter = () => {
  patterns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return patterns.charAt(Math.floor(Math.random()* 26));
}

const displayTime = (minutes, seconds) => {
  timerDisplay.textContent = `${minutes.toString()} : ${seconds.toString()}`
}

const displayWords = () =>{
  wordDisplay.textContent = GameState.foundWords.join("\n");
}

const areNeighbors = (last,curr) => {
  if(Math.abs(last.rowIdx - curr.rowIdx) > 1 || Math.abs(last.colIdx - curr.colIdx) >1) {
    return false
  }
  return true
}

// TODOs
// clearCells
// isValidWword
// renderScores

const clearCells= () => true;
const isValidWord = (word) => true;

const startTimer = () => {
  GameState.isActive = true;

  const countDown = setInterval(() => {
    GameState.remainingTime = GameState.remainingTime - 1;
    const MinToDisplay = Math.floor(GameState.remainingTime / 60);
    const SecToDisplay = GameState.remainingTime % 60;
    
    // Update UI
    displayTime(MinToDisplay, SecToDisplay);

    if (GameState.remainingTime <= 0) {
      clearInterval(countDown);
      GameState.isActive = false;
      GameState.remainingTime = TOTALPLAYTIME;
      alert("Game Over!");
    }
  }, 1000);
 
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

// TODOS
renderScore();

const cellClickHandler = (event) => {

  const currCell = event.currentTarget;
  let rowIdx = currCell.dataset.col;
  let colIdx = currCell.dataset.row;
  console.log(`cell at row ${currCell.dataset.row} and col ${currCell.dataset.col} is clicked`);

  if(GameState.selectedIdx.length === 0) {
    GameState.selectedIdx.push({rowIdx, colIdx});
    return;
  }

  if(GameState.selectedIdx.includes({rowIdx, colIdx})) {
    console.log("You have selected this cell!");
  }

  const lastCell = GameState.selectedIdx[GameState.selectedIdx.length - 1];
  if (! areNeighbors(lastCell, {rowIdx, colIdx}) ) {
    console.log("Cells are not adjecent");
    return;
  }
  if (GameState.selectedIdx.includes({rowIdx, colIdx})) {
    console.log("This cell has been selected");
    return;
  }

  GameState.selectedIdx.push({rowIdx, colIdx});

}





const startBtnHandler = () => {
  startTimer();
}

const submitBtnHandler = () => {
  if(GameStage.selectedIdx.length === 0) {
    alert("No letter is selected");
    return;
  }

  const word = GameState.selectedIdx
    .map(({row, col}) => GameState.board[row][col])
    .join("");

  // Check word length
  if (word.length < 3) {
    alert("Words too short");
    clearSelectedUI();
    return;
  }

  // Check if work has been found
  if(GameState.foundWords.has(words)) {
    alert("Already found!");
    clearSelectedUI();
    GameState.selectedIdx = [];
    return;
  }

  // Check if word is valid
  if (!isValidWord(word)) {
    alert("Not a word");
    clearSelectedUI();
    GameState.selectedIdx = [];

    return;
  }

  GameState.foundWords.add(word);
  GameState.score += SCOREAMOUNT;

  renderScore();

  clearSelectedUI();
  GameState.selectedIdx = [];

}

const clearBtnHandler = () => {}
const restartBtnHandler = () => {}
// ========= INIT =========

const init = () => {
 renderBoard();
};

// ========= EVENT LISTENERS =========
window.addEventListener("load", init)
board_size.addEventListener("change", renderBoard);

startBtn.addEventListener("click", startBtnHandler )

