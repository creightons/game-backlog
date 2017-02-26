const {
	SEARCH_IGDB,
	IGDB_SEARCH_SUCCESS,
	IGDB_SEARCH_FAILURE,
} = require('../action-types');

function searchIGDB(searchTerm) {
	// Implment fetch here
}

function startIGDBSearch {
	return {
		type: SEARCH_IGDB,
	};
}

function IGDBSearchSuccess(searchResults) {
	return {
		type: IGDB_SEARCH_SUCCESS,
		searchResults,
	};
}

function IGDBSearchFailure() {
	return {
		type: IGDB_SEARCH_FAILURE,
	};
}

module.exports = {
	searchIGDB,
	startIGDBSearch,
	IGDBSearchSuccess,
	IGDBSearchFailure,
};