const pool = require('../dbConnection');

const postCreateOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_client } = req.body;

        // we only insert these values, the value id_order is auto-increment, id_picker will be set when a picker will take the order and update the state
        const query = `INSERT INTO customer_order (id_client, order_state, date) VALUES (?, 1, NOW())`;

        const result = await connection.query(query, [id_client]);
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
