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

const postLogin = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { username, password } = req.body;

        // Query the database to retrieve the hashed password for the given username
        const query = "SELECT * FROM user WHERE username = ?";
        const result = await connection.query(query, [username]);

        if (result.length === 0) {
            // User not found
            res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
        } else {
            const storedHashedPassword = result[0].password;

            // Compare the user-provided password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

            if (passwordMatch) {
                // Passwords match, authentication successful
                res.json(result);
            } else {
                // Passwords do not match
                res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
            }
        }

        connection.release();
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { postLogin };
