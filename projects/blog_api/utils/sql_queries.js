export const GET_ALL_BLOGS = `
    SELECT p.title, p.summary, p.created_at, cats.name AS category_name, ARRAY_AGG (tags.name) AS tags
    FROM posts p
    LEFT JOIN categories cats on p.category_id = cats.id
    LEFT JOIN tags_posts tp on p.id = tp.post_id 
    LEFT JOIN tags on tp.tag_id = tags.id
    GROUP BY p.title, p.summary, p.created_at, category_name
    ORDER BY p.created_at DESC`

export const GET_SINGLE_BLOG = `
    SELECT p.title, p.summary, p.created_at, cats.name AS category_name, ARRAY_AGG (tags.name) AS tags
    FROM posts p
    LEFT JOIN categories cats on p.category_id = cats.id
    LEFT JOIN tags_posts tp on p.id = tp.post_id 
    LEFT JOIN tags on tp.tag_id = tags.id
    WHERE p.id = $1
    GROUP BY p.title, p.summary, p.created_at, category_name`


export const INSERT_INTO_CATEGORIES = `
    INSERT INTO categories (name)
    VALUES ($1)
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name 
    RETURNING id`
                
export const POST_BLOG = `
    INSERT INTO posts (title, summary, content, cover_image_url, created_at,  category_Id)
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING id`

export const INSERT_INTO_TAGS =`
    INSERT INTO tags(name)
    VALUES ($1)
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id`

export const INSERT_INTO_TAGS_POSTS =`
    INSERT INTO tags_posts(tag_id, post_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING`

export const UPDATE_POST = `
    UPDATE posts 
    SET title = COALESCE($1, title), 
    summary = COALESCE($2, summary), 
    content = COALESCE($3, content), 
    cover_image_url = COALESCE($4, cover_image_url),
    category_id = COALESCE($5, category_id),
    updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *`            

export const DELETE_TAGS = `
    DELETE 
    FROM tags_posts 
    WHERE post_id = $1`

export const DELETE_POSTS = `
    DELETE 
    FROM posts
    WHERE id = $1 
    RETURNING *`