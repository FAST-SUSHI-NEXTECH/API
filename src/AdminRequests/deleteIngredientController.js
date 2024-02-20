/**
 * @swagger
 * /product/delete:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product based on the provided id user
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
 *                 description: The id of the product to be deleted
 *             required:
 *               - id_product
 *     responses:
 *       200:
 *         description: product deleted successfully
 *         content:
 *           application/json:
 *             example: { message: 'product deleted successfully.' }
 *       401:
 *         description: Delete failed, user not found
 *         content:
 *           application/json:
 *             example: { message: 'Delete failed. product not found.' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const pool = require('../dbConnection');

const deleteProduct = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "DELETE FROM product WHERE id_product = ?";
        const result = await connection.query(query, [req.body.id_product]);

        connection.release();

        if (result.affectedRows === 0) {
            // No product found with the provided username
            res.status(401).json({ message: 'Delete failed. Product not found.' });
        } else {
            // product deleted successfully
            res.json({ message: 'Product deleted successfully.' });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { deleteProduct };