/**
 * @swagger
 * tags:
 *   - name: Picker
 *     description: API operations related to picker
 */

/**
 * @swagger
 * /user/picker/leaderboard:
 *   get:
 *     summary: Get leaderboard
 *     description: Returns full leaderboard data showing the number of orders completed by each picker in DESC.
 *     tags:
 *       - Picker
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: 
 *               - id_picker: 1
 *                 order_done: 80
 *                 last_name: "Toto"
 *                 first_name: "Titi"
 *               - id_picker: 2
 *                 order_done: 23
 *                 last_name: "Tata"
 *                 first_name: "Tutu"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: 
 *               message: 'Internal server error.'
 */


const pool = require('../dbConnection');

const getLeaderboard = async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const query = `
        SELECT 
            customer_order.id_picker,
            CAST(COUNT(id_order) AS INT) AS order_done,
            user.last_name,
            user.first_name
        FROM 
            customer_order
        INNER JOIN 
            order_picker ON customer_order.id_picker = order_picker.id_picker
        INNER JOIN 
            user ON order_picker.id_user = user.id_user
        GROUP BY 
            id_picker
        ORDER BY 
            order_done DESC`;

        const result = await connection.query(query);

        if (result.length === 0) {
            res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
        } else {            
            const serializedResult = JSON.parse(JSON.stringify(result, (key, value) =>
                        typeof value === 'bigint' ? value.toString() : value
            ));

            res.status(200).json(serializedResult);
        }

        connection.release();
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getLeaderboard };