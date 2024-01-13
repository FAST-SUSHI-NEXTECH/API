const pool = require('../dbConnection');

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
 *               id_client:
 *                 type: integer
 *                 description: The ID of the client placing the order
 *               order_contents:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: An array of content IDs to associate with the order
 *             required:
 *               - id_client
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

const postCreateOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_client, order_contents } = req.body;

        // Insert into customer_order
        const insertOrderQuery = `INSERT INTO customer_order (id_client, order_state, date) VALUES (?, 1, NOW())`;
        const orderResult = await connection.query(insertOrderQuery, [id_client]);

        if (orderResult.affectedRows > 0) {
            // Get the last auto-incremented id_order
            const lastOrderIdResult = await connection.query('SELECT LAST_INSERT_ID() as last_id');
            const lastOrderId = parseInt(lastOrderIdResult[0].last_id, 10);

            // Insert into order_content
            if (order_contents && order_contents.length > 0) {
                for (const id_content of order_contents) {
                    const insertOrderContentQuery = `INSERT INTO order_content (id_order, id_content) VALUES (?, ?)`;
                    await connection.query(insertOrderContentQuery, [lastOrderId, id_content]);
                }

                connection.release();
                res.status(201).json({ message: 'Order and Order Content inserted successfully.' });
            } else {
                connection.release();
                res.status(201).json({ message: 'Order inserted successfully.' });
            }
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
