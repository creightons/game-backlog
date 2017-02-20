// Extends methods from the prototype of a source view to another view
function extendPrototype(destView, sourceView ) {
	for (let method in sourceView.prototype) {
		destView.prototype[method] = sourceView.prototype[method];
	}
}

// Apply fetch API to the global space
require('es6-promise').polyfill();
require('isomorphic-fetch');

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
		Controller.searchIGDB(self.searchInput.value).then(results => {
			const gameDataResults = results.body;
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
			<img src='${imageUrl}'>
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

	searchIGDB: function(value) {
		const URL = `/igdb?value=${value}`;
		return fetch(URL, {
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(
			res => res.json()
		).catch(err => {
			console.log(err);
		});
	},
};

//
let Store = {};

// Setup page
Controller.init();