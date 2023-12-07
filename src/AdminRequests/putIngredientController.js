const pool = require('../dbConnection');

/**
 * @swagger
 * /custom/ingredient/update:
 *   put:
 *     summary: Update an ingredient
 *     description: Updates an ingredient based on the provided information
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               id_product:
 *                 type: integer
 *             required:
 *               - product_name
 *               - description
 *               - price
 *               - quantity
 *               - id_product
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             example: { message: 'Update successful' }
 *       401:
 *         description: Update failed, wrong ingredient_id or values
 *         content:
 *           application/json:
 *             example: { message: 'Update failed, wrong ingredient_id or values' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

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
