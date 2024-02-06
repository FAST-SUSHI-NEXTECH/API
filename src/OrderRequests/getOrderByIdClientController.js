/**
 * @swagger
 * /order/id/user:
 *   get:
 *     summary: Get orders by client ID
 *     description: Returns details of customer orders based on the provided client ID from token.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_order:
 *                     type: integer
 *                     description: The ID of the order.
 *                   id_client:
 *                     type: integer
 *                     description: The ID of the client.
 *                   order_state:
 *                     type: integer
 *                     description: The state of the order.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the order.
 *             example: 
 *               - id_order: 1
 *                 id_client: 123
 *                 order_state: 1
 *                 date: '2023-01-01T12:00:00Z'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const { secretKey } = require('../config');
const jwt = require('jsonwebtoken');
const pool = require('../dbConnection'); 

const getOrderByIdClient = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing.' });
        }

        const token = authHeader.split(' ')[1];

        const decodedToken = jwt.verify(token, secretKey);
        
        const { id } = decodedToken;

        const query = 'SELECT * FROM customer_order WHERE id_client = ?';

        const result = await connection.query(query,[id]);
        connection.release();
        res.json(result);
    } catch (error) {
        res.sendStatus(500);
    }
};

module.exports = { getOrderByIdClient };