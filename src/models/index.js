const CategoriaProduto = require('./CategoriaProduto');
const Categorias = require('./Categorias');
const Fabricantes = require('./Fabricantes');
const Produtos = require('./Produtos');

Produtos.belongsTo(Fabricantes, { //belongsTo diz que Produtos pertence a Fabricantes
   foreignKey: "fabricante_id"  //aqui que eu passo a foreignKey
               //importante passar como string
})

Fabricantes.hasMany(Produtos, {  //hasMany diz que Fabricantes tem vários Produtos!
   foreignKey: "fabricante_id" // A foreignKey se mantem a mesma!
               //importante passar como string!
})


//importante saber que quando a gente esta fazendo a relação de tabelas NxM, eu tenho que fazer essa 
//validação para os duas tabelas, de uma para outra. Neste caso abaixo:
//eu fiz de Produtos para Categorias e depois de Categorias para Produtos .
Produtos.belongsToMany(Categorias, {
   foreignKey: "produto_id",
   through: CategoriaProduto //aqui eu especifico uma tabela intermediária(quando tem relações NxM)
})
Categorias.belongsToMany(Produtos, {
   foreignKey: "categoria_id",
   through: CategoriaProduto //aqui eu especifico uma tabela intermediária(quando tem relações NxM)
})

module.exports = {
   Fabricantes,
   Produtos
}