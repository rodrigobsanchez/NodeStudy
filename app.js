const http = require('http');
const routes = require('./routes'); // will look for this file in the same folder. Creating a connection to other file.

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000);