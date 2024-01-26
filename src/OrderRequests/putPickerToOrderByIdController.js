/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: API operations related to orders
 */

/**
 * @swagger
 * /order/picker/update:
 *   put:
 *     summary: Assign picker to order
 *     description: Assigns a picker to a specific order based on the provided order ID.
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
 *               id_picker:
 *                 type: integer
 *                 description: ID of the picker to assign
 *               id_order:
 *                 type: integer
 *                 description: ID of the order to which the picker is assigned
 *     responses:
 *       '200':
 *         description: Picker assigned successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Update successful
 *       '401':
 *         description: Update failed
 *         content:
 *           application/json:
 *             example:
 *               message: Update failed, wrong ingredient_id or values
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */

const pool = require('../dbConnection');

const putPickerToOrderById = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_picker, id_order } = req.body;

        const query = "UPDATE customer_order SET id_picker = ? WHERE id_order = ?";
        console.log(query);
        const command = await connection.execute(query, [id_picker, id_order]);

        console.log(command);

        connection.release();

        if (command.affectedRows === 0) {
            res.status(401).json({ message: 'Update failed, wrong ingredient_id or values' });
        } else {
            res.json({ message: 'Update successful' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { putPickerToOrderById };
