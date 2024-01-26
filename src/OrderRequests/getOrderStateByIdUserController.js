/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: API operations related to orders
 */

/**
 * @swagger
 * /order/state:
 *   post:
 *     summary: Get order state by user ID
 *     description: Retrieves the state of the latest order for a given user ID.
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
 *               id_client:
 *                 type: integer
 *                 description: ID of the client
 *     responses:
 *       '200':
 *         description: Successfully retrieved order state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_state:
 *                   type: string
 *                   description: State of the latest order
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

const pool = require('../dbConnection'); 

const getOrderStateByIdUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_client } = req.body;        

        const query = 'SELECT order_state, id_order FROM customer_order WHERE id_client = ? ORDER BY date DESC LIMIT 1';

        const result = await connection.query(query,[id_client]);
        connection.release();
        res.json(result);
    } catch (error) {
        res.sendStatus(500);
    }
};

module.exports = { getOrderStateByIdUser };
