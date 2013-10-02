var fs = require('fs');
var app = require('http').createServer(handler);
var LISTENING_PORT = process.env.PORT || 9000;
var STATUS_CODE = 200;
var sleep = require('sleep');
var SECONDS_TO_SLEEP = 0;
var requests = {}
var count = 0;
var requestsToFileTimer;
var DISK_WRITE_DELAY = 5000;

app.listen(LISTENING_PORT);

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

  res.writeHead(STATUS_CODE, {'Content-Type': 'text/plain'});
  sleep.sleep(SECONDS_TO_SLEEP);
  res.end();
}

console.log("Listening to port " + LISTENING_PORT);
console.log("Returning status code " + STATUS_CODE);
console.log();

function sendRequestsToFile() {
  console.log("Writing requests to file");
  fs.writeFileSync('requests.json', JSON.stringify(requests), null, 2);

}
