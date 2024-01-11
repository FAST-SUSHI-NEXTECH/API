const jwt = require('jsonwebtoken');
const { secretKey } = require('./config');


function decodeToken(req, res) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    const decoded = jwt.verify(token, secretKey);

        // Check if the decoded payload has the expected username and role
    if (decoded && decoded.username && decoded.id && decoded.perm) {
        console.log(decoded.id, decoded.username, decoded.perm)
        return { id: decoded.id, username: decoded.username, perm: decoded.perm };
    }

}

module.exports = { decodeToken };
