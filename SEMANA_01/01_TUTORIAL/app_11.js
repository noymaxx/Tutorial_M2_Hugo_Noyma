const http = require('http'); //importa o http do node
const hostname = '127.0.0.1'; //define onde o servidor será executado
const port = 3011; //Em qual porta do seu pc irá rodar o servidor
const server = http.createServer((req, res) => { 
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<!DOCTYPE html> <head> <title>Etapa 0 - INSTALACAO</title></head> \
              <body>\
                <div id="main"> \
                       <h1> Etapa 1 - INSTALACAO - Servidor Node.js </h1> \
                       <H2> Meu servidor NODE.js funciona!</H2> </div> \
              </body> \
           </html>');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});