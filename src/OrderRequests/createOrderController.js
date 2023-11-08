const pool = require('../dbConnection');

const postCreateOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_client } = req.body;

        const query = `INSERT INTO commande (id_command, id_client, etat_command, timestamp) VALUES (DEFAULT, ${id_client}, 1, DEFAULT)`;

        const result = await connection.query(query);
        connection.release();

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'User inserted successfully.' });
        } else {
            res.status(400).json({ message: 'Failed to insert user.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { postCreateOrder };
