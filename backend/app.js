const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");

require('dotenv').config({ 
   path: path.resolve(__dirname, './.env')
});

let helmet = require('helmet');
const { env } = require('process');

app.use(express.json());

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'process.env.HOST');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(cors({
    origin: process.env.HOST
}));

const db = mysql.createConnection({
   host: "localhost",
   user: process.env.ADMIN,
   password: process.env.PASSWORD,
   database: process.env.DATABASE
});

db.connect(function(err) {
    console.log(err);
   if (err) throw err;
   console.log("Connecté à la base de données MySQL!");
});

app.use('/', userRoutes);

module.exports = app;