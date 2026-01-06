import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import BLOGS from './blog.js';

dotenv.config({ path: './.env' })
const port = process.env.PORT || 5000

console.log(BLOGS);

const app = express();

// middlewares
app.use(cors())
app.use(express.json());

let blogsData = [...BLOGS];
// [READ] GET: fetch all the blogs
app.get('/api/blogs', (req, res) => {
    res.json(blogsData);
    // res.send("Here will be the display the blogs");
})

// [CREATE] POST: add new blog
app.post('/api/blogs', (req, res) =>{
     res.send("Here will be the create new blogs");
})

// [UPDATE] PUT: update blogs
app.put('/api/blogs/:id', (req, res) =>{
     res.send("Here will be the update blogs");
})


// [DELETE] DELETE: update blogs
app.delete('/api/blogs/:id', (req, res) =>{
     res.send("Here will be the delete blogs");
})


app.listen(port, ()=> {
    console.log(`API server listening on port ${port}`);
})
