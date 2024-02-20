/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product with the provided information
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type_product:
 *                 type: string
 *               product_name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *             required:
 *               - type_product
 *               - product_name
 *               - description
 *               - price
 *               - quantity
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example: { message: 'Product inserted successfully.' }
 *       400:
 *         description: Failed to create Product, all fields are required
 *         content:
 *           application/json:
 *             example: { message: 'All fields are required.' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { message: 'Internal server error.' }
 */

const pool = require('../dbConnection');

const postCreateProduct = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const {
            type_product,
            product_name,
            description,
            price,
            quantity
        } = req.body;



        if (!type_product || !product_name || !description || !price || !quantity) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        const fieldNames = Object.keys(req.body);
        const placeholders = fieldNames.map(() => '?').join(', ');

        // Include 'password' and 'perm' fields explicitly in the query
        const query = `INSERT INTO product (${fieldNames.join(', ')}) VALUES (${placeholders})`;

        const result = await connection.query(query, [type_product, product_name, description, price, quantity]);

        connection.release();

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'Product inserted successfully.' });
        } else {
            res.status(400).json({ message: 'Failed to insert product.' });
        }
    } catch (error) {

        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { postCreateProduct };

