//var PORT= process.env.PORT || 3000;
var PORT= 3000;
var mongooseLogic = require('./models');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// DATABASE CODE
var userDict = [];


// mongoose.model("users").find(.......)
app.get('/', function(req, res){
  res.sendfile('index.html');
});


function handleMessage(data){
	console.log("user has sent: " + data);
}

io.on('connection', function(socket){
  console.log('a user connected');
 // io.emit("tweet", {text: "hello from the server.js"});
  		socket.on('MessageToServer', function(data) {
    			console.log("user has sent: " + data);
 					 });
});

http.listen(PORT, function(){
  console.log('listening on *:3000');
});



