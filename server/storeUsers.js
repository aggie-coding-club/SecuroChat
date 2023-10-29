const express = require('express')
const app = express()
const PORT = 3001

//middleware
app.use(express.json())
app.use(require('cors')())


// DATABASE
const db = require('./db.js');
db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err);
        process.exit(-1); // Exit the process with an error code
    } else {
        console.log('Database connection successful:', res.rows[0].now);
    }
});
app.get('/', async(req, res) => {
    console.log("howdy")
})


app.post('/register', async(req, res) => {
    const {username, phone, email, online_status, last_online} = req.body;

    // TODO: validation

    // Store registered users
    try {
        const result = await db.query(`
            INSERT INTO users(username, phone, email, online_status, last_online) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING user_id;
        `, [username, phone, email, online_status, last_online]);

        if(result.rows[0] && result.rows[0].user_id){
            res.status(201).json({id: result.rows[0].user_id});
        } else {
            res.status(500).send('Failed to retrieve user id');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


app.listen(PORT, () => console.log(`Sever has started on port: ${PORT}`))