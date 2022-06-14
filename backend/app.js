const express = require('express');
const app = express();
const userRoutes = require("./routes/userRoute");
const postRoutes = require("./routes/postRoute");
const commentRoutes = require("./routes/commentRoute");

// Sécurité ---------------------------------------------------------------------
const path = require("path");
const cors = require("cors");
require('dotenv').config();
let helmet = require('helmet');
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
// Sécurité ---------------------------------------------------------------------

app.use('/images', express.static(path.join(__dirname, 'images'))); // nom du dossier + images

app.use(express.json());
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);

module.exports = app;