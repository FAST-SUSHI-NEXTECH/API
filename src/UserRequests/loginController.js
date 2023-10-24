const pool = require('../dbConnection'); 

const postLogin = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "SELECT * FROM users WHERE username = ? AND password = ?";
        const users = await connection.query(query, [req.body.username, req.body.password]);
        connection.release();

        if (users.length === 0) {
            // No user found with the provided username and password
            res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
        } else {
            // User found, you can send user data or a success message here
            res.json(users);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { postLogin };