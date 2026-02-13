import express from 'express';
import cors from 'cors';
import OpenTriviaService from "./services/OpenTriviaService.js";
import AIService from "./services/explain.js";
import {analyzeQuizResults} from './utils/AnalyzeQuizResults.js'
const BASE_URL = process.env.OPEN_TRIVIA_BASE_URL;
const app = express();

// middleware
app.use(cors({
    origin: ["http://localhost:5173/",
    "https://trivia-game-app.vercel.app/"],
    methods:['GET', 'POST']
}
    
));
app.use(express.json());

let lastGameQuestions = [];

app.get('/api/game', async (req, res) =>{
    try {
        const questions = await OpenTriviaService.getGameQuestions(req.query);

        lastGameQuestions = questions.map(q => ({
            question: q.question,
            correct_answer: q.correct_answer
        }));

        const dataForClient = questions.map(({ correctAnswer, ...rest }) => rest);

        return res.json(dataForClient);        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }

});


app.get('/api/categories', async (req, res) =>{
    try {
        const categories = await OpenTriviaService.getCategories();
        return res.json(categories);
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch categories" });
    }

})

app.post('/api/result', async(req, res) =>{
    try{
        const userAnswersArr = req.body.userAnswers;

        const { details, correctCount } = analyzeQuizResults(userAnswersArr, lastGameQuestions);

        const formatedRes = {
            correctCount: correctCount,
            totalCount: lastGameQuestions.length,
            details:details
        }

        res.json(formatedRes);
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: "Failed to analyze result", error: err.message})
    }
})
  
app.post('/api/explain', async(req, res) => {
    try{
        const { question, userSelected, correctAnswer } = req.body;

        if (!question || !correctAnswer) {
            return res.status(400).json({ error: "Missing question/correctAnswer" });
        }
        const fetchRes = await AIService.explainWrongAnswer({ question, userSelected, correctAnswer });
        
        let explanation;
        if (typeof fetchRes === 'string' ){
            const cleanRes = fetchRes.replace(/```json|```/g, '').trim();
            explanation = JSON.parse(cleanRes)
        } else {
            explanation = fetchRes;
        }

        return res.json(explanation);
    }catch(err) {
        console.error(err);
        return res.status(500).json({message: "Failed to analyze result"})
    }
})

export default app;