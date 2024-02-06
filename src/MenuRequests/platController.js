const pool = require('../dbConnection'); 

/**
 * @swagger
 * /plate:
 *   get:
 *     summary: Get plate data
 *     description: Returns plate data
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { Plate: 'Poké poulet', price: 10.00 }
 */

const getPlatData = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const users = await connection.query('SELECT * FROM product WHERE type_product="plate"');
        connection.release();
        res.json(users);
    } catch (error) {
        res.sendStatus(500);
    }
};

module.exports = { getPlatData };