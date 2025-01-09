const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const { typeDefs } = require('./schemas/typedefs');
const { resolvers } = require('./schemas/resolvers');
const { getUserFromToken } = require('./utils/context');
const { connectDB } = require('./connection/db');

connectDB();


const app = express();
app.use(
    cors({
      origin: "*",      
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use(cookieParser());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
        const token = req.cookies.token || '';
        const user = getUserFromToken(token);
        return { user, res };
    },
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/api/graphql' });
    app.listen(10000, () => {
         console.log('Server is running on http://localhost:10000');
    });
}
startServer();


