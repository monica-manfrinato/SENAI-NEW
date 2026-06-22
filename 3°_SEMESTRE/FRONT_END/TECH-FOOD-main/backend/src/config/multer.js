const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const baseDir = 'uploads';
    let subfolder = '';

    const tipoArquivo = path.extname(file.originalname).toLowerCase();

    if (tipoArquivo === '.png') subfolder = 'PNG';
    else if (tipoArquivo === '.pdf') subfolder = 'PDF';
    else if (tipoArquivo === '.jpg' || tipoArquivo === '.jpeg') subfolder = 'JPG';
    else subfolder = 'other';

    const uploadDir = path.join(baseDir, subfolder);
    fs.mkdirSync(uploadDir, { recursive: true });

    // guarda o caminho relativo para usar no banco
    req.uploadSubfolder = subfolder;

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const nomeArquivo = `${Date.now()}-${file.originalname}`;
    cb(null, nomeArquivo);
  }
});

const upload = multer({ storage });
module.exports = upload;
