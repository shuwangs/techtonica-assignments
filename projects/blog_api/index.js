import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import {writeJson, readJson, validateId} from './utils/utils.js'
import pool from './utils/db.js';

dotenv.config({ path: './.env' })
const port = process.env.PORT || 5000

const app = express();

// middlewares
app.use(cors())
app.use(express.json()); 

// let blogsData = readJson('./blog.json');
// [READ] GET: fetch all the blogs
app.get('/api/blogs', async (req, res) => {
     try {
          const result = await pool.query(
               `SELECT p.title, p.summary, p.created_at, 
               cats.name AS category_name, 
               ARRAY_AGG (tags.name) AS tags
               FROM posts p
               LEFT JOIN categories cats on p.category_id = cats.id
               LEFT JOIN tags_posts tp on p.id = tp.post_id 
               LEFT JOIN tags on tp.tag_id = tags.id
               GROUP BY p.title, p.summary, p.created_at, category_name
               ORDER BY p.created_at DESC`
          );

          res.json(result.rows);
     } catch (err) {
          res.status(500).json({
               error: err.message}
          )
     }
})

// [READ] GET: fetch single the blogs by blog id
app.get('/api/blogs/:id', async (req, res) => {
     const reqId = parseInt(req.params.id);
     if(!validateId(reqId, res)) return;
     try {
          // const idx = blogsData.findIndex(blog => blog.id === reqId);
          const result = await pool.query(
               `SELECT p.title, p.summary, p.created_at, 
               cats.name AS category_name, 
               ARRAY_AGG (tags.name) AS tags
               FROM posts p
               LEFT JOIN categories cats on p.category_id = cats.id
               LEFT JOIN tags_posts tp on p.id = tp.post_id 
               LEFT JOIN tags on tp.tag_id = tags.id
               WHERE p.id = $1
               GROUP BY p.title, p.summary, p.created_at, category_name`,
               [reqId]
               
          )
          if (result.rows.length === 0) {
               res.status(404).json({
                    error: "BlogNotFound",
                    message: "The blog you are looking for is not found."
               });
          }

          res.json(result.rows[0]);
     } catch (err) {
          res.status(500).json({
               error: err.message}
          )
     }

})


// [CREATE] POST: add new blog
// add to DB and also update to the front
app.post('/api/blogs', async (req, res) => {
     const { title, summary, content, category, tags, cover_image_url, create_at } = req.body;
     const client = await pool.connect();

     try {
          await client.query('BEGIN');

          // add to categories table
          const catRes = await client.query(
               `INSERT INTO categories (name)
               VALUES ($1) ON CONFLICT (name) 
               DO UPDATE SET name = EXCLUDED.name 
               RETURNING id`,
               [category || 'uncategoried']
          )
          const categoryId = catRes.rows[0].id;

          // add to posts table
          const postRes = await client.query(
               `INSERT INTO posts (title, summary, content, cover_image_url, created_at,  category_Id)
               VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
               [title, summary, content, cover_image_url, create_at, categoryId]
          )
          const postId = postRes.rows[0].id;

          // add to tags table

          for (const tagName of tags) {
            const tagRes = await client.query(
                `INSERT INTO tags(name)
                VALUES ($1)
                ON CONFLICT (name)
                DO UPDATE SET name = EXCLUDED.name
                RETURNING id`,
                [tagName]
            )
            const tagId = tagRes.rows[0].id;

            await client.query(
                `INSERT INTO tags_posts(tag_id, post_id)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING`
                ,
                [tagId, postId]
            )
        }
          await client.query('COMMIT');

          res.status(201).json({ 
               message: "Post created successfully", 
               postId: postId 
          });

          console.log(`Post "${title}" has been added to 4 tables`);

     } catch(err) {
          await client.query('ROLLBACK');
          res.status(500).json({
               error: err.message
          });
     } finally {
          client.release();
     }

})

// [UPDATE] PUT: update blogs
app.put('/api/blogs/:id', async (req, res) => {
     const reqIdx = parseInt(req.params.id);
     if(!validateId(reqIdx, res)) return;

     const { title, summary, content, category, tags, cover_image_url } = req.body;
     const client = await pool.connect();

     let categoryId = null;
     try {
          await client.query('BEGIN');

          // 1. update  categories table
          if (category) {
               const catRes = await client.query(
                    `INSERT INTO categories (name)
                    VALUES ($1)
                    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name 
                    RETURNING id`,
                [category]
               );

               categoryId = catRes.rows[0].id;
          }

          // 2. update posts table
          const updatePostQuery = 
               `UPDATE posts 
                SET title = COALESCE($1, title), 
                summary = COALESCE($2, summary), 
                content = COALESCE($3, content), 
                cover_image_url = COALESCE($4, cover_image_url),
                category_id = COALESCE($5, category_id),
                updated_at = CURRENT_TIMESTAMP
                WHERE id = $6
                RETURNING *`;
          
               const postRes = await client.query(updatePostQuery, [
                    title, summary, content, cover_image_url, categoryId, reqIdx
               ]);

          if (postRes.rowCount === 0) {
               await client.query('ROLLBACK');
               return res.status(404).json({ error: "BlogNotFound", message: "Blog not found." });
          }

          // 3. update tags
          if (tags && Array.isArray(tags)) {

               // delete previous tags 
               await client.query(
                    `DELETE 
                     FROM tags_posts 
                     WHERE post_id = $1`, 
                    [reqIdx]
               )
               
               // add new tags.
               for (const tagName of tags) {
                const tagRes = await client.query(
                    `INSERT INTO tags (name) 
                     VALUES ($1) 
                     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name 
                     RETURNING id`,
                    [tagName]
                );
                const tagId = tagRes.rows[0].id;

                await client.query(
                    `INSERT INTO tags_posts (tag_id, post_id) 
                     VALUES ($1, $2) 
                     ON CONFLICT DO NOTHING`,
                    [tagId, reqIdx]
                );
               }
          }
          await client.query('COMMIT');
          res.json({ message: "Post updated successfully", post: postRes.rows[0] });

     } catch (err) {
          await client.query('ROLLBACK');
          res.status(500).json({
               error: err.message
          });
     } finally {
          client.release();
     }
});


// [DELETE] DELETE:  blogs
app.delete('/api/blogs/:id', async (req, res) =>{
     const reqIdx = parseInt(req.params.id);
     if(!validateId(reqIdx, res)) return;

     try{
          const result = await pool.query(
               `DELETE 
               FROM posts
               WHERE id = $1 
               RETURNING *`,
               [reqIdx]
          );
          
          if (result.rowCount !== 0) {
               res.json({
                    message: "Blog deleted successfully",
                    deletedBlog: result.rows[0]
               });
          } else {
               res.status(404).json({
                    error: "BlogNotFound",
                    message: "The blog you are looking for is not found."
               });
          }
     } catch(err) {
          res.status(500).json({
               error: err.message
          });
     }
     
});


app.listen(port, ()=> {
    console.log(`API server listening on port ${port}`);
})
