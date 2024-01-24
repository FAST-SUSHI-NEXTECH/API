const path = require('path');

const verifyExtensionImages = (filename) => {
    const allowedExtensions = ['.png'];

    const fileExtension = path.extname(filename).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Invalid file extension');
    }
};

module.exports = { verifyExtensionImages };

