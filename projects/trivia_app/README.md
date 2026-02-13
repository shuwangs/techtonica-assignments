
# 🎯 QuizCraft — Intelligent Trivia Game

A full-stack trivia platform built with React + Express, powered by the Open Trivia Database API.

Beyond testing knowledge, QuizCraft focuses on learning through feedback — tracking mistakes and generating AI-powered explanations for incorrect answers.

🔗 Live Demo:
---

## 🔗 Live Demo 
👉 https://trivia-game-app.vercel.app/

<img height= 250 src='./client/public/images/quiz-craft.gif'>


## 🧩 Features
- 🎮 Game Setup
    - Choose number of questions
    - Select category
    - Select difficulty (easy / medium / hard)
    - Select question type (multiple choice / true-false)

- Game Interface

    - Fetches questions dynamically from backend
    - Tracks answers in real-time
    - Displays one question at a time

- 📊 Game Results

    - Backend determines scores
    - Displays test summary
    - integrated with AI explanation for wrong answers
    - Allows replay
- 🤖 AI-Generated Explanations
    - For incorrect answers, the app sends structured prompts to an LLM
    - Generates concise explanations for why the correct answer is correct
    - Uses prompt engineering (no RAG required)

## 🛠 Tech Stack
    - Frontend: React (Vite), React Router, Axios, CSS
    - Backend: Node.js, Express.js, Open Trivia Database API
    - Testing:  Jest

---

## 🧪 TESTING

### Units testing
- *AnalyzeQuizResults.test.js*: Validates the scoring algorithm, including edge case handling for mismatched questions, whitespace in answers, and missing data.

<!-- ### Component Tests

- GameInterface renders question
- Answer selection updates state -->


## Now, get Started?

### Backend
   
1. Clone repository
```bash
git clone https://github.com/shuwangs/techtonica-assignments.git
cd techtonica-assignments/projects/trivia_app
```
2. Backend 
```bash
cd server
npm install
npm run dev
```
3. Create .env with required keys:

```bash
OPEN_TRIVIA_BASE_URL=...
OPEN_TRIVIA_CATEGORY_URL=...
(if using AI) `GEMINI_API_KEY=...
npm run dev
```

4. Frontend
```bash
cd client
npm install
npm run dev
```
## 🎮Start to play:
- enter your nickname(optional)
- Select params → start game → answer questions → navigate back/forward (answers persist)
- Refresh page mid-game (quiz restores)
- Submit → results table renders
- Expand row to fetch/show explanation for wrong answers

## 🔮 Future Improvements
- Database-backed mistake tracking
- User authentication
- Performance analytics dashboard
- Category-based weakness analysis
- Timed mode

---

## 🤝 Acknowledgements

* This project was created during my time at [**Techtonica**](https://techtonica.org/), a non-profit program that bridges the tech gap. Special thanks to my mentors and peers for their code reviews and feedback.


## Author 
**Shu Wang**
- [portfolio](https://shu-su-wang.vercel.app/)
- [Github](https://github.com/shuwangs)