const mysql = require('mysql2');
const path = require("path");

require('dotenv').config({ 
   path: path.resolve(__dirname, '../.env')
});

const db = mysql.createConnection({
   host: "localhost",
   user: process.env.ADMIN,
   password: process.env.PASSWORD,
   database: process.env.DATABASE,
});

module.exports = {db};