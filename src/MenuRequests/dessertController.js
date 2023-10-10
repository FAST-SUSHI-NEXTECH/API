const pool = require('../dbConnection'); 

const getDessertData = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const users = await connection.query('SELECT * FROM dessert');
        connection.release();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getDessertData };