-- Create the users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    phone TEXT,
    email VARCHAR(100) UNIQUE NOT NULL,
    online_status BOOLEAN DEFAULT FALSE,
    last_online TIMESTAMP
);

-- Create the authentication table
CREATE TABLE authentication (
    user_id UUID PRIMARY KEY REFERENCES users(user_id),
    password_hash VARCHAR(255) NOT NULL,
    public_key VARCHAR(255)
);

-- Create the friends table
CREATE TABLE friends (
    friendship_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    friend_id UUID REFERENCES users(user_id),
    status VARCHAR(16) NOT NULL
);

-- Create the notifications table
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    message_id UUID,
    notification_type VARCHAR(32) NOT NULL,
    notification_text VARCHAR(255) NOT NULL,
    notification_time TIMESTAMP NOT NULL
);

-- Create the conversations table
CREATE TABLE conversations (
    conversation_id UUID PRIMARY KEY,
    conversation_type VARCHAR(16) NOT NULL,
    conversation_title VARCHAR(32),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    creator_id UUID REFERENCES users(user_id)
);

-- Create the participants table
CREATE TABLE participants (
    participant_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    conversation_id UUID REFERENCES conversations(conversation_id)
);

-- Create the messages table
CREATE TABLE messages (
    message_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    sender_id UUID REFERENCES users(user_id),
    message_text VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    conversation_id UUID REFERENCES conversations(conversation_id)
);

-- Create the read_receipts table
CREATE TABLE read_receipts (
    read_receipt_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    message_id UUID REFERENCES messages(message_id),
    read_at TIMESTAMP NOT NULL
);

-- Create the attachments table
CREATE TABLE attachments (
    attachment_id UUID PRIMARY KEY,
    message_id UUID REFERENCES messages(message_id),
    media_link TEXT NOT NULL,
    attachment_type VARCHAR(16) NOT NULL
);
