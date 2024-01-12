const pool = require('../dbConnection'); 


/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders
 *     description: Returns a list of all customer orders
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
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
 *               - id_order: 2,
 *                 id_client: 456,
 *                 order_state: 1,
 *                 date: '2023-01-02T12:00:00Z'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const getOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const users = await connection.query('SELECT * FROM customer_order');
        connection.release();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getOrder };