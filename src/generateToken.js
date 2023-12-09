const jwt = require('jsonwebtoken');
const { secretKey } = require('./config');

function generateToken(username, role) {
    const payload = {
        username: username,
        role: role,
    };

    const options = {
        expiresIn: '24h',
    };

    return jwt.sign(payload, secretKey, options);
}

module.exports = { generateToken };
