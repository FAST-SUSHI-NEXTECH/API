const pool = require('../dbConnection'); 

const postLogin = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "SELECT * FROM user WHERE identifiant = ? AND mdp = ?";
        const user = await connection.query(query, [req.body.identifiant, req.body.mdp]);
        connection.release();

        if (user.length === 0) {
            // No user found with the provided username and password
            res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
        } else {
            // User found, you can send user data or a success message here
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { postLogin };