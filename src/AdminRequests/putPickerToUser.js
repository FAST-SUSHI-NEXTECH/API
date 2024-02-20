/**
 * @swagger
 * /picker/downgrade:
 *   put:
 *     summary: Update a picker permission to user
 *     description: Updates a user based on the provided information
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
 *               user_id:
 *                 type: integer
 *             required:
 *               - user_id
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             example:
 *               message: "Update successful"
 *       400:
 *         description: Bad request, missing or invalid parameters
 *         content:
 *           application/json:
 *             example:
 *               message: "Error: Missing user_id parameter"
 *       401:
 *         description: Update failed, wrong user_id or values
 *         content:
 *           application/json:
 *             example:
 *               message: "Update failed, wrong user_id or values"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 */



const pool = require('../dbConnection');

const putPickerToUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { user_id } = req.body;

        // Use a parameterized query to prevent SQL injection
        const query = `UPDATE user SET permission = 1  WHERE id_user = ?`;


        const command = await connection.execute(query, [user_id]);

        connection.release();

        if (command.affectedRows === 0) {
            res.status(401).json({ message: 'Update failed, wrong id_user' });
        } else {
            res.status(200).json({ message: 'Update successful' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { putPickerToUser };