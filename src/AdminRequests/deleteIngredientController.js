const pool = require('../dbConnection'); 

const deleteIngredient = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "DELETE FROM product WHERE type_product='ingredient' AND id_product= ?";
        const result = await connection.query(query, [req.body.ingredient]);

        connection.release();

        if (result.affectedRows === 0) {
            // No user found with the provided username
            res.status(401).json({ message: 'Delete failed. Ingredient not found.' });
        } else {
            // User deleted successfully
            res.json({ message: 'Ingredient deleted successfully.' });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { deleteIngredient };