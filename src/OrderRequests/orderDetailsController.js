const pool = require('../dbConnection'); 


/**
 * @swagger
 * /order/details:
 *   post:
 *     summary: Get content of an order
 *     description: Provide an order ID and receive the details of the order.
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
 *                 description: The ID of the order for which details are requested.
 *             required:
 *               - id_order
 *     responses:
 *       200:
 *         description: Successfully retrieved order details
 *         content:
 *           application/json:
 *             example: { message: 'Order details retrieved successfully.', data: [{ id_order: 1, id_content: 1 }, { id_order: 1, id_content: 400 }, { id_order: 1, id_content: 200 }] }
 *       400:
 *         description: Bad request or missing required parameters
 *         content:
 *           application/json:
 *             example: { message: 'Bad request or missing required parameters.' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */


const postOrderDetails = async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const { id_order } = req.body;

        const query = 'SELECT * FROM order_content WHERE id_order = ?';
        const result = await connection.query(query, [id_order]);
        connection.release();

        const output = {};
        const quantity = {};

        result.forEach(row => {
            const orderId = row.id_order;
            const productId = row.id_content;

            if (!output[orderId]) {
                output[orderId] = [];
            }

            if (productId in quantity) {
                quantity[productId]++;
            } else {
                quantity[productId] = 1;
            }

            output[orderId].push(productId);
        });


        const queryProduct = 'SELECT id_product, type_product, product_name, price, quantity FROM product WHERE id_product IN (?)';
        const endResult = await connection.query(queryProduct, [output[id_order]]);
        connection.release();

        if (endResult.length === 0) {
            res.status(404).json({message:"Order not found!"})
        } else {
            for (item in endResult) {
                id_item = endResult[item].id_product
                if (id_item in quantity) {
                    endResult[item].quantity = quantity[id_item];
                    new_price = endResult[item].quantity * endResult[item].price
                    endResult[item].price = new_price
                }
            }
            res.json(endResult);
        }
    } catch (error) {

        res.sendStatus(500);
    }
};

module.exports = { postOrderDetails };
