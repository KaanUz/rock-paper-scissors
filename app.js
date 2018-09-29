var server              = require('http').createServer(handler);
var io                  = require('socket.io').listen(server);
var path                = require('path');

var game                = require("./lib/game")
var error               = require("./lib/error")
var static              = require("./lib/static")

const rootDir           = path.dirname(require.main.filename);

function handler(request, response) {
    switch (request.method){
        case "GET":
            static.serveFiles(request, response, rootDir);
            break;
        default:
            error.get405(request, response);
            break;
    }
    
}

server.listen(9000, function(){
    console.log('Server started on port 9000...')
});

io.on('connection', function (socket) {
    console.log("Connnection established!", socket.id)
    socket.emit('message', 'Choose your weapon!');

    socket.on('user choice', function (usrChoice) {
        socket.emit('game result', game.exec(usrChoice));
    });
});