const pool = require('../dbConnection'); 

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Request for product
 */

/**
 * @swagger
 * /product/id:
 *   post:
 *     summary: Get products by IDs
 *     description: Returns product data based on provided IDs
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_products:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               id_products: [1, 3, 43, 6, 2, 1]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: 
 *               - id_product: 1
 *                 type_product: base
 *                 product_name: saumon
 *                 description: Description1
 *                 price: 10.99
 *                 quantity: null
 *               - id_product: 101
 *                 type_product: ingredient
 *                 product_name: emmental
 *                 description: oui i like it
 *                 price: 2.99
 *                 quantity: 2
 *               - id_product: 201
 *                 type_product: dessert
 *                 product_name: coulis_framboise
 *                 description: Description3
 *                 price: 8.99
 *                 quantity: null
 */


const getProductById = async (req, res) => {
    try {
        const { id_products } = req.body;

        if (!id_products || !Array.isArray(id_products) || id_products.length === 0) {
            return res.status(400).json({ error: 'Invalid or missing id_products array in the request body' });
        }

        const placeholders = id_products.map(() => '?').join(','); 
        const query = `SELECT * FROM product WHERE id_product IN (${placeholders})`;

        const connection = await pool.getConnection();
        const result = await connection.query(query, id_products);
        connection.release();

        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getProductById };
