const pool = require('../dbConnection'); 


/**
 * @swagger
 * /user/client/id:
 *   post:
 *     summary: Get client details by user ID
 *     description: Returns details of a client based on the provided user ID.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *                 description: The ID of the user (client) to retrieve.
 *             required:
 *               - id_user
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: 
 *               - id_user: 39
 *                 last_name: "Doe"
 *                 first_name: "John"
 *                 username: "toto"
 *                 password: "string"
 *                 email: "john.doe@example.com"
 *                 tel: "1234567890"
 *                 permission: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const postClientById = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { id_user } = req.body;        

        const query = 'SELECT * FROM user WHERE id_user = ? AND permission = 1';

        const result = await connection.query(query,[id_user]);
        connection.release();
        if (result.length === 0) {
            res.status(404).json({ message: 'User not found or maybe not a user with perm 1 !' });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

module.exports = { postClientById };