/**
 * @swagger
 * /order/user/id:
 *   post:
 *     summary: Get orders by client id
 *     description: Returns details of customer orders based on the provided client ID from token.
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
 *                 description: The id_user of the order to retrieve.
 *             required:
 *               - id_user
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_order:
 *                     type: integer
 *                     description: The ID of the order.
 *                   id_client:
 *                     type: integer
 *                     description: The ID of the client.
 *                   order_state:
 *                     type: integer
 *                     description: The state of the order.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the order.
 *             example:
 *               - id_order: 1
 *                 id_client: 123
 *                 order_state: 1
 *                 date: '2023-01-01T12:00:00Z'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const pool = require('../dbConnection');

const getOrderByIdClient = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_user } = req.body;

        const query = 'SELECT * FROM customer_order WHERE id_client = ?';

        const result = await connection.query(query,[id_user]);
        connection.release();
        if (result.length === 0) {
            res.status(404).json({ message: 'Order not found or no order for this user.' });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

module.exports = { getOrderByIdClient };