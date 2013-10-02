folis.js
========

Simple Node.js HTTP listener that outputs POST contents to a file.

Production
----------

I'm not sure how to deploy this to Heroku and write to a file on there.  See
my [polis.js](https://github.com/kyletolle/polis.js) for use on Heroku.

Development
-----------

### Requirements

- Node.js (0.10.17) - `brew install node`
- Sleep   (1.1.1)   - `npm install sleep`

### Running

`node folis.js`

A successful startup will show the following output:

```
Listening to port 9000
Returning status code 200

```

### Usage

Once the server is running, you can use cURL to test it out.

`curl -d 'Hello, World' localhost:9000`

This will result in the following content in `requests.json`:

```
{"1":"Hello, World"}
```

### Quitting

Ctrl-C

Configuration
-------------

### Port

If the environment variable $PORT is set, the server will listen on that port.
Other wise, it will listen on port 9000.  To change the port the server will
listen to: `PORT=<your port number>` To change the default port, modify
`LISTENING_PORT` in the code.

If you're like me, you'll likely be running another web app, which will be
listening on $PORT. So when you try to start folis.js, you'll get an error.
You can start it up with a custom port from the command line quite easily,
though.

`PORT=9000 node folis.js`

### Status Code

The server currently returns a `200` HTTP status code by default. To make the
server return another status code, simply change `STATUS_CODE` in the code.

### Timeout

The server currently does not wait before responding. To make the server sleep
before it gives a response, change `SECONDS_TO_SLEEP` in the code.  This can be
useful if testing that the calling code times out after so many seconds.

### Write to file delay

The server will currently wait 5 seconds after it receives the last request
before it writes to a file. To change this delay, simply change
`DISK_WRITE_DELAY`.
