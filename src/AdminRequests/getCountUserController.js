/**
 * @swagger
 * /user/count:
 *   get:
 *     summary: Get a count of total user
 *     description: Returns a total of all user
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
 *               - total_user: 47

 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const pool = require('../dbConnection'); 


const getUserCount = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const result = await connection.query("SELECT COUNT(*) AS total_user FROM user");
        connection.release();
        
        const serializedResult = JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === 'bigint' ? Number(value) : value
        ));

        res.status(200).json(serializedResult);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getUserCount };