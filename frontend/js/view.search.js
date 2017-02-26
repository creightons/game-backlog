const BaseView = require('./view.base'),
	PubSub = require('pubsub-js'),
	constants = require('./constants'),
	{ extendPrototype } = require('./utils'),
	Controller = require('./controller'),
	{ UPDATE_CURRENT_SEARCH_RESULTS, DISPLAY_VIEW } = constants.channelTopics,
	{ SEARCH_VIEW } = constants.viewNames;

const SearchView = function() {
	this.init();
};

SearchView.prototype = {
	init: function() {	
		this.root = document.querySelector('.search-view');	
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

		self.displayViewToken = PubSub.subscribe(DISPLAY_VIEW, (topic, viewName) => {
			self.controlVisibility(viewName);
		});
	},

	controlVisibility: function(viewName) {
		if (viewName === SEARCH_VIEW) {
			this.root.classList.remove('display-none');
		}
		else {
			this.root.classList.add('display-none');
		}
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