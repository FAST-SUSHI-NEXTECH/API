const pool = require('../dbConnection'); 


/**
 * @swagger
 * /order/id:
 *   post:
 *     summary: Get order by Id of the order
 *     description: Returns details of a customer order based on the provided order ID.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_order:
 *                 type: integer
 *                 description: The ID of the order to retrieve.
 *             required:
 *               - id_order
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: 
 *               - id_order: 1,
 *                 id_client: 123,
 *                 order_state: 1,
 *                 date: '2023-01-01T12:00:00Z'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const postOrderById = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_order } = req.body;        

        const query = 'SELECT * FROM customer_order WHERE id_order = ?';

        const result = await connection.query(query,[id_order]);
        connection.release();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { postOrderById };