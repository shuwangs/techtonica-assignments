// ========= UI ELEMENT ===============
const TOTALPLAYTIME = 60;
const SCOREAMOUNT = 5;
const board_size = document.getElementById("size_selector");
const boardContainer = document.getElementById("board");

const scoreDisplay = document.querySelector("#score_area");
const timerDisplay = document.querySelector("#time_area");
const wordsDisplay = document.getElementById("wordsDisplay");

const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const resetBtn = document.getElementById("resetBtn");
const muteBtn = document.getElementById("muteBtn");
const messageBox = document.getElementById("gameMessage");
let messageTimeout;
let isMuted = false;

// ========== GAME STATE ==========
const GameState = {
  remainingTime: TOTALPLAYTIME,
  score:0,
  foundWords: new Set(),

  board : [],
  selectedIdx: [],
  isActive: false,
  timerId: null
}
// ========== READIN DICTINARY ==========
let dictionarySet = new Set();

const loadDictionary = async () => {
  try {
    const response = await fetch('./dictionary-yawl.txt'); 
    const text = await response.text();
    const words = text.split('\n')
      .map(word => word.trim().toUpperCase())
      .filter(word => word.length >= 3);
    dictionarySet = new Set(words);
  } catch (err) {
    console.error("Dictionary failed to load:", err);  
  }
} 

// ========= SOUND ASSETS =========
const sounds = {
  click: new Audio('./sounds/click.wav'),   
  success: new Audio('./sounds/success.wav'), 
  error: new Audio('./sounds/error.wav'),   
  end: new Audio('./sounds/gameover.wav')  
};

for (let key in sounds) {
  sounds[key].load();
}

// ========= HELPER FUNCTIONS =========
const getRandomLetter = () => {
  const weightedPattern = "AAAAAAAAABBCCDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
  // const patterns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return weightedPattern.charAt(Math.floor(Math.random()* weightedPattern.length));
}

const displayTime = (minutes, seconds) => {
  timerDisplay.textContent = `${minutes.toString()} : ${seconds.toString().padStart(2, "0")}`
}

const displayWords = () => {
  wordsDisplay.value =[...GameState.foundWords].join("\n");
}

const areNeighbors = (last,curr) => {
  if(Math.abs(last.rowIdx - curr.rowIdx) > 1 || Math.abs(last.colIdx - curr.colIdx) >1) {
    return false;
  }
  return true;
}

const playSound = (soundtype) => {
  if (isMuted) return; 
   const audio = sounds[soundtype];
   if(audio) {
      audio.currentTime = 0;
      audio.play();
   }
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

const isValidWordLocal = (word) => {
  if (dictionarySet.has(word)) {
    return true;
  } 
  return false;
};

async function testWordAPI(word) {
   try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      if (! res.ok) {
         return false;
      } 
      return true;
   } catch(error) {
      console.error("API Error:", error.message);
   }
}

const startTimer = () => {
  if(GameState.timerId) {
    clearInterval(GameState.timerId);
    GameState.timerId = null;
  }
  wordsDisplay.value= "";

  GameState.remainingTime = TOTALPLAYTIME;
  GameState.score = 0;
  GameState.isActive = true;
  renderScore();

  GameState.timerId= setInterval(() => {
    GameState.remainingTime = GameState.remainingTime - 1;
    const MinToDisplay = Math.floor(GameState.remainingTime / 60);
    const SecToDisplay = GameState.remainingTime % 60;
    
    // Update UI
    displayTime(MinToDisplay, SecToDisplay);

    if (GameState.remainingTime <= 0) {
      clearInterval(GameState.timerId);
      GameState.isActive = false;
      GameState.timerId = null;
      GameState.remainingTime = TOTALPLAYTIME;
      showMessage("Game Over!");
      playSound('end');
    }
  }, 1000);
 
}

// ------------- SHOW MESSAGE -----------------
const showMessage = (text) => {
  messageBox.innerText = text;
  messageBox.classList.remove("hidden");
  messageBox.classList.add("show");

  if (messageTimeout) clearTimeout(messageTimeout);
  messageTimeout = setTimeout(()=>{
    messageBox.classList.remove("show");
    messageBox.classList.add("hidden");
  }, 1000)
}

