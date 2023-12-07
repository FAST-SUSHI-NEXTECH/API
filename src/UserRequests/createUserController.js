const pool = require('../dbConnection');

const postCreateUser = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const {
            last_name,
            first_name,
            username,
            password,
            email,
            tel
        } = req.body;

        if (!last_name || !first_name || !username || !password || !email || !tel) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        
        const fieldNames = Object.keys(req.body);

        const placeholders = fieldNames.map(() => '?').join(', ');
        const query = `INSERT INTO user (${fieldNames.join(', ')}, perm) VALUES (${placeholders}, 1)`;
        const values = fieldNames.map(fieldName => req.body[fieldName]);

        const result = await connection.query(query, values);
        connection.release();

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'User inserted successfully.' });
        } else {
            res.status(400).json({ message: 'Failed to insert user.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { postCreateUser };
