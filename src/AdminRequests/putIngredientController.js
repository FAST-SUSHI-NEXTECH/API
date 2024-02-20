/**
 * @swagger
 * /product/update:
 *   put:
 *     summary: Update a product
 *     description: Update product data
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_product:
 *                 type: integer
 *               type_product:
 *                 type: string
 *               product_name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Product update successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Update successful
 *       '401':
 *         description: Update failed
 *         content:
 *           application/json:
 *             example:
 *               message: Update failed, wrong product_id or values
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */

const pool = require('../dbConnection');


const putProduct = async (req, res) => {
    try {
        const connection = await pool.getConnection();

        console.log("body", req.body);

        const { type_product, product_name, description, price, quantity, id_product } = req.body;

        if (type_product === 'base' || type_product === 'dessert' || type_product === 'appetizer' || type_product === 'plate') {
            // Use a parameterized query to prevent SQL injection
            const query = "UPDATE product SET type_product = ?, product_name = ?, description = ?, price = ?, quantity = ? WHERE id_product = ?";
            const command = await connection.execute(query, [type_product, product_name, description, price, quantity, id_product]);

            console.log(command);
            connection.release();

            if (command.affectedRows === 0) {
                res.status(401).json({ message: 'Update failed, wrong product_id or values' });
            } else {
                res.json({ message: 'Update successful' });
            }
        } else {
            res.status(400).json({ message: 'Update failed, wrong product_type (only: base, dessert, appetizer, plate)' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { putProduct };
