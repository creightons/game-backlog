const BaseView = require('./view.base'),
	PubSub = require('pubsub-js'),
	{ UPDATE_CURRENT_SEARCH_RESULTS } = require('./channel-topics'),
	{ extendPrototype } = require('./utils'),
	Controller = require('./controller');

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

		while (self.searchResultsList.firstChild) {
			self.searchResultsList.removeChild(
				self.searchResultsList.firstChild
			);
		}

		gameDataResults.forEach(gameData => {
			const resultElement = (gameData);
			self.searchResultsList.append(
				self.renderResult(gameData)
			);
		});

		Controller.isNextEnabled()
			? self.nextButton.classList.remove('button-disabled')
			: self.nextButton.classList.add('button-disabled');

		Controller.isPreviousEnabled()
			? self.previousButton.classList.remove('button-disabled')
			: self.previousButton.classList.add('button-disabled');
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

module.exports = SearchView;