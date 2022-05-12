const express = require('express');
const app = express();

const path = require("path");
const cors = require("cors");

require("dotenv").config();

let helmet = require('helmet');
app.use(helmet());

/* const commentsRoutes = ;
const postsRoutes = ;
const likesRoutes = ;
const authRoutes = ; */

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use(cors({
    origin: process.env.HOST
}));


module.exports = app;