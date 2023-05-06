const { gql, ApolloServer } = require('apollo-server');

const produtos = [{
    id: 1,
    nome:'Laptop MacBook',
    valor: 21350.99
},
{
    id: 2,
    nome:'Mesa escitorio',
    valor: 1500.99
}
]

const usuarios = [
    {
        id: 1,
        nome:'Paulo',
        salario: 11111.33,
        ativo: true,
        idade: 24
    },
    {
        id: 2,
        nome:'Gustavo',
        salario: 34111.33,
        ativo: true,
        idade: 34
    }
]

const typeDefs = gql`

    type Usuario{
        idade: Int,
        salario: Float,
        nome: String,
        ativo: Boolean,
        id: ID,
    }

    type Produto{
        nome: String,
        valor: Float,
        id: ID,
    }

    type Query {
        usuarios: [Usuario]
        produtos: [Produto]
        usuario(id: Int, nome: String ): Usuario
        produto(id: Int, nome: String ): Produto
    }
`;

const resolvers = {
    Query: {
      usuarios(){
        return usuarios
      },
      produtos(){
       return produtos
      },
      usuario(_, args){
        const { id, nome } = args
        if (id) return usuarios.find(usuario => usuario.id === id);
        return usuarios.find(usuario => usuario.nome === nome)
      },
      produto(_, args){
        const { id, nome } = args
        if (id) return produtos.find(prd => prd.id === id)
        return produtos.find(prd => prd.nome === nome)
      }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen();
