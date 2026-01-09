import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import {writeJson, readJson, validateId} from './utils/utils.js'

dotenv.config({ path: './.env' })
const port = process.env.PORT || 5000

// console.log(BLOGS);

const app = express();

// middlewares
app.use(cors())
app.use(express.json()); 

let blogsData = readJson('./blog.json');
// [READ] GET: fetch all the blogs
app.get('/api/blogs', (req, res) => {
    res.json(blogsData);
})

// [READ] GET: fetch single the blogs by blog id
app.get('/api/blogs/:id', (req, res) => {
     const reqId = parseInt(req.params.id);
     if(!validateId(reqId, res)) return;
     
     const idx = blogsData.findIndex(blog => blog.id === reqId);

     if (idx !== -1) {
          res.json(blogsData[idx]);
     } else {
          res.status(404).json({
               error: "BlogNotFound",
               message: "The blog you are looking for is not found."
          });
     }
})


// [CREATE] POST: add new blog
// add to DB and also update to the front
app.post('/api/blogs', (req, res) => {
     const nextIdx = blogsData.length + 1;

     const BlogPlaceholder = {
          id: nextIdx,       
          title: "",
          slug: "",
          fileName: "",
          date: "",
          category: "",
          summary: "",
          tags: []
     }

     let newBlog = {...BlogPlaceholder, ...req.body};

     blogsData.push(newBlog);

     writeJson(blogsData);

     res.json(blogsData);writeJson
})

// [UPDATE] PUT: update blogs
app.put('/api/blogs/:id', (req, res) => {
     const reqId = parseInt(req.params.id);

     if(!validateId(reqId, res)) return;

     const idx = blogsData.findIndex(blog => blog.id === reqId);

     if (idx !== -1) {
          blogsData[idx] = {...blogsData[idx], ...req.body} //compare old data with new data one by one to replace, in case data missing 

          writeJson(blogsData);
          res.json(blogsData);
     } else {
          res.status(404).json({
               error: "BlogNotFound",
               message: "The blog you are looking for is not found."
          });
     }

})


// [DELETE] DELETE: update blogs
app.delete('/api/blogs/:id', (req, res) =>{
     const reqIdx = parseInt(req.params.id);

     if(!validateId(reqId, res)) return;

     const idx = blogsData.findIndex(blog => blog.id === reqIdx);

     if(idx !== -1) {
          const deletedBlog = blogsData.splice(idx, 1);
          writeJson(blogsData);
          res.json(blogsData); 
     } else {
          res.status(404).json({
               error: "BlogNotFound",
               message: "The blog you are looking for is not found."
          });
     }
     
})


app.listen(port, ()=> {
    console.log(`API server listening on port ${port}`);
})
