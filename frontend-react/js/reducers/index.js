const { combineReducers } = require('redux');

const reducer = combineReducers({
	searchResults: require('./search-results'),
});	

module.exports = reducer;