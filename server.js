
const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport'),
	config = require('./config');

// Add API Key for 
process.env.mashapeKey = config.MASHAPE_IGDB_TEST_KEY;

// Setup View Engine
app.set('view engine', 'pug');
app.set('views', 'views');

// Setup Session
app.use(session({
	secret: config.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
}));

// Setup Parsers
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Static Directory
app.use(express.static('public'));

// Setup PassportJS
require('./passport.config')(passport),
app.use(passport.initialize());
app.use(passport.session());

// Display all HTTP requests
app.use((req, res, next) => {
	const fullURL = req.method + ' ' + req.url;
	console.log(fullURL);
	next();
});

// Apply all routes
require('./router.js')(app);

app.listen(config.SERVER_PORT, () => {
	console.log('Server listening on port ' + config.SERVER_PORT);
});