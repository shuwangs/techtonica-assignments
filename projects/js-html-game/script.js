//ISSUE: reset should not alert game over?
// ========= UI ELEMENT ===============
const TOTALPLAYTIME = 60;
const SCOREAMOUNT = 5;
const board_size = document.getElementById("size_selector");
const boardContainer = document.getElementById("board");

const scoreDisplay = document.querySelector(".score_display h3");
const timerDisplay = document.querySelector(".countdown_display h3");
const wordsDisplay = document.getElementById("wordsDisplay");

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
// ========== READIN DICTINARY ==========
let dictionarySet = new Set();

const loadDictionary = async () => {
  try {
    const response = await fetch('./dictionary-yawl.txt'); 
    const text = await response.text();
    const words = text.split('\n').map(word => word.trim()).filter(word => word.length >= 3);
    dictionarySet = new Set(words);
    console.log("the Dictionary has been loaded.");
  } catch (err) {
    console.error("Dictionary failed to load:", err);  
  }
} 


// ========= HELPER FUNCTIONS =========
const getRandomeLetter = () => {
  patterns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return patterns.charAt(Math.floor(Math.random()* 26));
}

const displayTime = (minutes, seconds) => {
  timerDisplay.textContent = `${minutes.toString()} : ${seconds.toString()}`
}

const displayWords = () => {
  wordsDisplay.value =[...GameState.foundWords].join("\n");
}

const areNeighbors = (last,curr) => {
  if(Math.abs(last.rowIdx - curr.rowIdx) > 1 || Math.abs(last.colIdx - curr.colIdx) >1) {
    return false
  }
  return true
}

const clearSelectedCells= () => {
  const selectedCells = document.querySelectorAll(".cell.selected");
  selectedCells.forEach(cell => cell.classList.remove("selected"));
};

const calculateScores = (word) => {
  let points;
  switch(true) {
    case (word.length >= 3 && word.length <= 4):
      points = 1;
      break;
    case (word.length === 5):
      points = 2;
      break;
    case (word.length === 6):
      points = 3;
      break;
    case (word.length === 7):
      points = 5;
      break;
    case (word.length >= 8):
      points = 11;
      break;
    default:
      points = 0; 
  }
  return points;
}

// TODOs
// isValidWord
// renderScores
// displayWords


const isValidWord = (word) => {
  if (dictionarySet.has(word)) {
    return true;
  } 
  return false;
};

const startTimer = () => {
  wordsDisplay.value= "";
  GameState.score = 0;
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

  boardContainer.innerHTML = "";
  boardContainer.style.gridTemplateColumns = `repeat(${sizeValue}, 50px)`;

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

const renderScore =() => {
  scoreDisplay.innerHTML = GameState.score.toString();
};

const cellClickHandler = (event) => {
  if(!GameState.isActive) {
    alert("Please start the game!")
    return;
  }
  const currCell = event.currentTarget;
  let rowIdx = currCell.dataset.row;
  let colIdx = currCell.dataset.col;
  console.log(`cell at row ${currCell.dataset.row} and col ${currCell.dataset.col} is clicked`);

  if(GameState.selectedIdx.length === 0) {
    GameState.selectedIdx.push({rowIdx, colIdx});
    currCell.classList.add("selected");

    return;
  }

  if (GameState.selectedIdx.find(c => c.rowIdx === rowIdx && c.colIdx === colIdx) !== undefined) {
    alert("You have selected this cell!");
    return;
  }

  const lastCell = GameState.selectedIdx[GameState.selectedIdx.length - 1];
  if (! areNeighbors(lastCell, {rowIdx, colIdx}) ) {
    console.log("Cells are not adjecent");
    return;
  }

  GameState.selectedIdx.push({rowIdx, colIdx});
  currCell.classList.add("selected");
}


const startBtnHandler = () => {
  GameState.score = 0
  clearSelectedCells();

  startTimer();
}

const submitBtnHandler = () => {
  if(GameState.remainingTime <= 0) {
    return;
  }
  if(GameState.selectedIdx.length === 0) {
    alert("No letter is selected");
    return;
  }

  const word = GameState.selectedIdx
    .map(({rowIdx, colIdx}) => GameState.board[rowIdx][colIdx])
    .join("");

  console.log(word);

  // Check word length
  if (word.length < 3) {
    alert("Words too short");
    clearSelectedCells();
    return;
  }

  // Check if work has been found
  if(GameState.foundWords.has(word)) {
    alert("Already found!");
    clearSelectedCells();
    GameState.selectedIdx = [];
    return;
  }

  // Check if word is valid
  if (!isValidWord(word)) {
    alert("Not a valid word");
    clearSelectedCells();
    GameState.selectedIdx = [];

    return;
  }

  GameState.foundWords.add(word);
  GameState.score += calculateScores(word);

  renderScore();

  clearSelectedCells();
  GameState.selectedIdx = [];
  displayWords();
}

const clearBtnHandler = () => {}

const resetBtnHandler = () => {
  GameState.score = 0;
  GameState.remainingTime = 1;
  clearSelectedCells();
  
}


// ========= INIT =========

const init = () => {
  loadDictionary();
  renderBoard();
};

// ========= EVENT LISTENERS =========
window.addEventListener("load", init)
board_size.addEventListener("change", renderBoard);

startBtn.addEventListener("click", startBtnHandler);
submitBtn.addEventListener("click", submitBtnHandler);

resetBtn.addEventListener("click", resetBtnHandler);