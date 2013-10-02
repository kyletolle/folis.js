var fs = require('fs');
var app = require('http').createServer(handler);
var listeningPort = process.env.PORT || 9000;
var statusCode = 200;
var sleep = require('sleep');
var secondsToSleep = 0;
var requests = {}
var count = 0;
var requestsToFileTimer;
var DISK_WRITE_DELAY = 10000;

app.listen(listeningPort);

function handler (req, res) {
  var data = '';

  if (req.method == "POST") {
    clearTimeout(requestsToFileTimer);

    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', function() {
      requests[count+1] = data.toString();
      requestsToFileTimer = setTimeout(sendRequestsToFile, DISK_WRITE_DELAY);
      count++;
    });
  }

  res.writeHead(statusCode, {'Content-Type': 'text/plain'});
  sleep.sleep(secondsToSleep);
  res.end();
}

console.log("Listening to port " + listeningPort);
console.log("Returning status code " + statusCode);
console.log();

function sendRequestsToFile() {
  console.log("Writing requests to file");
  fs.writeFileSync('requests.json', JSON.stringify(requests), null, 2);

}
