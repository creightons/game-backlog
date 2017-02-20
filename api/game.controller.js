const Game = require('./game.model');

// GET - returns all games for user
function getGames(req, res) {
	const userId = req.user._id;
	Game.find({ owner: userId }).then(games => {
		res.status(200).send(games);
	}).catch(err => {
		next(err);
	});
}

// POST - creates a new Game for a user
function addGame(req, res) {
	const newGame = Game({
		igdbId: req.body.igdbId,
		name: req.body.name,
		slug: req.body.slug,
		cover: {
			url: req.body.cover.url,
			height: req.body.cover.height,
			width: req.body.cover.width,
		},
		_owner: req.user._id,
	});

	newGame.save().then(() => {
		res.status(200).send(games);kk
	}).catch(err => {
		next(err);
	});
}

// DELETE - remove a game from a user's backlog
function removeGame(req, res) {
	Game.findByIdAndRemove(req.params.id).then(game => {
		if (!game) {
			return req.status(500).end();
		}
	}).catch(err => {
		next(err);
	});
} 

module.exports = {
	getGames,
	addGame,
	removeGame,
};