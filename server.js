const express = require('express'),
	app = express(),
	igdb = require('igdb-api-node'),
	bodyParser = require('body-parser'),
	config = require('./config');

process.env.mashapeKey = config.MASHAPE_IGDB_TEST_KEY;


app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	const fullURL = req.method + ' ' + req.url;
	console.log(fullURL);
	console.log('body = ', req.body);
	next();
});

var results = [{name: 'test1'}, {name: 'test2'}, {name: 'test3'},]

app.get('/', (req, res) => res.render('index') );

app.get('/search', (req, res) => {
	searchIGDB(req, res);
});

function searchIGDB(req, res) {
	const searchValue  = req.query.value;

	if (!searchValue) {
		res.render('index');
	}
	else {
		igdb.games({
			search: searchValue,
			limit: 15,
			fields: 'name',
		}).then(results => {
			res.render('index', { results: results.body });
		});
	}
}

app.listen(config.SERVER_PORT, () => {
	console.log('Server listening on port ' + config.SERVER_PORT);
});