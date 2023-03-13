CREATE DATABASE goodfoodhunting;

CREATE TABLE dishes (
   id SERIAL PRIMARY KEY,
   title TEXT,
   image_url TEXT

);

CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   email TEXT,
   password_digest TEXT
);


INSERT INTO dishes (title, image_url) VALUES ('cake','https://www.bakingo.com/p/cake/square-shaped-choco-filled-black-forest-cake-cake2278blac');
INSERT INTO dishes (title, image_url) VALUES ('cake','https://www.indiagift.in/yummy-square-strawberry-cream-cake-ig-3638');

INSERT INTO dishes (title, image_url) VALUES ('pudding','https://www.indiagift.in/yummy-square-strawberry-cream-cake-ig-3638');

insert into users (email) VALUES ('ds@gmail.com');
insert into users (email) VALUES ('deepasaini@gmail.com');

ALTER TABLE dishes ADD COLUMN user_id INTEGER;


