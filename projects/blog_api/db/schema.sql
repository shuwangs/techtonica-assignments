CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE tags(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    category_id INTEGER REFERENCES categories(id),
);

CREATE TABLE tags_posts (
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    PRIMARY KEY (tag_id, post_id)
);