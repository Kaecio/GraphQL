const { makeExecutableSchema } = require('@graphql-tools/schema')
const { typeDefs, resolvers } = require('./src/graphql')
const { ApolloServer } = require('apollo-server')

const schema = new makeExecutableSchema({
    typeDefs,
    resolvers,
    formatError: (err) => {
        if (err.message.startsWith('Usuario existente:')) {
            console.log(err.message)
            return new Error(err.message)
        }

        return err;
        
    }
    
});

const server = new ApolloServer({schema});
server.listen().then(({url})=> console.log(url));

