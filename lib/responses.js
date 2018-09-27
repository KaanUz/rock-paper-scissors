var fs                  = require('fs');
var util                = require('util');

var body                = "<html><head><title>%s</title></head><body>%s %s</body></html>";
var contentTypeHtml     = {"Content-Type": "text/html"};
var homeLink            = "Go to <a href='/'>Home</a>";
var htmlContent         = fs.readFileSync('rock-paper-scissors/views/index.html', 'utf8');

module.exports = {
    getHome : function(request, response) {
        response.writeHead(200, contentTypeHtml);
        response.write(htmlContent);
        response.end();
    },
    get404 : function(request, response) {
        response.writeHead(404, "Resource Not Found", contentTypeHtml);
        response.write(util.format(body, '404', 'Resource Not Found', homeLink));
        response.end();
    },
    get405 : function(request, response) {
        response.writeHead(405, "Method Not Supported", contentTypeHtml);
        response.write(util.format(body, '405', 'Method Not Supported', homeLink));
        response.end();
    }
};