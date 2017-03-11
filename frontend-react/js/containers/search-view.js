const React = require('react'),
	{ connect } = require('react-redux'),
	{
		searchNewTerm,
		searchThroughPagination,
		addGameToBacklog,
	} = require('../actions'),
	SearchView = require('../components/search-component');


function getCurrentResults(state) {
	const { currentSearchTerm, currentPage, searchResults } = state.searchResults;
	let currentResults = [];

	if (
		currentSearchTerm
		&& currentPage
		&& searchResults[currentSearchTerm]
		&& searchResults[currentSearchTerm][currentPage]
		&& Array.isArray(searchResults[currentSearchTerm][currentPage])
	) {
		currentResults = searchResults[currentSearchTerm][currentPage];
	}

	return currentResults;
}

const SEARCH_RESULT_PAGE_MAX_ENTRIES = 15; // Can only see 15 results at a time

function isNextEnabled(state) {
	const { currentPage, currentSearchTerm, searchResults } = state.searchResults;
	let isEnabled = false;

	if (
		currentSearchTerm
		&& currentPage
		&& currentPage >= 1
	) {
		const searchTermResults = searchResults[currentSearchTerm]
		const pageNumbers = Object.keys(searchTermResults)
			.map(key => parseInt(key))
			.sort();

		if (pageNumbers.length > 0) {
			const maxPage = pageNumbers[pageNumbers.length - 1];

			if (
				currentPage <= maxPage
				&& searchTermResults[currentPage].length === SEARCH_RESULT_PAGE_MAX_ENTRIES
			) {
				isEnabled = true;
			}
		}
	}

	return isEnabled;
}

function isPreviousEnabled(state) {
	const { currentPage } = state.searchResults;
	let isEnabled = false;

	if (currentPage && currentPage > 1) { isEnabled = true; }

	return isEnabled;
}

function mapStateToProps(state, props) {
	return {
		currentSearchTerm: state.searchResults.currentSearchTerm,
		currentPage: state.searchResults.currentPage,
		currentResults: getCurrentResults(state),
		isNextEnabled: isNextEnabled(state),
		isPreviousEnabled: isPreviousEnabled(state),
		isUserLoggedIn: state.user.loggedIn,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getPagedResults: (searchTerm, currentPage) => {
			return dispatch( searchThroughPagination(searchTerm, currentPage) );
		},
		searchForTerm: (searchTerm) => {
			return dispatch( searchNewTerm(searchTerm) );
		},
		addGame: (gameSearchResult) => {
			return dispatch( addGameToBacklog(gameSearchResult) );
		},
	};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const {
			currentSearchTerm,
			currentPage,
			currentResults,
			isNextEnabled,
			isPreviousEnabled,
			isUserLoggedIn,
		} = stateProps,	
		{
			getPagedResults,
			searchForTerm,
			addGame,
		} = dispatchProps;

	let nextButtonHandler;

	if (isNextEnabled) {
		nextButtonHandler = () => {
			getPagedResults( currentSearchTerm, currentPage + 1 );
		};
	}
	else {
		nextButtonHandler = () => {};
	}

	let previousButtonHandler;

	if (isPreviousEnabled) {
		previousButtonHandler = () => {
			getPagedResults(
				currentSearchTerm,
				currentPage - 1
			);
		};
	}
	else {
		previousButtonHandler = () => {};
	}

	return {
		isNextEnabled,
		isPreviousEnabled,
		isUserLoggedIn,
		nextButtonHandler,
		previousButtonHandler,
		currentSearchTerm,
		currentResults,
		searchForTerm,
		addGame,
	};
}

const container = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SearchView);

module.exports = container;