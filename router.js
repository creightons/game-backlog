const passport = require('passport'),
	userRoutes = require('./api/user.routes'),
	gameRoutes = require('./api/game.routes'),
	igdbRoutes = require('./api/igdb.routes');

module.exports = function(app) {

	// Render page
	app.get('/', (req, res, next) => {
		res.status(200).render('index-react');
	});

	// Login route; sends a 401 status if authentication failed
	app.post('/login', passport.authenticate('local'), (req, res) => {
		res.send(req.user.id);
	});

	app.post('/logout', (req, res) => {
		req.logout();
		res.status(200).send();
	});

	function isAuthenticated(req, res, next) {
		if (req.isAuthenticated()) { return next() };
		return res.status(401).send();
	}

	app.use('/user', userRoutes);
	app.use('/igdb', igdbRoutes);
	app.use('/game', isAuthenticated, gameRoutes)

	// Print Errors
	app.use((err, req, res, next) => {
		console.log("Server Error", err);
		next();
	});
};