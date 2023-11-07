const pool = require('../dbConnection'); 

const deleteUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "DELETE FROM user WHERE identifiant = ?";
        const result = await connection.query(query, [req.body.identifiant]);

        connection.release();

        if (result.affectedRows === 0) {
            // No user found with the provided username
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else {
            // User deleted successfully
            res.json({ message: 'User deleted successfully.' });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { deleteUser };