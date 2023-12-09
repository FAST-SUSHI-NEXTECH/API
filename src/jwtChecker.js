const jwt = require('jsonwebtoken');
const { secretKey, secretUsername, secretRole } = require('./config');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    // Check if the header has the Bearer prefix
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    try {
        // Verify if the JWT format is correct and if it's encoded with the correct secret key
        const decoded = jwt.verify(token, secretKey);

        // Check if the decoded payload has the expected username and role
        if (decoded && decoded.username === secretUsername && decoded.role === secretRole) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized: Invalid username or role' });
        }
    } catch (err) {
        console.error('Error verifying token:', err);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports = { verifyToken };
