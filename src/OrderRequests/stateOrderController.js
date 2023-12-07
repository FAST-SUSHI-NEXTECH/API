const pool = require('../dbConnection');

const putStateOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { etat_command, id_command } = req.body;

        // Will be set in the app, so can be state 2 or 3
        const query = "UPDATE customer_order SET order_state = ? WHERE id_order = ?";
        const command = await connection.execute(query, [etat_command, id_command]);

        connection.release();

        if (command.affectedRows === 0) {
            res.status(401).json({ message: 'Update failed, wrong id or state' });
        } else {
            res.json({ message: 'Update successful' });
        }
    } catch (error) {
        (error);
        res.status(500).json({ message: 'Internal server error.'});
    }
};

module.exports = { putStateOrder };
