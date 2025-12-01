# 🔠 Boggle Game
A web-based implementation of the classic word search game "Boggle", built with HTML, CSS, and Vanilla JavaScript. This project features a custom game engine, real-time dictionary validation.

---

## ✨ Features
- Dynamic Board Generation: Supports customizable grid sizes ranging from 3x3 to 6x6.
- Smart Dictionary Validation: Uses an asynchronous loader to fetch and parse a comprehensive dictionary (dictionary-yawl.txt) into a Set for O(1) lookup performance.
- Non-blocking Notifications: Custom "toast" messages replace native browser alerts for a smoother user experience.
- Scoring System: Dynamic scoring based on word length (e.g., longer words yield exponentially higher points)

## 🛠️ Tech Stack
- Frontend: HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+)
- Data Structure: Set for dictionary storage, 2D Array for board state.

## 🚀 How to Run
1. Clone the repository:
2. Open index.html to start the game.

## 📝 How to Play
- Click Start to begin the game (Timer set to 60s).
- Click on a letter to start a word.
- Click on adjacent letters (horizontal, vertical, or diagonal) to form a valid English word.
- Click Submit to check your word:
  Valid words add to your score.  
  Invalid words or words already found will show a warning.
- Use Reset to start over with a fresh board.
  
## 🔮 Future Improvements
- Add sound effects for correct/incorrect submissions.


## Author 
Shu Wang
- [portfolio](https://shuwangs.github.io/portfolio-website/)
- [Github](https://github.com/shuwangs)