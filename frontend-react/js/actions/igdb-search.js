const {
		SEARCH_IGDB,
		IGDB_SEARCH_SUCCESS,
		IGDB_SEARCH_FAILURE,
		UPDATE_CURRENT_SEARCH_SETTINGS,
	} = require('../action-types'),
	{ fetchUrl } = require('./authorized-fetch'),
	{ handleError } = require('../utils');


const INITIAL_PAGE_NUMBER = 1;

function searchIGDB(searchTerm, pageNumber) {
	return (dispatch) => {
		const url = `/igdb/${searchTerm}/${pageNumber}`;
		fetchUrl(url, {
			credentials: 'same-origin',
		}).then(
			res => res.json()
		).then(results => {
			return dispatch(searchIGDBSuccess(results.body, pageNumber, searchTerm));
		}).catch(err => {
			dispatch(searchIGDBFailure(err));
			handleError(err);
		});
	};
}

function startIGDBSearch() {
	return {
		type: SEARCH_IGDB,
	};
}

function searchIGDBSuccess(searchResults, currentPage, searchTerm) {
	return {
		type: IGDB_SEARCH_SUCCESS,
		searchTerm,
		searchResults,
		currentPage,
	};
}

function searchIGDBFailure() {
	return {
		type: IGDB_SEARCH_FAILURE,
	};
}

function updateCurrentSearchSettings(searchTerm, pageNumber) {
	return {
		type: UPDATE_CURRENT_SEARCH_SETTINGS,
		searchTerm,
		pageNumber,
	};
}

function searchThroughPagination(searchTerm, currentPage) {
	return (dispatch, getState) => {
		const { searchResults, currentSearchTerm } = getState().searchResults;
		const pageNumbers = Object.keys(
			searchResults[currentSearchTerm]
		)
		.map(val => parseInt(val))
		.sort();

		const maxPage = pageNumbers[pageNumbers.length];

		if (currentPage <= maxPage) {
			return dispatch(
				updateCurrentSearchSettings(searchTerm, currentPage)
			);
		}
		else {
			return dispatch(
				searchIGDB(searchTerm, currentPage)
			);
		}
	};
}

function searchNewTerm(searchTerm) {
	return (dispatch, getState) => {
		const { searchResults } = getState().searchResults;

		if (searchResults[searchTerm]) {
			return dispatch(
				updateCurrentSearchSettings(searchTerm, INITIAL_PAGE_NUMBER)
			);
		}
		else {
			return dispatch(
				searchIGDB(searchTerm, INITIAL_PAGE_NUMBER)
			);
		}
	};
}

module.exports = {
	searchNewTerm,
	searchThroughPagination,
};