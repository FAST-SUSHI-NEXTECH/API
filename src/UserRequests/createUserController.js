const pool = require('../dbConnection');

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API operations related to users
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided information
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               last_name:
 *                 type: string
 *               first_name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               tel:
 *                 type: string
 *             required:
 *               - last_name
 *               - first_name
 *               - username
 *               - password
 *               - email
 *               - tel
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example: { message: 'User inserted successfully.' }
 *       400:
 *         description: Failed to create user, all fields are required
 *         content:
 *           application/json:
 *             example: { message: 'All fields are required.' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const postCreateUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const {
            last_name,
            first_name,
            username,
            password,
            email,
            tel
        } = req.body;

        if (!last_name || !first_name || !username || !password || !email || !tel) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        
        const fieldNames = Object.keys(req.body);

        const placeholders = fieldNames.map(() => '?').join(', ');
        const query = `INSERT INTO user (${fieldNames.join(', ')}, perm) VALUES (${placeholders}, 1)`;
        const values = fieldNames.map(fieldName => req.body[fieldName]);

        const result = await connection.query(query, values);
        connection.release();

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'User inserted successfully.' });
        } else {
            res.status(400).json({ message: 'Failed to insert user.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { postCreateUser };
