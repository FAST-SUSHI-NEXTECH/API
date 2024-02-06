/**
 * @swagger
 * /order/picker/count:
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
 *               - total_order: 8
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */


const pool = require('../dbConnection'); 

const postCountOrderByIdPicker = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_picker } = req.body;

        const query = `
            SELECT COUNT(*) AS total_order
            FROM customer_order
            WHERE id_picker = ?`;

        const result = await connection.query(query, [id_picker]);

        connection.release();

        const serializedResult = JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === 'bigint' ? Number(value) : value
        ));

        res.status(200).json(serializedResult);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { postCountOrderByIdPicker };

