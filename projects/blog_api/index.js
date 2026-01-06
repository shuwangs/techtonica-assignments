import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import BLOGS from './blog.js';

dotenv.config({ path: './.env' })

const app = express();
const port = process.env.PORT || 5000

// Get 
app.get('/', (req, res) => {
    res.send("Hello world");
})


app.listen(port, ()=> {
    console.log(`API server listening on port ${port}`);
})