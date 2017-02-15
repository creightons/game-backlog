const Backlog = require('./backlog.model');

// GET Backlog
function index(req, res) {
	res.send('yes');
}

module.exports = {
	index,
};