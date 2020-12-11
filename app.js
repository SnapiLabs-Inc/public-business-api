var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Config = require('./common/config');
var indexRouter = require('./routes/index');
var businessRouter = require('./routes/business');
var countryRouter = require('./routes/country');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
var database = require("./common/db");

var app = express();

 
var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));


const apiKeyAuth = (req, res, next) => {

  console.log('Checking API KEY')

  let apiKey = req.body.api_key;

  if (!apiKey || apiKey != Config.ApiKey) {

    res.status(401).json({
      message:"Invalid API KEY",
    });
    res.end();

  }else{

    next()
  }
}

app.use('/', indexRouter);

// -- setup up swagger-jsdoc --
const swaggerDefinition = {
  info: {
      title: 'Public Business API',
      description: "Public Business API is a service for getting public records of businesses across the world",
      version: '0.5.0',
      "contact": {
        "email": "hello@snapilabs.com",
        "name": "SnapiLabs-Inc"
      },
      "license": {
        "name": "MIT",
        "url": "https://github.com/SnapiLabs-Inc/public-business-api/blob/master/LICENSE"
      },
      "x-logo": {
        "url": "images/logo.png",
        "backgroundColor": "#FFFFFF",
        "altText": "Public Business API"
      }
  },
  "x-tagGroups": [
    {
      "name": "API",
      "tags": ['Public','Country']
    }
  ],
  "tags": [
    {
      "name": "Public",
      "description": "Find and Search the public directory"
    },
    {
      "name": "Country",
      "description": "Get the Countries and State list"
    }
  ],
  "servers":[
    {
      "url": "https://localhost:3000",
      "description": "Development Server"
    }
  ],
  host: '/',
  basePath: '/',
  hideHostname: true
};
const options = {
  swaggerDefinition,
  apis : [
    './routes/business.js',
    './routes/country.js'
  ]
};
const swaggerSpec = swaggerJSDoc(options);

// -- routes for docs and generated swagger spec --
app.get('/swagger.json', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.use(apiKeyAuth);
app.use('/business', businessRouter);
app.use('/country', countryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
