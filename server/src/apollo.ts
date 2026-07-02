import {ApolloServer} from '@apollo/server'
import { typeDefs } from '../services/gqlSchema.js'
import { resolvers } from '../services/gqlResolvers.js'
const server = new ApolloServer({
typeDefs,
resolvers
})

await server.start()

export  default server