const db = require("../database");
const Fabricantes = require('./Fabricantes'); //fazer referencia

// Como o javascript não possui todos os tipos de dados que um banco de dados tem, eu atulizo o sequelize pra pegar esses tipos de dados.
// Fazendo umas desestruturação de objetos, eu pego o DataTypes, desta forma eu consigo pegar todos os tipos que existem dentro de um DB
const { DataTypes } = require("sequelize");

//define vai criar a nossa estrutura, vai informar pro sequelize que essa tabela existe.
//define recebe três parâmetros:
// 1- "NomeDaTabela" -> Na realidade aqui não é o nome da tabela que fica no DB e sim o nome do modelo de tabela para o sequelize;
// 2- Quais são as colunas que existem nessa tabela e expecificar pro sequelize como elas estão criadas e definidas.
// 3- O terceipo parametro também é um objeto de configuração que diz pro sequalize que alguns campos não existem! isso é super imporante se não pode dar erro!!
const Produtos = db.define(
   "Produtos",
   {
      id: {
         type: DataTypes.INTEGER, //o tipo de dado que foi definido lá no DB
         primaryKey: true, //dizer se ela é primaryKey
         autoIncrement: true, //dizer se ela possui um auto incremento;
      },
      nome: {
         type: DataTypes.STRING,
      },
      preco: {
         type: DataTypes.FLOAT,
      },
      quantidade: {
         type: DataTypes.INTEGER,
      },
      fabricante_id: {
         type: DataTypes.INTEGER,
         references:{ //a onde esse meu atributo faz referencia
            model: Fabricantes, //fazer referência
            key: 'id' //a chave que esta fazendo referência do outro lado
         }
      },
      createdAt: {
         //tanto createdAt e updatedAt é uma configuração que vem por default no sequelize e ele já imagina que exista
         type: DataTypes.DATE, //uma coluna dessas já na tabela!
      }, //porem podem existir situações onde eu não tenha essa tabela... e ai?
      updatedAt: {
         //é para isso que existe o terceiro parâmetro!
         type: DataTypes.DATE,
      },
   },
   {
      tableName: "produtos", //sempre importante de por, porque se não for especifiado o sequelize coloca automaticamente o nome da nossa tabela no plural,
      //porém as vezes isso pode ser bém ruim se o nome da minha tabela não for no plural...
      // timestamps: false -> caso não existisse o createdAt e updateAt, então seria necessário por esse timestamps:false!
   }
);

module.exports = Produtos;

//Então pra cada tabela dentro do nosso banco de dados precisamos ter um model! Isso é trabalhoso? PRA KRLLLLLLLLLLLLLL! Mas depende do banco de dados tmb...
