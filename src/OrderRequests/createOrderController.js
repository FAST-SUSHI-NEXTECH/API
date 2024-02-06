/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: Request for orders (create, state, etc..)
 */

/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order for a client and associates content with the order.
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
 *               order_content:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: An array of content IDs to associate with the order
 *             required:
 *               - order_content
 *     responses:
 *       201:
 *         description: Order and Order Content created successfully
 *         content:
 *           application/json:
 *             example: { message: 'Order and Order Content created successfully.' }
 *       400:
 *         description: Failed to create Order or Order Content
 *         content:
 *           application/json:
 *             example: { message: 'Failed to create Order or Order Content.' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */
const pool = require('../dbConnection');
const { decodeToken } = require('../jwtDecode');


const postCreateOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id } = decodeToken(req, res);
        const { order_content } = req.body;

        if (!req.is('json')) {
            return res.status(400).json({ message: 'Bad request: Content-Type must be application/json.' });
        }

        const insertOrderQuery = `INSERT INTO customer_order (id_client, order_state, date) VALUES (?, 1, NOW())`;
        const orderResult = await connection.query(insertOrderQuery, [id]);

        if (orderResult.affectedRows > 0) {
            const lastOrderIdResult = await connection.query('SELECT LAST_INSERT_ID() as last_id');
            const lastOrderId = parseInt(lastOrderIdResult[0].last_id, 10);

            let sendingMessage = true;

            if (order_content && order_content.length > 0) {
                if (order_content.length === 1 && order_content[0] === '') {
                    connection.release();
                    res.status(422).json({ message: 'Bad request: You must have at least one article in your cart!' });
                } 
                else {
                    for (const id_content of order_content) {
                        const insertOrderContentQuery = `INSERT INTO order_content (id_order, id_content) VALUES (?, ?)`;
                        const response = await connection.query(insertOrderContentQuery, [lastOrderId, id_content]);

                        if (response.affectedRows !== 0) {
                            sendingMessage = false;
                        } else {
                            connection.release();
                            return res.status(400).json({ message: 'Failed to insert Order content or Order.' });
                        }
                    }

                    if (sendingMessage) {
                        res.status(201).json({ message: 'Order and Order Content inserted successfully.' });
                    } else {
                        res.status(201).json({ message: 'Order inserted successfully.' });
                    }
                }
            } else {
                connection.release();
                res.status(400).json({ message: 'Bad request: You must have at least one article in your cart!' });
            }

            connection.release();
        } else {
            connection.release();
            res.status(400).json({ message: 'Failed to insert Order.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
module.exports = { postCreateOrder };
