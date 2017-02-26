const {
	SEARCH_IGDB,
	IGDB_SEARCH_SUCCESS,
	IGDB_SEARCH_FAILURE,
} = require('../action-types');

const initialState = {
	currentSearchTerm: undefined,
	searchResults: [],
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
			return merge({}, state, {
				searchResults: action.searchResults,
				loading: false,
			});

		case IGDB_SEARCH_FAILURE:
			return merge({}, state, {
				loading: false,
				error: true,
			});

		default:
			return state;
	}
}

module.exports = reducer;