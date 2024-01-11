const jwt = require('jsonwebtoken');
const { secretKey, secretUsername } = require('./config');

function verifyToken(mode) {
    return function (req, res, next) {
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
            if (decoded && decoded.username && decoded.id && decoded.perm) {
                switch (mode) {
                    case 'admin':
                        if (secretUsername === decoded.username && decoded.perm === 3) {
                            return next(); 
                        } else {
                            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
                        }
                    case 'picker':
                        if (decoded.perm >= 2) {
                            return next();
                        } else {
                            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
                        }
                    case 'user':
                        if (decoded.perm >= 1) {
                            return next(); 
                        } else {
                            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
                        }
                    default:
                        return res.status(400).json({ message: 'Bad Request: Invalid mode' });
                }
            } else {
                return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
            }
        } catch (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    };
}

module.exports = { verifyToken };
