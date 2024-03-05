/**
 * @swagger
 * /order/total/state:
 *   post:
 *     summary: Get total order by state
 *     description: Returns total order price of an order based on the provided order ID.
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
 *               state:
 *                 type: integer
 *                 description: The state of the order to retrieve.
 *             required:
 *               - state
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - TOTAL_ORDER: 123,54
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *              example: { message: 'Order not found' }
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const pool = require('../dbConnection');

const getTotalOrderByState = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { state } = req.body;

        if (state !== 1 || state !== 2 || state !== 3) {
            res.status(404).json({ message: 'Wrong state!' });
        }

        const query = `SELECT ROUND(SUM(price), 2) AS TOTAL_ORDER 
        FROM order_content 
        JOIN product ON order_content.id_content = product.id_product 
        JOIN customer_order ON order_content.id_order = customer_order.id_order 
        WHERE customer_order.order_state = ?`;

        const result = await connection.query(query,[state]);
        connection.release();

        if (result[0].TOTAL_ORDER === null) {
            res.status(404).json({ message: 'Order not found or No order currently with this state.' });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

module.exports = { getTotalOrderByState };