const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes'); 

// disponibiliza a pasta uploads como rota pública
app.use('/uploads', express.static('uploads'));

// Middlewares globais
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json());

// Registro de todas as rotas da API centralizadas
app.use('', routes);

module.exports = app;