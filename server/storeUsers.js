const express = require('express')
const app = express()
const PORT = 3001

// Middleware
app.use(express.json())
app.use(require('cors')())

// DATABASE
const db = require('./database');
db.connect();

// Validation functions for username, phone number, and email
const checkUsername = async(username) =>{
    const result = await db.query('SELECT username FROM users WHERE username = $1', [username]);
    return result.rows.length > 0;
}

const checkPhone = async(phone) =>{
    const result = await db.query('SELECT username FROM users WHERE phone = $1', [phone]);
    return result.rows.length > 0;
}

// Store registered users
// TODO: change the path when you need
app.post('/register', async(req, res) => {
    const {username, phone, online_status, last_online} = req.body;

    try {
        // validation
        const userNameExists = await checkUsername(username);
        if (userNameExists) {
            return res.status(400).send('Username already registered!' );
        }

        const phoneExists = await checkPhone(phone);
        if (phoneExists) {
            return res.status(400).send('Phone number already registered!' );
        }

        // If pass the validation checks, save the user information to database
        const result = await db.query(`
            INSERT INTO users(username, phone, email, online_status, last_online) 
            VALUES ($1, $2, $3, $4, $5)RETURNING user_id;
        `, [username, phone, online_status, last_online]);

        // check if the user information are saved 
        if(result.rows[0] && result.rows[0].user_id){
            res.status(201).json({id: result.rows[0].user_id});
        } else {
            res.status(500).send('Failed to retrieve user id');
        }

    } catch (err) {
        res.status(500).send('Server error');
    }
});


app.listen(PORT, () => console.log(`Sever has started on port: ${PORT}`))