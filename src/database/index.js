//CRIANDO A CONEXÃO DO DB COM O SEQUELIZE

const Sequelize = require('sequelize');

const DB_NAME = 'loja'; //node do database
const DB_USER = 'root'; //nome do usuário 
const DB_PASS = 'root'; //senha
const DB_CONFIG = {
    dialect: 'mysql', //qual o banco de dados que esta sendo utilizado
    host: 'localhost',
    port: 3306
}

//objeto para guardar a conexão do bando de dados
let db = {};

try{
    db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
} catch(error){
    console.error("Erro ao tentar uma conexão com o banco de dados");
}


async function hasConection(){
    try {
        await db.authenticate(); //isso aqui tenta rodar uma query de teste pra ver se o servidor está funcionando!!!
        console.log("Banco de dados conectados");
    } catch (error) {
        console.error(error);
    }
}

Object.assign(db, { // ADICIONA hasConection ao objeto
    hasConection
});  

module.exports =  db;