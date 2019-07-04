'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var connect = require('connect');
var app = connect();
var oas3Tools = require('oas3-tools');
var jsyaml = require('js-yaml');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var serverPort = 10101;

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'public/backend/spec.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);


app.use(cookieParser());
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    //expires: 600000
  }
}));
app.use(bodyParser.json());
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, 'api')));

const maxSimulatedLatency = process.env.MAX_SIMULATED_LATENCY;
if(parseInt(maxSimulatedLatency) > 0) {
  app.use(function (req, res, next) {
    const actualLatency = Math.floor(Math.random() * Math.floor(maxSimulatedLatency));
    setTimeout(next, actualLatency);
  });
}
// Initialize the Swagger middleware
oas3Tools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  //app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});
