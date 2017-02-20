const igdb = require('igdb-api-node');

// GET - search IGDB
function search(req, res, next) {
	igdb.games({
		search: req.query.value,
		limit: 15,
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