const igdb = require('igdb-api-node');

// GET - search IGDB
function search(req, res, next) {

	const limitSize = 15,
		// Offset starts at page 2
		offsetNumber = limitSize * (req.params['pageNumber'] - 1);
	igdb.games({
		search: req.params['searchTerm'],
		limit: limitSize,
		offset: offsetNumber,
		fields: 'name,slug,cover',
	}).then(results => {
		// Results = { url, body, head } - body has games, head has http headers

		const games = results.body;

		// convert all ids to igdbIds for the game models
		games.forEach(game => {
			game.igdbId = game.id;
			delete game.id;
		});

		res.status(200).send(games);
	}).catch(err => {
		next(err);
	});
}

module.exports = {
	search,
};