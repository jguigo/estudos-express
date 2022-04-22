const express = require('express'); //importar express
const routes = require('./routes'); // não precisou especificar o arquivo porque ele estava como index.js

const db = require('./database'); //importar db

const app = express(); //criar com o express...

db.hasConection(); //valida se o db ta funcionando

app.use(express.json()); //é importante estar antes das rotas p/ que as rotas utilizem esses recursos.

app.use(routes); //usar as rotas

app.listen(3000, () => console.log('Servidor ON na porta 3000')); //ligar o servidor