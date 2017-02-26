const merge = require('lodash.merge');

const actions = merge(
	{},
	require('./search-results'),
);

module.exports = actions;