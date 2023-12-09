/**
 * @swagger
 * /token:
 *   post:
 *     summary: Generate access token
 *     description: Generate an access token based on the provided username and role.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - username
 *               - role
 *     responses:
 *       200:
 *         description: Access token generated successfully
 *         content:
 *           application/json:
 *             example: { accessToken: 'your_generated_token_here' }
 *       400:
 *         description: Bad Request - Username and role are required in the request body
 *         content:
 *           application/json:
 *             example: { error: 'Username and role are required in the request body' }
 *       403:
 *         description: Forbidden - Invalid username or role
 *         content:
 *           application/json:
 *             example: { error: 'Forbidden: Invalid username or role' }
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: { error: 'Internal Server Error' }
 */



const { secretUsername, secretRole } = require("../config");
const { generateToken } = require("../generateToken");

const generateTokenRequest = async (req, res) => {
    try {
        const { username, role } = req.body;

        // Check if username and role are provided in the request body
        if (!username || !role) {
            return res.status(400).json({ error: 'Username and role are required in the request body' });
        } else if (username !== secretUsername || role !== secretRole) {
            return res.status(403).json({ error: 'Forbidden: Invalid username or role' });
        } else {
            // Generate tokens using the provided username and role
            const accessToken = generateToken(username, role);
            res.json({ accessToken });
        }

    } catch (error) {
        console.error('Error generating tokens:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = {generateTokenRequest};