
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {eventModel, locationModel} = require('./db');


const typeDefs = gql`
  type Event{
    eid: ID!
    name: String!
    date: String
    location: Location
  }

  type Location {
    lid: ID!
    location: String
  }

  type Query {
    events: [Event!]
    locations: [Location!]
  }
`;

const resolvers = {
    Query: {
        events: async (_, args, ctx) => {
            //const query = "SELECT * FROM Player"
            
            const events = await eventModel.findAll({include: locationModel}); 
            console.log(events);
            return events;
        },
    },
};




const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
        // Make the connection pool available to the resolvers
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
