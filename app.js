const http = require('http');
const routes = require('./routes'); // will look for this file in the same folder. Creating a connection to other file.

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000);

// npm init creates package.json into your project.
// adding start property into package.json to start execution with npm start at terminal.

// installing 3rd party dependency to promptly update my changes without restarting the server. npm install nodemon --save-dev
