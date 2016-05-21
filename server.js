var http = require('http');
const PORT=3000; 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('<h1>Hello World<h1>');
}).listen(PORT, function(){
	console.log('app listening on 3000');
});
