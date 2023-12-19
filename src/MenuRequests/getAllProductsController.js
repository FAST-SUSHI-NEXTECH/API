const pool = require('../dbConnection'); 

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Request for product
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all product
 *     description: Returns appetizer data
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { appetizer: 'Salade', price: 2.99 }
 */


const getAllProduct = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const result = await connection.query('SELECT * FROM product');
        connection.release();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getAllProduct };