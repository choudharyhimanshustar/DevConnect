const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const { typeDefs } = require('../schemas/typedefs');
const { resolvers } = require('../schemas/resolvers');
const { getUserFromToken } = require('../utils/context');
const { connectDB } = require('../connection/db');

connectDB();

const allowedOrigins = ['http://localhost:3000'];

const app = express();
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy violation'));
        }
    },
    credentials: true,
}));
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
}
startServer();

module.exports = app;
