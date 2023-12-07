const pool = require('../dbConnection'); 

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