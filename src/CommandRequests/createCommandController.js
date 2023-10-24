const pool = require('../dbConnection');

const postCreateCommand = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "INSERT INTO command (id, name) VALUES (?, ?)";
        await connection.query(query, [req.body.id, req.body.name]);
        connection.release();

        res.json({ message: 'Command inserted successfully.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
        
    }
};

module.exports = { postCreateCommand };