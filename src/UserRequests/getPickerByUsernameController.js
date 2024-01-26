/**
 * @swagger
 * tags:
 *   - name: Picker
 *     description: API operations related to pickers
 */

/**
 * @swagger
 * /picker/getByIdByUsername:
 *   post:
 *     summary: Get picker ID by username
 *     description: Retrieves the picker ID based on the provided username.
 *     tags:
 *       - Picker
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
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_picker:
 *                   type: integer
 *                   description: The ID of the picker corresponding to the provided username.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 */


const pool = require('../dbConnection'); 


const postPickerByUsername = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { username } = req.body;

        const query = `
            SELECT order_picker.id_picker FROM order_picker 
            INNER JOIN user ON order_picker.id_user = user.id_user 
            WHERE user.username = ?;`;

        const result = await connection.query(query, [username]);

        connection.release();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { postPickerByUsername };

