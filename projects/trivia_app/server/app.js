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
        
        // return data
        return res.json(data);
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch game data" });
    }

})

app.get('/api/categories', async (req, res) =>{
    try {
        const catUrl= "https://opentdb.com/api_category.php";
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