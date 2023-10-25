-- Create the users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    phone TEXT,
    email VARCHAR(100) UNIQUE NOT NULL,
    online_status BOOLEAN DEFAULT FALSE,
    last_online TIMESTAMP
);


-- Create the friends table
-- NOTES: 
-- 1. changes the databtype of user_id and friend_id from int to uuid due to the incompatible error
-- 2. Add the constaint to make sure the only unique tuples can be added to database
CREATE TABLE friends (
    friendship_id INT PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    friend_id UUID REFERENCES users(user_id),
    status VARCHAR(16) NOT NULL,
    UNIQUE(user_id, friend_id)
);


-- Create the conversations table
-- NOTES: changes the databtype of creator_id from int to uuid due to the incompatible error
CREATE TABLE conversations (
    conversation_id INT PRIMARY KEY,
    conversation_type VARCHAR(16) NOT NULL,
    conversation_title VARCHAR(32),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    creator_id UUID REFERENCES users(user_id)
);

-- Create the participants table
CREATE TABLE participants (
    participant_id INT PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    conversation_id INT REFERENCES conversations(conversation_id)
);

-- Create the messages table 
CREATE TABLE messages (
    message_id INT PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    messages_text VARCHAR(255),
    timestamp TIMESTAMP,
    conversation_id INT REFERENCES conversations(conversation_id)
)


