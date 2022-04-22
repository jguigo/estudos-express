const db = require('../database');
const { DataTypes } = require('sequelize');

const Categorias = require('./Categorias');
const Produtos = require('./Produtos');

const CategoriaProduto = db.define("CategoriaProduto",{
   categoria_id: {
      type: DataTypes.INTEGER,
      references:{
         model: Categorias,   //Sempre que estivermos falando de um FK, temos que passar um references!
         key: "id"
      }
   },
   categoria_id: {
      type: DataTypes.INTEGER,
      references:{
         model: Produtos,     //Sempre que estivermos falando de um FK, temos que passar um references!
         key: "id"
      }
   },
   createdAt: {
      type: DataTypes.DATE
   },
   updatedAt:{
      type: DataTypes.DATE
   }
})

module.exports = CategoriaProduto;