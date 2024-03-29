var http = require('http')
  , path = require('path') //libreria per manipolare i path
  , url = require('url') // libreria per manipolare l'url
  , fs = require('fs')
  , mime = require('mime')
  , publicdir = './public'
  ;

http.createServer(function (req, res) {
  var parsed = url.parse(req.url)
    , file = path.basename(parsed.pathname) //prendo l'ultima parte del pathname dell'url
    , filename = (file === '') ? 'index.html' : file //assegna index se file è vuoto
    , filepath = path.join(publicdir, filename) //concateno ./public con il file
    ;

  //se il file specificato esiste rispondo con un messaggio
  //altrimenti ritorno un 404 NOT FOUND
  if (path.existsSync(filepath)) {
    fs.readFile(filepath, function(err, data) {
      if (err) {
        res.writeHead(200, {'Content-type':'text/plain'});
        res.end(err.message);
      } else {
        res.writeHead(200, {'Content-type': mime.lookup(filepath)});
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, {'Content-type':'text/plain'});
    res.end('NOT FOUND');
  }

}).listen(7000);
