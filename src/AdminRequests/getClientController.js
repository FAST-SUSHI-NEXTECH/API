const pool = require('../dbConnection'); 

const getClient = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const query = await connection.query("SELECT * FROM user WHERE permission = '1'");
        connection.release();
        res.json(query);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { getClient };