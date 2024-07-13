const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
      }
      if (url === '/message' && method === 'POST') {
          const body = [];
    
          // adding data from request into chunk and pushing into body array.
          req.on('data', (chunk) => {
              console.log(chunk);
              body.push(chunk);
          });  
          
          // parsing the buffer and applying into the file.
          return req.on('end', () => {
              // this a callback -> to be called in the future...
              const parsedBody = Buffer.concat(body).toString();
              const message = parsedBody.split('=')[1];
              fs.writeFile('message.txt', message, (err) => {
                  res.statusCode = 302;
                  res.setHeader('Location', '/');
                  return res.end();
              }); 
          }); 
      }
    
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>My First Page</title><head>');
      res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
      res.write('</html>');
      res.end();
};

// exporting js files... communications with other node files.
// module.exports = requestHandler;

// could also be
// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text.';

module.exports = {
    handler: requestHandler,
    someText: 'Hard coded...text'
}

