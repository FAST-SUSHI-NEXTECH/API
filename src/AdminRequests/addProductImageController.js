/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: API operations related to products
 */

/**
 * @swagger
 * /product/upload/image:
 *   post:
 *     summary: Upload product image
 *     description: Uploads a product image based on the provided JWT token.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_product:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: File uploaded successfully
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { verifyExtensionImages } = require('../UserRequests/verifyExtensionImages');

const postProductImage = (req, res) => {
    try {
        let id_product;
        let filePath;

        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage }).single('image');

        upload(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            id_product = req.body.id_product;

            if (!id_product) {
                return res.status(400).json({ error: 'id_product is required in the request body' });
            }

            let cleanedFilename = req.file.originalname.replace(/[^a-zA-Z0-9.]/g, '').replace(/\.{2,}/g, '.');

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

            const fileExtension = cleanedFilename.split('.').pop();

            const uploadPath = path.join(`/assets/images/product/${id_product}/image/`);
            fs.mkdirSync(uploadPath, { recursive: true });

            filePath = path.join(uploadPath, `image.${fileExtension}`);

            // Resize the image using sharp
            try {
                await sharp(req.file.buffer)
                    .resize(460, 460)
                    .toFile(filePath);
            } catch (error) {
                console.error('Error resizing image:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json({ message: 'File uploaded and resized successfully' });
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { postProductImage };
