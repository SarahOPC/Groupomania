const http = require('http');
const app = require("./app");
require("dotenv").config();

const server = http.createServer(app);
server.listen(process.env.PORT || 3000);
console.log("Listening on port " + process.env.PORT);