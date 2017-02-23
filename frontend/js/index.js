// Extends methods from the prototype of a source view to another view
function extendPrototype(destView, sourceView ) {
	for (let method in sourceView.prototype) {
		destView.prototype[method] = sourceView.prototype[method];
	}
}

// Apply fetch API to the global space
require('es6-promise').polyfill();
require('isomorphic-fetch');
const Promise = require('bluebird'),
	PubSub = require('pubsub-js');

// PUBSUB TOPICS
const UPDATE_CURRENT_SEARCH_RESULTS = 'UPDATE_CURRENT_SEARCH_RESULTS';


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
		this.searchResultsList = document.querySelector('.search-results');
		this.nextButton = document.querySelector('.search-controls .next');
		this.previousButton = document.querySelector('.search-controls .previous');
		
		const self = this;
		self.addListener(self.searchButton, 'click', function() {
			const value = self.searchInput.value;
			Controller.searchByTerm(value);
		});
		
		self.addListener(self.nextButton, 'click', function() {
			Controller.nextPage();
		});

		self.addListener(self.previousButton, 'click', function() {
			Controller.previousPage();
		});

		self.searchSubToken = PubSub.subscribe(UPDATE_CURRENT_SEARCH_RESULTS, () => {
			self.render();
		});

	},

	render: function() {
		const self = this,
			gameDataResults = Controller.getCurrentSearchResults();
			debugger;

		while (this.searchResultsList.firstChild) {
			this.searchResultsList.removeChild(
				this.searchResultsList.firstChild
			);
		}

		gameDataResults.forEach(gameData => {
			const resultElement = (gameData);
			self.searchResultsList.append(
				self.renderResult(gameData)
			);
		});
	},

	renderResult: function(gameData) {
		let imageUrl = '';
		const cover = gameData.cover;
		
		if (cover && cover.url) { imageUrl = cover.url; }

		const htmlString = `
			<img width='90' height='90' src='${imageUrl}'>
			<span>${gameData.name}</span>
		`;

		const element = document.createElement('div');
		element.className = 'search-result';
		element.innerHTML = htmlString;

		return element;
	},
};

extendPrototype(SearchView, BaseView);

const SearchResultView = function(gameData) {
	this.gameData = gameData;
};


extendPrototype(SearchResultView, BaseView);

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
			PubSub.publish(UPDATE_CURRENT_SEARCH_RESULTS);
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
};


// State Store for the application
const Store = {
	searchState: {
		currentSearchTerm: undefined,
		currentPage: undefined,
		searchResults: {},
	},

};

// Setup page
Controller.init();