import fs from 'fs';
import path from 'path';
// import matter from 'gray-matter';
import pool from './db.js';


const readMarkdownFile = async (filePath) =>{
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log(fileContent);
    // const { data, content } = matter(fileContent);

}

readMarkdownFile('./posts_md/2025-11-16-interface-class-ts.md');