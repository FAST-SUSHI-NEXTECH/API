const pool = require('../dbConnection'); 

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: API operations related to administrative tasks
 */

/**
 * @swagger
 * /custom/ingredient/delete:
 *   delete:
 *     summary: Delete an ingredient
 *     description: Deletes an ingredient based on the provided ID
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredient:
 *                 type: integer
 *                 description: The ID of the ingredient to be deleted
 *             required:
 *               - id_product
 *     responses:
 *       200:
 *         description: Ingredient deleted successfully
 *         content:
 *           application/json:
 *             example: { message: 'Ingredient deleted successfully.' }
 *       401:
 *         description: Delete failed, ingredient not found
 *         content:
 *           application/json:
 *             example: { message: 'Delete failed. Ingredient not found.' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

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