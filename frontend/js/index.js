// Extends methods from the prototype of a source view to another view
function extendPrototype(destView, sourceView ) {
	for (let method in sourceView.prototype) {
		destView.prototype[method] = sourceView.prototype[method];
	}
}

// Apply fetch API to the global space
require('es6-promise').polyfill();
require('isomorphic-fetch');
const Promise = require('bluebird');

const BaseView = function() {};

BaseView.prototype = {
	addListener: function(element, event, handler) {
		if (!this._listeners) {
			this._listeners = [];
		}

		element.addEventListener(event, handler);
		
		this._listeners.push({
			element,
			event,
			handler,
		});
	},

	removeAllListeners: function() {
		if (
			this._listeners
			&& Array.isArray(this._listeners)
			&& this._listeners.length > 0
		) {
			for (let i = 0; i < this._listeners.length; i++) {
				const { element, event, handler } = this._listeners[i];
				element.removeEventListener(event, handler);
			}
		}
	},
};

const SearchView = function() {
	this.init();
};

SearchView.prototype = {
	init: function() {		
		this.searchInput = document.querySelector('.search-input');
		this.searchButton = document.querySelector('.search-button');
		this.searchResults = document.querySelector('.search-results');
		
		const renderSearchResults = this.renderSearchResults.bind(this);
		
		this.addListener(this.searchButton, 'click', renderSearchResults);
	},

	renderSearchResults: function() {
		const self = this;
		Controller.searchByTerm(self.searchInput.value).then(gameDataResults => {
			gameDataResults.forEach(gameData => {
				const ResultView = new SearchResultView(gameData);

				this.searchResults.append(ResultView.render());
			});
		});
	},
};

extendPrototype(SearchView, BaseView);

const SearchResultView = function(gameData) {
	this.gameData = gameData;
};

SearchResultView.prototype = {
	render: function() {
		let imageUrl = '';
		
		if (
			this.gameData.cover
			&& this.gameData.cover.url
		) {
			imageUrl = this.gameData.cover.url;
		}

		const htmlString = `
			<img width='90' height='90' src='${imageUrl}'>
			<span>${this.gameData.name}</span>
		`;

		const element = document.createElement('div');
		element.className = 'search-result';
		element.innerHTML = htmlString;

		return element;
	},
};

let Controller = {
	init: function() {
		new SearchView();
	},

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
			return resultsData.body;
		}).catch(err => {
			console.log(err);
		});
	},

	nextPage: function() {
		if (!(
			Store.searchState.currentSearchTerm
			&& Store.searchState.currentPage
		)) { return; }

		// Augment the current page number
		Store.searchState.currentPage++;
		
		// Check if data has been cached for the current pagination level
		// of the current search term 
		const cachedData = Store.searchData.searchResults[
			Store.searchData.currentPage
		];

		if (Array.isArray(cacheData)) {
			return Promise.resolve(cachedData);
		}

		return Controller.searchIGDB(
			Store.searchState.currentSearchTerm,
			Store.searchState.currentPage
		);
	},


	previousPage: function() {
		if (!(
			Store.searchState.currentSearchTerm
			&& Store.searchState.currentPage
		)) { return; }

		// Augment the current page number
		if (Store.searchState.currentPage > 1) {
			Store.searchState.currentPage--;
		}

		// Check if data has been cached for the current pagination level
		// of the current search term 
		const cachedData = Store.searchData.searchResults[
			Store.searchData.currentPage
		];

		if (Array.isArray(cacheData)) {
			return Promise.resolve(cachedData);
		}

		return Controller.searchIGDB(
			Store.searchState.currentSearchTerm,
			Store.searchState.currentPage
		);
	},
};


// State Store for the application
let Store = {
	searchState: {
		currentSearchTerm: undefined,
		currentPage: undefined,
		searchResults: {},
	},

};

// Setup page
Controller.init();