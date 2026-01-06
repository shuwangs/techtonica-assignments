import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import BLOGS from './blog.js';

dotenv.config({ path: './.env' })

const app = express();
const port = process.env.PORT || 5000

// [READ] GET
app.get('/api/blogs', (req, res) => {
    res.send("Here will be the display the blogs");
})

// [CREATE] POST: add new blog
app.post('/app/blogs', (req, res) =>{
     res.send("Here will be the create new blogs");
})

// [UPDATE] PUT: update blogs
app.put('/app/blogs/:id', (req, res) =>{
     res.send("Here will be the update blogs");
})


// [DELETE] DELETE: update blogs
app.delete('/app/blogs/:id', (req, res) =>{
     res.send("Here will be the delete blogs");
})


app.listen(port, ()=> {
    console.log(`API server listening on port ${port}`);
})
