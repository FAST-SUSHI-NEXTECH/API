/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user based on the provided username and password
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             example: { message: 'User authenticated successfully', user: { id: 1, username: 'john_doe', perm: 1 } }
 *       401:
 *         description: Authentication failed, invalid username or password
 *         content:
 *           application/json:
 *             example: { message: 'Authentication failed. Invalid username or password.' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */
const pool = require('../dbConnection'); 
const bcrypt = require('bcrypt');

const saltRounds = 10;

const postLogin = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = "SELECT * FROM user WHERE username = ? AND password = ?";
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await connection.query(query, [req.body.username]).concat(hashedPassword);
        connection.release();

        if (user.length === 0) {
            res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { postLogin };