// ==========  MAJOR FUNCTIONS ==========
const createChars= (size) => {
  GameState.board = [];
  for(let i = 0; i < size; i++) {
    const row = []; 
    for (let j = 0; j < size; j++){
       row.push(getRandomLetter());
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
    showMessage("Please start the game!")
    return;
  }
  const currCell = event.currentTarget;
  let rowIdx = currCell.dataset.row;
  let colIdx = currCell.dataset.col;

  if(GameState.selectedIdx.length === 0) {
    GameState.selectedIdx.push({rowIdx, colIdx});
    currCell.classList.add("selected");
    playSound('click');

    return;
  }

  if (GameState.selectedIdx.find(c => c.rowIdx === rowIdx && c.colIdx === colIdx) !== undefined) {
    showMessage("You have selected this cell!");
    playSound('error');
    return;
  }

  const lastCell = GameState.selectedIdx[GameState.selectedIdx.length - 1];
  if (! areNeighbors(lastCell, {rowIdx, colIdx}) ) {
    showMessage("Not adjacent cells!");
    playSound('error');

    return;
  }

  GameState.selectedIdx.push({rowIdx, colIdx});
  currCell.classList.add("selected");
  playSound('click');
}


const startBtnHandler = () => {
  GameState.score = 0
  clearSelectedCells();

  startTimer();
}

const submitBtnHandler = async () => {
  if(GameState.remainingTime <= 0) {
    playSound('error');
    return;
  }
  if(GameState.selectedIdx.length === 0) {
    showMessage("No letter is selected");
    playSound('error');
    return;
  }

  const word = GameState.selectedIdx
    .map(({rowIdx, colIdx}) => GameState.board[rowIdx][colIdx])
    .join("");

  // Check word length
  if (word.length < 3) {
    showMessage("Words too short");
    clearSelectedCells();
    GameState.selectedIdx = [];
    playSound('error');
    return;
  }

  // Check if work has been found
  if(GameState.foundWords.has(word)){
    showMessage("Already found!");
    clearSelectedCells();
    GameState.selectedIdx = [];
    playSound('error');
    return;
  }

  // Check if word is valid.--- isValidWord -- testWordAPI.  --- isValidWord
   const isValidLocal = isValidWordLocal(word);
 
   const isValidApi = await(testWordAPI(word));

   if (!isValidLocal && !isValidApi) {
    showMessage("Not a valid word");
    clearSelectedCells();
    GameState.selectedIdx = [];
    playSound('error');
    return;
   }


  GameState.foundWords.add(word);
  GameState.score += calculateScores(word);
  playSound('success');

  renderScore();

  clearSelectedCells();
  GameState.selectedIdx = [];
  displayWords();
}

const clearBtnHandler = () => {
  clearSelectedCells();
  GameState.selectedIdx = [];
}

const resetBtnHandler = () => {
  if (GameState.timerId) {
    clearInterval(GameState.timerId);
    GameState.timerId = null;
  }
  GameState.score = 0;
  GameState.remainingTime = TOTALPLAYTIME;
  GameState.isActive = false;
  GameState.foundWords.clear();
  GameState.selectedIdx = [];

  clearSelectedCells();
  displayTime(Math.floor(TOTALPLAYTIME / 60), TOTALPLAYTIME % 60);

  renderScore();
  wordsDisplay.value = "";
  renderBoard();
}

const soundHandler = () =>{
  isMuted = !isMuted; 
  
  if (isMuted) {
    muteBtn.innerText = "🔇"; 
    muteBtn.style.backgroundColor = "#ccc"; 
  } else {
    muteBtn.innerText = "🔊"; 
    muteBtn.style.backgroundColor = "#faf3dd"; 
  }
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
clearBtn.addEventListener("click", clearBtnHandler);
resetBtn.addEventListener("click", resetBtnHandler);

muteBtn.addEventListener("click", soundHandler);
