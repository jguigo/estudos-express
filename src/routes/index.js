// é legal usar o nome do arquivo com index, porque quando a gente faz a importação dele
// o node já reconhece ele de maneira automática e a gente especifica só routes e fica bem legal
// na hora de fazer a importação

const express = require('express');
const ProdutoController = require('../controller/produtoController.js'  )
const routes = express.Router();

routes.get('/produto/lista', ProdutoController.listarProdutos);
routes.post('/produto/criar', ProdutoController.cadastrarProduto);
routes.delete('/produtos/deletar/:id', ProdutoController.deletarProduto);//rotas parametrizadas! As rotas parametrizadas fazem uso do parâmetro, no caso ":id"
routes.put('/produto/atualizar/:id', ProdutoController.atualizarProduto);//mesma ideia do deletar + criar

// routes.get('/', (req, res)=>{ //o primeiro parâmetro seria considerado como uma rota!
//     console.log(req.query);
//     res.send('Olá Guilherme!');
// })


// routes.get('/produto/:id', (req, res)=>{
//     //quando utilizamos ':' seguido de uma nome, quer nada mais  é que dar um nome ao parâmetro que vai ser recebido. No caso ":id" o nome desse parâmetro é id! Esse tipo de rota se chama "rotas parametrizadas" e ao invés de uma query-string utilizamos params
    
//     //um ponto legal dos parametros é que podemos ter várias categorias, por exemplo, :id/:categoria/:seila... e saimos o concatenando!

//     console.log(req.params);
//     //o req params vai ter uma estrutura como se fosse um objeto (spoilers: é um objeto)
//     //sempre que eu tiver uma rota parametrizada e não passar o id, ele vai dizer que não existe como se só existe apenas /produto/algumacoisa(esse alguma coisa é o id)

//     res.send('Olá Guilherme!');
// })

// routes.post('/cadastrar', (req, res)=>{
//     console.log(req.body);
//     res.json(req.body);
// })

module.exports = routes;