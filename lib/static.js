var fs                  = require('fs');

module.exports = {
    serveCSS : function(request, response) {
        fs.readFile(__dirname + '/../public/css/style.css', function (err, data) {
            if (err)
                console.log(err);
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();
        });
    },
    serveJS : function(request, response) {
        fs.readFile(__dirname + '/../public/js/socket.js', function (err, data) {
            if (err)
                console.log(err);
            response.writeHead(200, { 'Content-Type': 'text/javascript' });
            response.write(data);
            response.end();
        });
    },
    serveImages : function(request, response, imagePath) {
        fs.readFile(__dirname + '/../' + imagePath, function (err, content) {
            if (err) {
                response.writeHead(400, contentTypeHtml);
                console.log(err);
                response.end("No such image");
            }
            else {
                //specify the content type in the response will be an image
                response.writeHead(200, { 'Content-type': 'image/png' });
                response.end(content);
            }
        });
    }
}