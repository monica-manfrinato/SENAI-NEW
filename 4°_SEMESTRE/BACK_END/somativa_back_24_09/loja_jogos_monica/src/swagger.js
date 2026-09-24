const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info:{
        title: "API Loja de Jogos",
        description:"Documentação automática da API Loja de Jogos utilizando Swagger Autogen",
        version:'1.0.0',
    },
    host: 'localhost:3000',
    schemes:['http'],
}

const outputFile ='./src/swagger_output.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentação do Swagger gerada com sucesso!");
});