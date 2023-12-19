/**
 * @swagger
 * /order/details:
 *   post:
 *     summary: Get content of an order
 *     description: Provide an order ID and receive the details of the order.
 *     tags:
 *       - Order
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
