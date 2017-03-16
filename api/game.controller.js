const Game = require('./game.model');

// GET - returns all games for user
function getGames(req, res, next) {
	const userId = req.user._id;

	Game.find({ _owner: userId }).then(games => {
		res.status(200).send(games);
	}).catch(err => {
		next(err);
	});
}

// POST - creates a new Game for a user
function addGame(req, res, next) {

	// TODO: Add check to prevent adding game twice

	const newGame = Game({
		igdbId: req.body.igdbId,
		name: req.body.name,
		slug: req.body.slug,
		_owner: req.user._id,
	});

	if (req.body.cover) {
		newGame.cover = {
			url: req.body.cover.url,
			height: req.body.cover.height,
			width: req.body.cover.width,
		};
	};
	Game.findOne({
		igdbId: newGame.igdbId,
		_owner: newGame._owner,
	}).then(result => {
		if (result) {
			return res.status(409).send({ message: 'Game already exists' });
		}
		else {
			return newGame.save().then(() => {
				res.status(200).send(newGame);
			});
		}
	}).catch(err => {
		next(err);
	});
}

// DELETE - remove a game from a user's backlog
function removeGame(req, res, next) {
	Game.findByIdAndRemove(req.params.id).then(game => {
		if (!game) {
			return req.status(500).end();
		}
	}).then(() => {
		res.status(200).send();
	}).catch(err => {
		next(err);
	});
} 

module.exports = {
	getGames,
	addGame,
	removeGame,
};