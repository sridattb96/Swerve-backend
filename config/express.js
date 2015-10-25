// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');

// Define the Express configuration method
module.exports = function() {
	var app = express(); 
	// Create a new Express application instance

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	app.use(morgan('dev'));

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	// Set the application view engine and 'views' folder
	app.set('views', './app/views');
	app.engine('html', require('ejs').renderFile);
	app.engine('ejs', require('ejs').renderFile);

	// Load the routing files
	require('../app/routes/routes.js')(app);

	// Configure static file serving
	app.use(express.static('./public'));

	// Return the Express application instance
	return app;
};