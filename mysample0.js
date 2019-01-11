http = require('http');
fs = require('fs');

port = 3000;
host = '127.0.0.1';

server = http.createServer(function(req, res) {

  if (req.method == 'POST') {
    console.log("Handling POST request...");
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    var body = '';
    req.on('data', function(data) {
      body += data; // body dtype is string
    });
    req.on('end', function() {
      // jsonData = JSON.parse(body); // Returns an object
      // playerID = '76561198025030507';
      // dataOfInterest = JSON.stringify(jsonData.allplayers[playerID]);
      // console.log("POST payload: " + dataOfInterest);

      console.log("POST payload: " + body);

      // Append data stream to file
      var writerStream = fs.appendFile('game_data.txt', body + '|', (err) => {
        if (err) throw err;
        console.log("Write Completed");
      });


      res.end('');
    });
  } else {
    console.log("Not expecting other request types...");
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
    res.end(html);
  }

});

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);