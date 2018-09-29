var fs                  = require('fs');
var url                 = require('url');
var path                = require('path');

const mime = {
    '.html' : 'text/html',
    '.js'   : 'text/javascript',
    '.css'  : 'text/css',
    '.png'  : 'image/png',
};

function serveHTML(res, rootDir) {
    fs.readFile(rootDir + '/views/index.html', function (err, data) {
        if (err)
            console.log(err);
        res.writeHead(200, { 'Content-Type': mime['.html'] });
        res.end(data);
    });
}

function serveFile(req, res, filepath) {
    const parsedUrl = url.parse(req.url);
    let pathname = `.${parsedUrl.pathname}`;
    const ext = path.parse(pathname).ext;

    fs.exists( filepath, function (exist) {
        if(!exist) {
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }
        fs.readFile(filepath, function(err, data){
            if(err){
              res.statusCode = 500;
              res.end(`Error getting the file: ${err}.`);
            } else {
                res.writeHead(200, mime[ext]);
                res.end(data);
            }
          });
    });
}

module.exports = {
    serveFiles : function(req, res, rootDir) {
        if(req.url === '/') {
            serveHTML(res, rootDir)
        } else {
            serveFile(req, res, rootDir + req.url)
        }
    },
}