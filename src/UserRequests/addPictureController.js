/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API operations related to users
 */

/**
 * @swagger
 * /user/upload/avatar:
 *   post:
 *     summary: Upload user avatar
 *     description: Uploads a user avatar based on the provided JWT token.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             example: { message: 'File uploaded successfully' }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: { error: 'Unauthorized' }
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { error: 'Internal Server Error' }
 */


const multer = require('multer');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { secretKey } = require('../config');
const { verifyExtensionImages } = require('./verifyExtensionImages');

const postAvatarUser = (req, res) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: Bearer token missing or invalid' });
        }

        const token = authorization.slice(7);

        const decodedToken = jwt.verify(token, secretKey);

        const { username, id, perm } = decodedToken;

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                const uploadPath = `/assets/images/${perm}/${id}/${username}`;
                fs.mkdirSync(uploadPath, { recursive: true });
                cb(null, uploadPath);
            },
            filename: function (req, file, cb) {
                let cleanedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '').replace(/\.{2,}/g, '.');

                const dotIndex = cleanedFilename.indexOf('.');
                if (dotIndex !== -1 && cleanedFilename.charAt(dotIndex + 1) === '.') {
                    cleanedFilename = cleanedFilename.slice(0, dotIndex) + cleanedFilename.slice(dotIndex + 1);
                }

                try {
                    verifyExtensionImages(cleanedFilename);
                } catch (error) {
                    console.error('Error verifying file extension:', error);
                    return res.status(400).json({ error: 'Invalid file extension' });
                }

                cb(null, `${cleanedFilename}`);
            }
        });

        const upload = multer({ storage: storage }).single('avatar');

        upload(req, res, (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json({ message: 'File uploaded successfully' });
        });

    } catch (error) {
        console.error('Error decoding JWT token:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { postAvatarUser };



