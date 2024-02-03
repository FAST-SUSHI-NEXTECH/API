/**
 * @swagger
 * /user/picker/id:
 *   post:
 *     summary: Get picker by ID
 *     description: Returns details of a picker based on the provided ID.
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
 *               id_picker:
 *                 type: integer
 *             required:
 *               - id_picker
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: 
 *               - id_user: 1,
 *                 username: "johndoe"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */


const pool = require('../dbConnection'); 

const postPickerById = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_picker } = req.body;

        const query = `
            SELECT order_picker.id_picker, order_picker.id_user, user.username
            FROM order_picker
            INNER JOIN user ON order_picker.id_user = user.id_user
            WHERE order_picker.id_picker = ?`;

        const result = await connection.query(query, [id_picker]);

        connection.release();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { postPickerById };

