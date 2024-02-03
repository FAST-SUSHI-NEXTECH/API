const pool = require('../dbConnection');

const bcrypt = require('bcrypt');

const saltRounds = 10;


const putUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const { user_id, last_name, first_name, username, password, email, tel } = req.body;

        if (user_id === undefined) {
            res.status(400).json({ message: 'Error: Missing user_id parameter' });
        }

        let newValue = password;
        
        if (password !== undefined) {
            newValue = await bcrypt.hash(password, saltRounds);
        }
        
        const parameters = [last_name, first_name, username, newValue, email, tel];
        const placeholders = [];

        // for every parameter if a parameter is vide, delete it from the list
        const columns = ['last_name', 'first_name', 'username', 'password', 'email', 'tel'];
        for (let i = 0; i < parameters.length; i++) {
            if (parameters[i]) { // If parameter exists, add it to SET clause
                placeholders.push(`${columns[i]} = ?`);
            }
        }

        if (placeholders.length === 0) {
            res.status(400).json({ message: 'Error: you need to enter at least one parameter to update!' });
        }

        // Use a parameterized query to prevent SQL injection
        const query = `UPDATE user SET ${placeholders.join(', ')} WHERE id_user = ?`;

        console.log("query:", query)

        const command = await connection.execute(query, [...parameters.filter(param => param), user_id]);

        connection.release();

        if (command.affectedRows === 0) {
            res.status(401).json({ message: 'Update failed, wrong ingredient_id or values' });
        } else {
            res.status(200).json({ message: 'Update successful' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { putUser };