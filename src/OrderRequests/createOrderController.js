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
 *     description: Creates a new order for a client
 *     tags:
 *       - Order
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
 *             required:
 *               - id_client
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example: { message: 'Order created successfully.' }
 *       400:
 *         description: Failed to create order
 *         content:
 *           application/json:
 *             example: { message: 'Failed to create order.' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const postCreateOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_client } = req.body;

        // we only insert these values, the value id_order is auto-increment, id_picker will be set when a picker will take the order and update the state
        const query = `INSERT INTO customer_order (id_client, order_state, date) VALUES (?, 1, NOW())`;

        const result = await connection.query(query, [id_client]);
        connection.release();

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'Order inserted successfully.' });
        } else {
            res.status(400).json({ message: 'Failed to insert Order.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { postCreateOrder };
