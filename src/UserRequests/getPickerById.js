/**
 * @swagger
 * /user/picker/id:
 *   get:
 *     summary: Get picker by ID
 *     description: Returns details of a picker based on the provided ID.
 *     tags:
 *       - Order
 *     parameters:
 *       - in: query
 *         name: id_picker
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the picker to retrieve.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: 
 *               - id_picker: 1,
 *                 order_done: 0,
 *                 id_user: 1,
 *                 date: '2023-01-01T12:00:00Z'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const pool = require('../dbConnection'); 

const getPickerById = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_picker } = req.body;
        const query = 'SELECT * FROM order_picker WHERE id_picker = ?';
        const result = await connection.query(query, [id_picker]);
        connection.release();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getPickerById };