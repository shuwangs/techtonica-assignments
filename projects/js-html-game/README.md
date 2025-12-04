# 🔠 Boggle Game
A web-based implementation of the classic word search game "Boggle", built with HTML, CSS, and Vanilla JavaScript. This project features a custom game engine, real-time dictionary validation.

### 🚀 **Play Live Demo:** [https://boggleplay.vercel.app/](https://boggleplay.vercel.app/)

---

## ✨ Features
- Dynamic Board Generation: Supports customizable grid sizes ranging from 3x3 to 6x6.
- Hybrid Validation:
  - Uses a Set data structure for O(1) local lookup performance.
  - Integrates Async/Await to fetch data from the free Dictionary API for enhanced validation.
- Non-blocking Notifications: Custom "toast" messages replace native browser alerts for a smoother user experience.
- Scoring System: Dynamic scoring based on word length (e.g., longer words yield exponentially higher points)
- **Interactive Audio**: Implemented sound effects (`.wav`) for clicks, correct submissions, errors, and game over states.

## 🛠️ Tech Stack
- Frontend: HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+)
- Data Structure: Set for dictionary storage, 2D Array for board state.
- Concepts: Async/Await, DOM Manipulation, Event Handling.

--- 

## 🚀 How to Run
**Note:** Due to browser CORS policies regarding fetch requests (for the local dictionary file and API), this project cannot be run by simply opening index.html.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/shuwangs/techtonica-assignments.git
    ```

2.  **Navigate to the project directory**:
    ```bash
    cd projects/js-html-game
    ```

3.  **Start a Local Server**:
    * **VS Code (Recommended)**: Right-click `index.html` and select **"Open with Live Server"**.  
    The game should now be running at `http://127.0.0.1:5500` (or similar port).

    * **Python**: Run `python3 -m http.server` in the terminal.  
    You will see `Serving HTTP on :: port 8000 (http://[::]:8000/) ...`

    * **Node**: Run `npx http-server`.  
    You will see `Available on:
        http://127.0.0.1:8080
        http://10.0.0.187:8080` or similar


## 📝 How to Play
- Click **Start** to begin the game (Timer set to 60s).
- Click on a letter to start a word.
- Click on **adjacent** letters (horizontal, vertical, or diagonal) to form a valid English word.
- Click Submit to check your word:
  Valid words add to your score.  
  Invalid words or words already found will show a warning.
- Use **Reset** to start over with a fresh board.

--- 

## 🔮 Future Improvements
- Add "Drag-to-Select" functionality for faster gameplay.
- Add word definitions display upon successful submission.

## 🤝 Acknowledgements

This project was created during my time at [**Techtonica**](https://techtonica.org/), a non-profit program that bridges the tech gap. Special thanks to my mentors and peers for their code reviews and feedback.

---

## Author 
**Shu Wang**
- [portfolio](https://shuwangs.github.io/portfolio-website/)
- [Github](https://github.com/shuwangs)