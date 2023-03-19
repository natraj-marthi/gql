
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Pool } = require('pg');

// Create a connection pool for PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'myDB',
    password: 'postgres',
    port: 5432,
});

let db;

const typeDefs = gql`
  type Friend{
    FID: ID!
    NAME: String!
  }

  type Query {
     allFriends: [Friend!]!
  }
`;

const resolvers = {
    Query: {
        allFriends: async (_, args, { db }) => {
            //const query = "SELECT * FROM Player"
            
            const {rows} = await db.query('SELECT * FROM public.FRIEND').catch(err => console.log(err));
            return rows;
        },
    },
};




const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
        // Make the connection pool available to the resolvers
        if (!db) {
            db = await pool.connect();
        }
        return { db };
    },
});

// Create an instance of the ApolloServer

// Create an Express app
const app = express();

// Apply the middleware of the Apollo server to the app
server.start().then(() => {
    server.applyMiddleware({ app });

    // Start the server
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
});
