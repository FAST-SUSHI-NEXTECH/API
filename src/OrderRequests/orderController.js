const pool = require('../dbConnection'); 

const getOrder = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const users = await connection.query('SELECT * FROM customer_order');
        connection.release();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getOrder };