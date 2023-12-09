const pool = require('../dbConnection'); 

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user based on the provided username
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
 *               username:
 *                 type: string
 *                 description: The username of the user to be deleted
 *             required:
 *               - username
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example: { message: 'User deleted successfully.' }
 *       401:
 *         description: Delete failed, user not found
 *         content:
 *           application/json:
 *             example: { message: 'Delete failed. User not found.' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const deleteUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "DELETE FROM user WHERE username = ?";
        const result = await connection.query(query, [req.body.username]);

        connection.release();

        if (result.affectedRows === 0) {
            // No user found with the provided username
            res.status(401).json({ message: 'User not found.' });
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