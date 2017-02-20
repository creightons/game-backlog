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
		res.status(200).send(results);
	}).catch(err => {
		next(err);
	});
}

module.exports = {
	search,
};