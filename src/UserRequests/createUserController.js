const pool = require('../dbConnection');

const postCreateUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "INSERT INTO users (username, password) VALUES (?, ?)";
        await connection.query(query, [req.body.username, req.body.password]);
        connection.release();

        res.json({ message: 'User inserted successfully.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
        
    }
};

module.exports = { postCreateUser };