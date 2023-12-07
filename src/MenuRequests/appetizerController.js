const pool = require('../dbConnection'); 

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Request for product
 */

/**
 * @swagger
 * /appetizer:
 *   get:
 *     summary: Get base data
 *     description: Returns base data
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { dessert: 'Chocolate Cake', price: 10.99 }
 */


const getAppetizerData = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const users = await connection.query('SELECT * FROM product WHERE type_product="appetizer"');
        connection.release();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getAppetizerData };