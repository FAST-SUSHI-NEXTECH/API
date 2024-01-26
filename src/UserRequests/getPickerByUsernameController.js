const pool = require('../dbConnection'); 


const postPickerByUsername = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { username } = req.body;

        const query = `
            SELECT order_picker.id_picker FROM order_picker 
            INNER JOIN user ON order_picker.id_user = user.id_user 
            WHERE user.username = ?;`;

        const result = await connection.query(query, [username]);

        connection.release();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { postPickerByUsername };

