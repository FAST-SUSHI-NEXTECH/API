const pool = require('../dbConnection');


const putIngredient = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { product_name, description, price, quantity, id_product } = req.body;

        // Use a parameterized query to prevent SQL injection
        const query = "UPDATE product SET product_name = ?, description = ?, price = ?, quantity = ? WHERE id_product = ? AND id_product BETWEEN 101 AND 199";
        const command = await connection.execute(query, [product_name, description, price, quantity, id_product]);

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
