/**
 * @swagger
 * /user/staff:
 *   get:
 *     summary: Get all staff user
 *     description: Returns all staff user
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
 *                 email: 'john@example.com'
 *                 tel: '123-456-7890'
 *
 *               - id: 2
 *                 last_name: 'admin'
 *                 first_name: 'carol'
 *                 username: 'carolAdm'
 *                 email: 'carol@toto.com'
 *                 tel: '0601010101'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const pool = require('../dbConnection');


const getStaff = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const result = await connection.query("select id_user, last_name, first_name, username, email, tel from user WHERE permission = 2 OR 3");

        connection.release();

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getStaff };