const passport = require('passport'),
	igdb = require('igdb-api-node'),
	userRouter = require('./user.routes');

module.exports = function(app) {

	// Login route; sends a 401 status if authentication failed
	app.post('/login', passport.authenticate('local'), (req, res) => {
		res.send(req.user.id);
	});

	function isAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { return next() };
		return res.status(500).send();
	}

	app.get('/', (req, res) => res.render('index') );

	app.get('/search', (req, res) => {
		searchIGDB(req, res);
	});

	app.use(userRouter);

	var results = [{name: 'test1'}, {name: 'test2'}, {name: 'test3'},]

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
}