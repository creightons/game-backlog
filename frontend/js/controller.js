const Promise = require('bluebird'),
	PubSub = require('pubsub-js'),
	Store = require('./store'),
	{
		UPDATE_CURRENT_SEARCH_RESULTS,
		DISPLAY_VIEW,
	} = require('./channel-topics');


const SEARCH_RESULT_PAGE_MAX_ENTRIES = 15; // Can have up to 15 entries on a page

const Controller = {
	searchByTerm: function(newSearchTerm) {
		Store.searchState.currentPage = 1;
		Store.searchState.currentSearchTerm = newSearchTerm;
		Store.searchState.searchResults = {};

		return Controller.searchIGDB(
			Store.searchState.currentSearchTerm,
			Store.searchState.currentPage
		);
	},

	// Search IGDB and control pagination
	searchIGDB: function(searchTerm, pageNumber) {
		const URL = `/igdb/${searchTerm}/${pageNumber}`;

		return fetch(URL, {
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(
			res => res.json()
		).then(resultsData => {
			Store.searchState.searchResults[pageNumber] = resultsData.body;
			PubSub.publish(UPDATE_CURRENT_SEARCH_RESULTS);
			return resultsData.body;
		}).catch(err => {
			console.log(err);
		});
	},

	nextPage: function() {
		if (
			! Controller.isNextEnabled()
		)  { return; }

		// Augment the current page number
		Store.searchState.currentPage++;
		
		// Check if data has been cached for the current pagination level
		// of the current search term 
		const cachedData = Store.searchState.searchResults[
			Store.searchState.currentPage
		];

		if (Array.isArray(cachedData)) {
			Controller.publishUpdate();
			return Promise.resolve(cachedData);
		}

		return Controller.searchIGDB(
			Store.searchState.currentSearchTerm,
			Store.searchState.currentPage
		);
	},


	previousPage: function() {
		if (
			! Controller.isPreviousEnabled()
		) { return; }

		// Augment the current page number
		if (Store.searchState.currentPage > 1) {
			Store.searchState.currentPage--;
		}

		// Check if data has been cached for the current pagination level
		// of the current search term 
		const cachedData = Store.searchState.searchResults[
			Store.searchState.currentPage
		];

		if (Array.isArray(cachedData)) {
			Controller.publishUpdate();
			return Promise.resolve(cachedData);
		}

		return Controller.searchIGDB(
			Store.searchState.currentSearchTerm,
			Store.searchState.currentPage
		);
	},

	getCurrentSearchResults: function() {
		let results = [];
		const { currentSearchTerm, currentPage, searchResults } = Store.searchState;
		
		if (currentSearchTerm && currentPage) {
			results = searchResults[currentPage];
		}

		return results;
	},

	publishUpdate: function() {
		PubSub.publish(UPDATE_CURRENT_SEARCH_RESULTS);
	},

	// The next button is disabled if the current page hasn't been set,
	// there are no search results, or the user is currently on the highest
	// index page where search results are available, and the number of results
	// is less that the max possible returned results.
	isNextEnabled: function() {
		const { currentPage, searchResults } = Store.searchState;
		if (currentPage === undefined) { return false; }

		const pageNumbers = Object
			.keys(searchResults)
			.map(key => parseInt(key))
			.sort();

		if (pageNumbers.length === 0) { return false; }

		const maxPage = pageNumbers[pageNumbers.length - 1];
		
		if (
			currentPage === maxPage
			&& searchResults[currentPage].length < SEARCH_RESULT_PAGE_MAX_ENTRIES
		) {
			return false;
		}

		return true;
	},

	// The previous button is enabled if the current page number
	// is greater than 1.
	isPreviousEnabled: function() {
		const { currentPage } = Store.searchState;
		if (currentPage && currentPage > 1) { return true; }
		return false;
	},

	publishRoute: function(viewName) {
		PubSub.publish(DISPLAY_VIEW, viewName);
	},
};

module.exports = Controller;