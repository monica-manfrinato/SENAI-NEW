const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const baseDir = 'uploads';
        let subfolder = '';

        const tipoArquivo = path.extname(file.originalname).toLowerCase();

        if (tipoArquivo === '.png') subfolder = 'PNG files';
        else if (tipoArquivo === '.pdf') subfolder = 'PDF files';
        else if (tipoArquivo === '.jpg') subfolder = 'JPG files';
        else subfolder = 'other files';

        const uploadDir = path.join(__dirname, '..', '..', baseDir, subfolder);
        fs.mkdirSync(uploadDir, { recursive: true });

        req.uploadDir = uploadDir;
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});

const upload = multer({ storage });
module.exports = upload;
