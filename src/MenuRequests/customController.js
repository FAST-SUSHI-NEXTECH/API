const pool = require('../dbConnection'); 

/**
 * @swagger
 * /base:
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
 * /ingredient:
 *   get:
 *     summary: Get ingredient data
 *     description: Returns ingredient data
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { ingredient: 'Cheese', price: 2.99 }
 */

const getBaseCustomData = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const users = await connection.query('SELECT * FROM product WHERE type_product="base"');
        connection.release();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};


const getIngredientCustomData = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const users = await connection.query('SELECT * FROM ingredient');
        connection.release();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getBaseCustomData, getIngredientCustomData };