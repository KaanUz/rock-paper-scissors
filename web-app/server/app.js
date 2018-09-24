var app                 = require('http').createServer(handler);
var io                  = require('socket.io')(app);
var fs                  = require('fs');

app.listen(9000);

var QueryString         = require('querystring');
var Util                = require('util');
var ejs                 = require('ejs');

var htmlContent = fs.readFileSync('rock-paper-scissors/web-app/public/views/index.ejs', 'utf8');

var contentTypeHtml     = {"Content-Type": "text/html"};
var homeLink            = "Go to <a href='/'>Home</a>";

var app = Http.createServer();

const serveCSS = function (request, response) {
    fs.readFile(__dirname + '/../public/css/style.css', function (err, data) {
        if (err) console.log(err);
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
      });
};

const serveImages = function(request, response, imagePath) {
    fs.readFile(__dirname + '/..' + imagePath, function (err, content) {
        if (err) {
            response.writeHead(400, contentTypeHtml)
            console.log(err);
            response.end("No such image");    
        } else {
            //specify the content type in the response will be an image
            response.writeHead(200,{'Content-type':'image/png'});
            response.end(content);
        }
    })
};

function handler(request, response) {
    // console.log(request.url);
    switch (request.method){
        case "GET":
            if (request.url === "/")
                getHome(request, response);
            else if (request.url.indexOf('.css') != -1)
                serveCSS(request, response);
            else if (request.url.indexOf('.png') != -1)
                serveImages(request, response, request.url);
            else if
                
            else
                get404(request, response); 
            break;
        case "POST":
            if (request.url === "/send") {
                var requestBody = '';
                request.on('data', function (data) {
                    requestBody += data;
                    if ( requestBody.length > 5e6) {
                        response.writeHead(
                            413, 
                            "Request Entity Too Large", 
                            contentTypeHtml
                        );
                        response.write(
                            Util.format(
                                body, 
                                '413', 
                                'Request Entity Too Large', 
                                homeLink 
                            )
                        );
                        response.end();
                    }
                });
                console.log(requestBody);
                request.on('end', function (end) {
                    var formData = QueryString.parse(requestBody);
                    getCalcForm(request, response, formData);
                });
            } else {
                get404(request, response);
            }
            break;
        default:
            get405(request, response);
            break;
    }
    
}

function getHome(request, response) {
    response.writeHead(
        200, 
        contentTypeHtml
    );
    response.write(
        ejs.render(
            htmlContent, {
                filename: 'index.ejs', 
                res: null
            }
        )
    );
    response.end();
}

function get404(request, response) {
    response.writeHead(
        404, 
        "Resource Not Found", 
        contentTypeHtml
    );
    response.write(
        Util.format(
            body, 
            '404', 
            'Resource Not Found', 
            homeLink
        )
    );
    response.end();
}

function get405(request, response) {
    response.writeHead(
        405, 
        "Method Not Supported", 
        contentTypeHtml
    );
    response.write(
        Util.format(
            body, 
            '405', 
            'Method Not Supported', 
            homeLink 
        )
    );
    response.end();
}

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });