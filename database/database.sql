-- Create the users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE, --can be null. User only needs username, phone, and password to have an account
    online_status BOOLEAN DEFAULT FALSE,
    last_online TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the authentication table
CREATE TABLE authentication (
    user_id UUID PRIMARY KEY REFERENCES users(user_id),
    password_hash VARCHAR(255) NOT NULL,
    public_key TEXT NOT NULL UNIQUE --Unique to each user. Public key is used for decryption
);


-- Create the friends table
CREATE TABLE friends (
    friendship_id SERIAL PRIMARY KEY, --made SERIAL to increase by default
    user_id UUID NOT NULL REFERENCES users(user_id),
    friend_id UUID NOT NULL REFERENCES users(user_id),
    status VARCHAR(16) NOT NULL,
    UNIQUE(user_id, friend_id) --ensures that only unique tuples of (user_id, friend_id) can be added
);

-- Create users_conversations table responsible for joining users and conversations table
CREATE TABLE users_conversations (
    participant_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id),
    conversation_id INT NOT NULL REFERENCES conversations(conversation_id)
);

-- Create the conversations table
CREATE TABLE conversations (
    conversation_id SERIAL PRIMARY KEY,
    conversation_type VARCHAR(16) NOT NULL,
    conversation_title VARCHAR(32) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    creator_id UUID NOT NULL REFERENCES users(user_id),
    last_message_id INT NOT NULL REFERENCES messages(message_id)
);

-- Create the participants table
CREATE TABLE participants (
    participant_id INT PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    conversation_id INT REFERENCES conversations(conversation_id)
);


-- TODO: Finish implementing table from schema on lucidchart
CREATE TABLE attachments(
    attachments_id SERIAL PRIMARY KEY,
    message_id INT NOT NULL REFERENCES messages(message_id),
    media_link TEXT NOT NULL,
    attachment_type VARCHAR(16) NOT NULL
);

-- Create the messages table 
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id),
    messages_text TEXT NOT NULL,
    time_sent TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    conversation_id INT NOT NULL REFERENCES conversations(conversation_id)
);



-- Create notifications table
CREATE TABLE notifications(
    notification_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id),
    message_id INT NOT NULL REFERENCES messages(message_id),
    notification_type VARCHAR(32) NOT NULL,
    notification_text VARCHAR (255) NOT NULL,
    notification_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create read_receipts table
CREATE TABLE read_receipts(
    read_receipts_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id),
    message_id INT NOT NULL REFERENCES messages(message_id),
    time_read TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
