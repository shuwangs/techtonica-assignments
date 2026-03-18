-- use my weather schema 
SET search_path TO weather_app;

-- insert users
INSERT INTO users (name, email) VALUES
('Bobo', 'bobo@example.com'),
('Shu', 'shu@example.com'),
('tester1', 'tester1@example.com');

-- Insert favorites
INSERT INTO favorites (user_id, city) VALUES
-- Bobo's favorite cities
(1, 'Sydney'),
(1, 'Tokyo'),
(1, 'New York'),

-- Shu's  favorite cities
(2, 'San Francisco'),
(2, 'Boston'),

-- tester1's favorite cities
(3, 'London'),
(3, 'Paris');