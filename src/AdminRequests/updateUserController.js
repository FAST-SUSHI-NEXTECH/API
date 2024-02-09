/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update a user
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
 *               last_name:
 *                 type: string
 *               first_name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               tel:
 *                 type: string
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

const bcrypt = require('bcrypt');

const saltRounds = 10;


const putUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { user_id, last_name, first_name, username, email, tel } = req.body;

        if (user_id === undefined) {
            res.status(400).json({ message: 'Error: Missing user_id parameter' });
        }
        
        const parameters = [last_name, first_name, username, email, tel];
        const placeholders = [];

        // for every parameter if a parameter is vide, delete it from the list
        const columns = ['last_name', 'first_name', 'username', 'email', 'tel'];
        for (let i = 0; i < parameters.length; i++) {
            if (parameters[i]) { // If parameter exists, add it to SET clause
                placeholders.push(`${columns[i]} = ?`);
            }
        }

        if (placeholders.length === 0) {
            res.status(400).json({ message: 'Error: you need to enter at least one parameter to update!' });
        }

        // Use a parameterized query to prevent SQL injection
        const query = `UPDATE user SET ${placeholders.join(', ')} WHERE id_user = ?`;


        const command = await connection.execute(query, [...parameters.filter(param => param), user_id]);

        connection.release();

        if (command.affectedRows === 0) {
            res.status(401).json({ message: 'Update failed, wrong ingredient_id or values' });
        } else {
            res.status(200).json({ message: 'Update successful' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { putUser };