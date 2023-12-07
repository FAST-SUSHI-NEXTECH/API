const pool = require('../dbConnection'); 

const postLogin = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "SELECT * FROM user WHERE username = ? AND password = ?";
        const user = await connection.query(query, [req.body.username, req.body.password]);
        connection.release();

        if (user.length === 0) {
            res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { postLogin };