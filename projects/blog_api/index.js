import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import BLOGS from './blog.js';
import fs from 'fs';
dotenv.config({ path: './.env' })
const port = process.env.PORT || 5000

// console.log(BLOGS);

const app = express();

// middlewares
app.use(cors())
app.use(express.json()); 

// ====== helper functions write to js=========
const writeDataToJS = (data) =>{
     // Data to write to Another file
     const dataToWrite = `const BLOGS = ${JSON.stringify(data, null, 4)};
     export default BLOGS;`;//null means no replace, 4 means 4 spaces indents    

     fs.writeFileSync('./blog.js', dataToWrite, 'utf-8') // Params: OUTFILE, datatowrite, the format
}


let blogsData = [...BLOGS];
// [READ] GET: fetch all the blogs
app.get('/api/blogs', (req, res) => {
    res.json(blogsData);
    // res.send("Here will be the display the blogs");
})

// [CREATE] POST: add new blog
// add to DB and also update to the front
app.post('/api/blogs', (req, res) =>{
     const newBlog = {
          id: 3,       
          title: "OMSCS 6400",
          slug: "omscs-6400-vs-object",
          fileName: "2026-placeholder.md",
          date: "2026-11-17",
          category: "JavaScript",
          summary: "Understanding the fundamental differences in JS object creation...",
          tags: ["EER", "SQL"]
     }

     blogsData.push(newBlog);

     writeDataToJS(blogsData);

     res.json(blogsData);
})

// [UPDATE] PUT: update blogs
app.put('/api/blogs/:id', (req, res) => {
     const reqIdx = parseInt(req.params.id);
     // console.log(reqIdx);
     const idx = blogsData.findIndex(blog => blog.id === reqIdx);
     console.log(idx);
     console.log(req.body);
     if (idx !== -1) {
          blogsData[idx] = {...blogsData[idx], ...req.body} //compare old data with new data one by one to replace, in case data missing 

          writeDataToJS(blogsData);
          res.json(blogsData);
     } else {
          res.status(404).send("The blog you are looking is not found");
     }

})


// [DELETE] DELETE: update blogs
app.delete('/api/blogs/:id', (req, res) =>{
     const reqIdx = parseInt(req.params.id);
     // console.log(reqIdx);
     const idx = blogsData.findIndex(blog => blog.id === reqIdx);

     if(idx !== -1) {
          const deletedBlog = blogsData.splice(idx, 1);
          writeDataToJS(blogsData);
          res.json(blogsData); 
     } else {
          res.status(404).send("The blog you are looking is not found");

     }
     
})


app.listen(port, ()=> {
    console.log(`API server listening on port ${port}`);
})
