const merge = require('lodash.merge');

const actions = merge(
	{},
	require('./igdb-search'),
	require('./user'),
	require('./games')
);

module.exports = actions;