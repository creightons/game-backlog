const {
		SEARCH_IGDB,
		IGDB_SEARCH_SUCCESS,
		IGDB_SEARCH_FAILURE,
		UPDATE_CURRENT_SEARCH_SETTINGS
	} = require('../action-types'),
	merge = require('lodash.merge');

const initialState = {
	currentSearchTerm: undefined,
	searchResults: {},
	currentPage: undefined,
	loading: false,
	error: false,
};


function reducer(state=initialState, action) {
	switch(action.type) {
		case SEARCH_IGDB:
			return merge({}, state, {
				loading: true,
			});

		case IGDB_SEARCH_SUCCESS:
			const { searchTerm, currentPage, searchResults } = action;
			let newSearchResults = {};
			newSearchResults[searchTerm][currentPage] = searchResults;
			
			return merge({}, state, {
				searchResults: newSearchResults,
				loading: false,
				currentPage: currentPage,
				currentSearchTerm: searchTerm,
			});

		case IGDB_SEARCH_FAILURE:
			return merge({}, state, {
				loading: false,
				error: true,
			});

		case UPDATE_CURRENT_SEARCH_SETTINGS:
			return merge({}, state, {
				currentPage: action.pageNumber,
				currentSearchTerm: action.searchTerm,
			});

		default:
			return state;
	}
}

module.exports = reducer;