import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const BASE_URL = process.env.OPEN_TRIVIA_BASE_URL;
console.log(BASE_URL);
const app = express();

// middleware
app.use(cors());
app.use(express.json());



app.get('/api/game', async (req, res) =>{
    try {
        const params = new URLSearchParams()

        const { amount, category, difficulty, type } = req.query;
        if (amount) params.append("amount", amount);
        if (category) params.append("category", category);
        if (difficulty) params.append("difficulty", difficulty);
        if (type) params.append("type", type);

        const url=`${BASE_URL}?${params.toString()}`;
        console.log(url);

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        
        const formatedData = data.results.map(quiz => {
            const formatedCorrectAnswer = Array.isArray(quiz.correct_answer) 
                ? quiz.correct_answer
                : [quiz.correct_answer]

            const options = [...formatedCorrectAnswer, ...quiz.incorrect_answers]
            const shuffledOptions = options.sort(() => Math.random() - 0.5);
            return {
                question: quiz.question,
                type: quiz.type,
                difficulty: quiz.difficulty,
                category: quiz.category,
                options: shuffledOptions,
                correct_answer: quiz.correct_answer // for tempary testing in the frontend, 
            }
        })
        // console.log(formatedData);
        // return data
        return res.json(formatedData);
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch game data" });
    }

})

app.get('/api/categories', async (req, res) =>{
    try {
        const catUrl= process.env.OPEN_TRIVIA_CATEGORY_URL;
        console.log(catUrl);

        const response = await fetch(catUrl);
        const categories = await response.json();

        console.log(categories);
        
        // return data
        return res.json(categories);
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch categories" });
    }

})

export default app;