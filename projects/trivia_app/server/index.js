import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();


const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.OPEN_TRIVIA_BASE_URL;
console.log(BASE_URL);
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const params = new URLSearchParams()

app.get('/api/game', async (req, res) =>{
    try {
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
        
    } catch (err) {
        console.error(err);
    }

})

app.listen(PORT, ()=>{
    console.log(`Listening to port: ${PORT}`);
})