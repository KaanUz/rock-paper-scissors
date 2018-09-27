var server              = require('http').createServer(handler);
var io                  = require('socket.io').listen(server);

var game                = require("./lib/game")
var resps               = require("./lib/responses")
var static              = require("./lib/static")

function handler(request, response) {
    switch (request.method){
        case "GET":
            if (request.url === "/")
                resps.getHome(request, response);
            else if (request.url.indexOf('.css') != -1)
                static.serveCSS(request, response);
            else if (request.url.indexOf('.js') != -1)
                static.serveJS(request, response);
            else if (request.url.indexOf('.png') != -1)
                static.serveImages(request, response, request.url);
            else
                resps.get404(request, response); 
            break;
        default:
            resps.get405(request, response);
            break;
    }
    
}

server.listen(9000, function(){
    console.log('Server started on port 9000...')
});

io.on('connection', function (socket) {
    console.log("Connnection established!", socket.id)

    socket.on('user choice', function (usrChoice) {

        const aiChoice = game.getAiChoice()
        const gameResult = game.exec(usrChoice, aiChoice);

        if (gameResult === null)
            resultMsg = `It's a tie!`;
        else if (gameResult)
            resultMsg = `${usrChoice}  beats  ${aiChoice}. You Win!`;
        else
            resultMsg = `${aiChoice}  beats  ${usrChoice}. You Lost!`;
        
        socket.emit('game result', {
            usrChoice: usrChoice,
            aiChoice: aiChoice,
            res: gameResult,
            msg: resultMsg
        });
    });
});