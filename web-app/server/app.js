var Http                = require('http');
var QueryString         = require('querystring');
var StringBuilder       = require('stringbuilder');
var Util                = require('util');
var ejs                 = require('ejs');
var fs                  = require('fs');

var     port                = 9000;
const   dirname             = 'rps/public/views'
var     body                = "<html><head><title>%s</title></head><body>%s %s</body></html>"

var htmlContent = fs.readFileSync(dirname + '/index.ejs', 'utf8');
var css = {style : fs.readFileSync('rps/public/css/style.css','utf8')};


var contentTypeHtml     = {"Content-Type": "text/html"};
var homeLink            = "Go to <a href='/'>Home</a>";

function getHome(request, response) {
    response.writeHead(
        200, 
        contentTypeHtml
    );
    response.write(
        ejs.render(
            htmlContent, {
                filename: 'index.ejs', 
                res: null,
                css : css
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

function getCalcHtml(request, response, data) {
    var stringBuilder   = new StringBuilder({newline: "\r\n"});

    stringBuilder.appendLine("<html>");
    stringBuilder.appendLine("<body>");
    stringBuilder.appendLine("  <form method='post'>");
    stringBuilder.appendLine("      <table>");
    stringBuilder.appendLine("          <tr>");
    stringBuilder.appendLine("              <td>Enter First No : </td>");

    data && data.txtFirstNo ? 
        stringBuilder.appendLine("              <td><input type='text' id='txtFirstNo' name='txtFirstNo' value='{0}'/></td>", data.txtFirstNo):
        stringBuilder.appendLine("              <td><input type='text' id='txtFirstNo' name='txtFirstNo' value=''/></td>");
    
    stringBuilder.appendLine("          </tr>");
    stringBuilder.appendLine("          <tr>");
    stringBuilder.appendLine("              <td>Enter Second No : </td>");
    
    data && data.txtSecondNo ? 
        stringBuilder.appendLine("              <td><input type='text' id='txtSecondNo' name='txtSecondNo' value='{0}'/></td>", data.txtSecondNo):
        stringBuilder.appendLine("              <td><input type='text' id='txtSecondNo' name='txtSecondNo' value=''/></td>");

    stringBuilder.appendLine("          </tr>");
    stringBuilder.appendLine("          <tr>");
    stringBuilder.appendLine("              <td><input type='submit' value='Calculate'/></td>");
    stringBuilder.appendLine("          </tr>");

    if (data && data.txtFirstNo && data.txtSecondNo) {
        var sum = parseInt(data.txtFirstNo) + parseInt(data.txtSecondNo);
        stringBuilder.appendLine("          <tr>");
        stringBuilder.appendLine("              <td><span>Sum = {0}</span></td>", sum);
        stringBuilder.appendLine("          </tr>");
    }

    stringBuilder.appendLine("      </table>");
    stringBuilder.appendLine("  </form>");
    stringBuilder.appendLine("</body>");
    stringBuilder.appendLine("</html>");

    stringBuilder.build(function (error, result) {
        response.write(result);
        response.end();
    });
}

function getCalcForm(request, response, formData) {
    response.writeHead(
        200, 
        contentTypeHtml
    );
    getCalcHtml(request, response, formData)
} 

var httpServer = Http.createServer(function(request, response) {
    // console.log(request.url);
    switch (request.method){
        case "GET":
            if (request.url === "/")
                getHome(request, response);
            else if (request.url === "/calc")
                getCalcForm(request, response);
            else
                get404(request, response); 
            break;
        case "POST":
            if (request.url === "/calc") {
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
    
}).listen(port)