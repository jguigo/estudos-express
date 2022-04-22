const { Produtos, Fabricantes, Categorias } = require("../models/index"); //index importa altomaticamente

const ProdutoController = {
   listarProdutos: async (req, res) => {
      const listaDeProdutos = await Produtos.findAll({//findAll retorna tudo!
         //é possivel retornar mais de uma tabela utilizano [table1, table2]
         include: [Fabricantes, Categorias] // funciona como o INNER JOIN e com isso vai retornar as informações da tabela 
                              // do Fabricante mirando o id!
      }); 
      // e também posso passar um parâmetro where no findAll que retorna apenas 1
      res.json(listaDeProdutos);
   },
   cadastrarProduto: async (req, res) => {
      const { nome, preco, quantidade, fabricante_id, categoria_id } = req.body;
      //a desestruturação é feito pelo backend do jeito que o backend quer... quem tem que seguir
      //esse padrão é o frontend, então meio que o front que se vire...
      //NxM -> Para esse caso, o sequelize da vários métodos,Special methods https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances, 
      //para poder lidar com as tabelas intermediárias SEM PRECISAR ACESSA-LAS DE UMA MANEIRA DIRETA!!!! 
      //Então eu vou conseguir, neste caso, acessar uma categoria a partir do model de produto, sem ter que 
      //especificar a tabela intermediária.
      //Importante eu ainda vou precisar receber essa caterogia pelo banco.

      //a partir daqui a gente começa a utilizar alguns métodos que são do sequelize referentes aos
      //do mySQL, como create -> INSERT;
      const novoProduto = await Produtos.create({
         nome,
         preco, // aqui a gente coloca o que foi desestruturado da req.body;
         quantidade,
         fabricante_id,
      });

      const categoria = await Categorias.findByPk(categoria_id);

      //esse setCategorias, esse Categorias é o nome do meu model (o nome que eu passo dentro como primeiro
      //parâmetro dentro do db.define()! Se fosse fabricantes, então eu utilizaria setFabricantes, por exemplo
      await novoProduto.setCategorias(categoria);

      //aqui devolve os dados que foram cadastrados no sistema, mas poderia ser uma "mensagem"
      res.json(novoProduto);
   },

   atualizarProduto: async (req, res) => {
      const { id } = req.params;
      const { nome, preco, quantidade, fabricante_id } = req.body;
      //E se eu quiser enviar só o nome?!
      //Não tem problema, os campos que não forem preenchidos ficarão como undefined, e o sequelize tem
      //uma própria inteligência que quando receber um valor undefined ele não altera no db

      const attProduto = await Produtos.update(
         {
            nome,
            preco,
            quantidade, //igual o cadastrar eu preciso passar os acampos que podem ser atualizados
            fabricante_id,
         },
         {
            where: {
               id, //igual ao deletar eu preciso especificar onde eu quero atualizar!
            },
         }
      );

      const exibirAtt = await Produtos.findAll({ where: { id } });   //retornando o que foi atualizado!
      //exite outra forma, que seria utilizando findByPk(id) que como nome vai sugerindo, a gente utiliza 
      //a chave primária pra encontrar!
      res.json(exibirAtt);
   },

   deletarProduto: async (req, res) => {
      const { id } = req.params; //desestrutura para pegar o id que foi parametrizado nas rotas!

      await Produtos.destroy({
         //destroy é o DELETE do mySQL pro sequelize.
         where: {
            //pra especificar o que eu quero
            id, //aqui eu especifico de qual coluna eu filtrar para que possa ser deletado!
         },
      });

      res.json("Produto deletado!");
   },
};

module.exports = ProdutoController;
