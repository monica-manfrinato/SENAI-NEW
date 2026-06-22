const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = async (req, res, next) => {
  try {
    if (req.file) {
      const caminhoFisico = path.join(req.file.destination, req.file.filename);
      const caminhoTemp = path.join(req.file.destination, "temp-" + req.file.filename);

      // Redimensiona e salva em arquivo temporário
      await sharp(caminhoFisico)
        .resize(800, 600, { fit: "inside" }) // mantém proporção
        .jpeg({ quality: 80 })               // compressão
        .toFile(caminhoTemp);

      // Substitui o original pelo redimensionado
      fs.renameSync(caminhoTemp, caminhoFisico);

      req.file.processado = true;
    }
    next();
  } catch (erro) {
    console.error("Erro ao processar imagem:", erro);
    next(erro);
  }
};
