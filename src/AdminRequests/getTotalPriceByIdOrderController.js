/**
 * @swagger
 * /order/total/id:
 *   post:
 *     summary: Get total order by order ID
 *     description: Returns total order price of an order based on the provided order ID.
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

const getTotalOrderByIdOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_order } = req.body;        

        const query = `SELECT ROUND(SUM(price), 2) AS TOTAL_ORDER 
        FROM order_content 
        JOIN product ON order_content.id_content = product.id_product 
        WHERE order_content.id_order = ?`;

        const result = await connection.query(query,[id_order]);
        connection.release();

        if (result[0].TOTAL_ORDER === null) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

module.exports = { getTotalOrderByIdOrder };