const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.end('Welcome to our home page');
  }
});

server.listen(8100, () => console.log('Server is listening on port 8100...'));