import express from 'express';
import cors from 'cors';
import BLOGS from './blog.js';

const app = express();
const PORT = 5001;


// Get 
app.get('/', (req, res) => {
    res.send("Hello world");
})


app.listen(PORT, ()=> {
    console.log(`API server listening on port ${PORT}`);
})