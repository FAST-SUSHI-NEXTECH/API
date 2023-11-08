const pool = require('../dbConnection');

const putStateOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { etat_command, id_command } = req.body;

        // Use a parameterized query to prevent SQL injection
        const query = "UPDATE commande SET etat_command = ? WHERE id_command = ?";
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
