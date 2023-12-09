const pool = require('../dbConnection'); 

/**
 * @swagger
 * /user/client:
 *   get:
 *     summary: Get all clients
 *     description: Returns a list of all clients with permission level 1
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:  
 *               - id: 1
 *                 last_name: 'Doe'
 *                 first_name: 'John'
 *                 username: 'john_doe'
 *                 password: 'password'
 *                 email: 'john@example.com'
 *                 tel: '123-456-7890'
 *                 permission: 1
 *               - id: 2
 *                 last_name: 'Doer'
 *                 first_name: 'Jane'
 *                 username: 'john_doe'
 *                 password: 'password'
 *                 email: 'john@example2.com'
 *                 tel: '123-456-7890'
 *                 permission: 1

 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const getClient = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = await connection.query("SELECT * FROM user WHERE permission = '1'");
        connection.release();
        res.json(query);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getClient };