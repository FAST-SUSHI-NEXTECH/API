const pool = require('../dbConnection'); 

/**
 * @swagger
 * /dessert:
 *   get:
 *     summary: Get dessert data
 *     description: Returns dessert data
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { dessert: 'Chocolate Cake', price: 10.99 }
 */

const getDessertData = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const users = await connection.query('SELECT * FROM product WHERE type_product="dessert"');
        connection.release();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getDessertData };