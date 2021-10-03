\c SocialMediaDB;

DROP TABLE IF EXISTS participant;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS chatroom;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
	last_login TIMESTAMP
);

CREATE TABLE chatroom (
	id serial PRIMARY KEY,
	roomname VARCHAR ( 50 ) UNIQUE NOT NULL
);

/* INTERMEDIARY TABLES */
CREATE TABLE participant (
	id serial PRIMARY KEY,
	user_id int references users(id),
	chatroom_id int references chatroom(id)
);

CREATE TABLE messages (
	id serial PRIMARY KEY,
	user_id int references users(id),
	chatroom_id int references chatroom(id),
	body VARCHAR ( 50 ) NOT NULL,
	time_sent TIMESTAMP
);
/* ---------------------- */

CREATE TABLE follow (
	id serial PRIMARY KEY,
	leader int references users(id),
	follower int references users(id)
);

CREATE TABLE post (
	id serial PRIMARY KEY,
	author int references users(id),
	body VARCHAR ( 300 ) NOT NULL,
	like_count int DEFAULT 0
);

CREATE TABLE likes (
	id serial PRIMARY KEY,
	liker int references users(id),
	post_id int references post(id)
);


INSERT INTO users (username, password, email, created_on)
	VALUES  ('@goat', 'biggoat', 'goat@gmail.com', current_timestamp),
          ('@bill', 'billguy', 'bill@gmail.com', current_timestamp),
          ('@preston', 'montoya', 'pman@gmail.com', current_timestamp);

INSERT INTO post (author, body)
	VALUES (1, 'This is my first post!!!');

INSERT INTO follow (leader, follower)
	VALUES  (1,2),
          (1,3),
          (2,3),
          (2,1),
          (3,2);

UPDATE post
	SET like_count = 1
	WHERE id = 1;

INSERT INTO likes (liker, post_id)
	VALUES (3,1);

INSERT INTO chatroom (roomname)
	VALUES ('Room1');

-- Adds users goat and bill to lineup
INSERT INTO participant (user_id, chatroom_id)
	VALUES (1, 1),
				(2, 1);

INSERT INTO messages (user_id, chatroom_id, body, time_sent)
	VALUES (1, 1, 'Hi everyone', current_timestamp),
				(2, 1, 'Yo yo yo!', current_timestamp);

SELECT * FROM users;
SELECT * FROM post;

-- All follows for all users
SELECT follower_user.username AS follower, leader_user.username AS followed FROM follow
	JOIN users AS follower_user ON follower_user.id = follow.follower
	JOIN users AS leader_user ON leader_user.id = follow.leader;

-- All followers for a specific users
SELECT follower_user.username AS follower, leader_user.username AS followed FROM follow
	JOIN users AS follower_user ON follower_user.id = follow.follower
	JOIN users AS leader_user ON leader_user.id = follow.leader
		WHERE leader_user.id = 1;

-- Show who liked posts
SELECT users.username AS liker, post.like_count AS num_of_likes, body FROM likes
	JOIN users ON users.id = likes.liker
	JOIN post ON post.id = likes.post_id;

-- Show all messages in a perticular chatroom
SELECT users.username AS sender, messages.body, chatroom.roomname FROM messages
	JOIN chatroom ON chatroom.id = chatroom_id
	JOIN users ON users.id = user_id
	WHERE chatroom.id = 1;

-- Show all participants in a chatroom
SELECT users.username FROM participant
	JOIN chatroom ON chatroom.id = chatroom_id
	JOIN users ON users.id = user_id
	WHERE chatroom.id = 1;

/*
Enter psql shell:
	psql postgres

Run sql script:
	\i <filepath>

Quit shell:
	\q
*/