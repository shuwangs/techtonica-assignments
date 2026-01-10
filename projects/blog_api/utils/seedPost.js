import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import pool from './db.js';

const toNullIfEmpty = (params) => {
    if (!params || params.trim() ==="") return null;
    if (typeof value !== "string") {
        return String(value);
    }
    return params.trim();  

}

const insertPostToDB = async (filePath) =>{
    // const fileContent = matter.read(filePath);
    const { data, content } = matter.read(filePath) // {data: "this is the header thing", content: "this is the content"}

    // console.log(data) 
    // console.log(content)

    // Deal with coverImageUrl
    const coverImageUrl =
        data.cover_image_url && data.cover_image_url.trim() !== ""
            ? data.cover_image_url
            : null;

    const postData = {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: content,
        cover_image_url: coverImageUrl,
        tags: data.tags ?? [],
        category: data.category ?? null,
        create_at: data.date
    }

    // connect to DB
    const client = await pool.connect();

    try{
        // Transaction BEGIN 
        await client.query("BEGIN");

        // INSERT categories table
        const categoryRes = await client.query(
            `INSERT INTO categories (name)
            VALUES ($1)
            ON CONFLICT (name)
            DO UPDATE SET name = EXCLUDED.name
            RETURNING id`,
            [postData.category]
        );

        // console.log(categoryRes);

        const categoryId = categoryRes.rows[0].id;

        // INSERT posts table
        const postRes = await client.query(
            `INSERT INTO posts (title, summary, content, cover_image_url, created_at,  category_Id)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [postData.title, postData.summary, postData.content, postData.cover_image_url, postData.create_at, categoryId]
        );
        const postId = postRes.rows[0].id

        // INSERT tags table
        for (const tagName of postData.tags) {
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


        await client.query('commit');
        console.log(`POST ${postData.title} saved sucessfully!`);

    } catch(error) {
        await client.query('ROLLBACK');
        console.log("error message: ", error.message);
    } finally {
        client.release();
    }

};

// Get all the posts in the folder
const getAllPost = () => {
    const postPath = "./posts_md";
    const files = fs.readdirSync(postPath);
    return (files.map(file => `${postPath}/${file}`)) ;
}
console.log(getAllPost());

getAllPost().map(post => {
    insertPostToDB(post)
    .then(()=>{
        console.log(`${post} is saved successfully.`);
        process.exit();
    })
    .catch(err=>{
        console.error(err);
        process.exit(1);
    })
})