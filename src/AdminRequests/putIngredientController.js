const pool = require('../dbConnection');

const putIngredient = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_ingredient, name_ingredient, description, prix, quantité } = req.body;

        // Use a parameterized query to prevent SQL injection
        const query = "UPDATE ingredient SET name_ingredient = ?, description = ?, prix = ?, quantité = ? WHERE id_ingredient = ?";
        const command = await connection.execute(query, [name_ingredient, description, prix, quantité, id_ingredient]);

        connection.release();

        if (command.affectedRows === 0) {
            res.status(401).json({ message: 'Update failed, wrong ingredient_id or values' });
        } else {
            res.json({ message: 'Update successful' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { putIngredient };
