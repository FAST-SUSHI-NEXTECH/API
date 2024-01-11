const jwt = require('jsonwebtoken');
const { secretKey } = require('./config');

function generateToken(id, username, perm) {
    const payload = {
        id: id,
        username: username,
        perm: perm,
    };

    const options = {
        expiresIn: '24h',
    };

    return jwt.sign(payload, secretKey, options);
}

module.exports = { generateToken };
