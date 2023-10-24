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
CREATE TABLE friends (
    friendship_id INT PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    friend_id INT REFERENCES users(user_id),
    status VARCHAR(16) NOT NULL
);


-- Create the conversations table
CREATE TABLE conversations (
    conversation_id INT PRIMARY KEY,
    conversation_type VARCHAR(16) NOT NULL,
    conversation_title VARCHAR(32),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    creator_id INT REFERENCES users(user_id)
);

-- Create the participants table
CREATE TABLE participants (
    participant_id INT PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    conversation_id INT REFERENCES conversations(conversation_id)
);

-- TODO: Finish implementing table from schema on lucidchart
