// // O Controller recebe a requisição (req) e a resposta (res)
// exports.uploadFiles = (req, res) => {
    
//     // 1. Verifica se os arquivos foram enviados corretamente
//     // O Multer coloca os arquivos dentro de 'req.files'
//     if (!req.files || req.files.length === 0) {
//         // Se não houver arquivos, retorna erro 400 e a mensagem do vídeo [1]
//         return res.status(400).json({ mensagem: "arquivo inválido" });
//     }

//     // 2. Se chegar aqui, os arquivos foram salvos com sucesso
//     // Retornamos o status 200 e a mensagem de sucesso do tutorial
//     return res.status(200).json({ 
//         mensagem: "arquivo recebido com sucesso",
//         // Opcional: enviamos o caminho da pasta que salvamos no 'req' lá no multer.js
//         diretorio: req.uploadDir 
//     });
// };