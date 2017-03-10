const { combineReducers } = require('redux');

const reducer = combineReducers({
	searchResults: require('./search-results'),
	user: require('./user'),
	games: require('./games'),
});	

module.exports = reducer;