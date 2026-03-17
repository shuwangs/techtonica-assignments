DROP SCHEMA IF EXISTS weather_app CASCADE;
CREATE SCHEMA weather_app;

-- SET search_path TO weather_app;
SET search_path TO weather_app;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email TEXT 
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  city TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);