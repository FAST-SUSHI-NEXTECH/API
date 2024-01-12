const pool = require('../dbConnection');

/**
 * @swagger
 * /order/state/update:
 *   put:
 *     summary: Update the state of an order
 *     description: Updates the state of a customer order
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
 *               order_state:
 *                 type: integer
 *                 description: The new state of the order (2 or 3)
 *               id_order:
 *                 type: integer
 *                 description: The ID of the order to be updated
 *             required:
 *               - order_state
 *               - id_order
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             example: { message: 'Update successful' }
 *       401:
 *         description: Update failed, wrong ID or state
 *         content:
 *           application/json:
 *             example: { message: 'Update failed, wrong ID or state' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const putStateOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { order_state, id_order } = req.body;

        // Will be set in the app, so can be state 2 or 3
        const query = "UPDATE customer_order SET order_state = ? WHERE id_order = ?";
        const command = await connection.execute(query, [order_state, id_order]);

        connection.release();

        if (command.affectedRows === 0) {
            res.status(401).json({ message: 'Update failed, wrong id or state' });
        } else {
            res.json({ message: 'Update successful' });
        }
    } catch (error) {
        (error);
        res.status(500).json({ message: 'Internal server error.'});
    }
};

module.exports = { putStateOrder };
