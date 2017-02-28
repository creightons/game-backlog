const merge = require('lodash.merge');

const actions = merge(
	{},
	require('./igdb-search')
);

module.exports = actions;