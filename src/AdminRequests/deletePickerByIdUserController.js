const pool = require('../dbConnection'); 

/**
 * @swagger
 * /user/picker/delete:
 *   delete:
 *     summary: Delete a user picker
 *     description: Deletes a user picker based on the provided id user
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
 *               id_user:
 *                 type: integer
 *                 description: The username of the user to be deleted
 *             required:
 *               - id_user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example: { message: 'Picker deleted successfully.' }
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

const deletePickerByIdUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = `CALL DELETE_PICKER_AND_UPDATE_ORDER(?);`;
        const result = await connection.query(query, [req.body.id_user]);

        connection.release();

        if (result.affectedRows === 0) {
            // No user found with the provided username
            res.status(401).json({ message: 'Picker not found.' });
        } else {
            // User deleted successfully
            res.json({ message: 'Picker deleted successfully.' });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { deletePickerByIdUser };