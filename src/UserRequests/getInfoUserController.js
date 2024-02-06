/**
 * @swagger
 * /user/info:
 *   get:
 *     summary: Get user information
 *     description: Retrieves information about the authenticated user.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             example: 
 *               id_user: 1
 *               last_name: "doe"
 *               first_name: "john"
 *               username: "johnFifou"
 *               email: "john@email.com"
 *               tel: "0701010102"
 *               permission: 1
 *       401:
 *         description: Authentication failed or insufficient permissions
 *         content:
 *           application/json:
 *             example: { message: 'Authentication failed. Invalid token or insufficient permissions.' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */


const pool = require('../dbConnection');
const { decodeToken } = require('../jwtDecode');

const getInfoUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const decodedValues = decodeToken(req, res);

        const { id, username, perm } = decodedValues;

        const query = "SELECT * FROM user WHERE username = ? AND id_user = ? AND permission = ?";
        const result = await connection.query(query, [username, id, perm]);

        if (result.length === 0) {
            res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
        } else {
            res.json(result);
        }

        connection.release();
    } catch (error) {

        res.sendStatus(500);
    }
};

module.exports = { getInfoUser };
