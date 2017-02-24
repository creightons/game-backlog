const SearchView = require('./view.search'),
	NavbarView = require('./view.navbar'),
	PubSub = require('pubsub-js'),
	{ DISPLAY_VIEW } = require('./channel-topics');

const Router = function() {
	this.init();
};

Router.prototype = {
	init: function() {
		new SearchView().render();
		new NavbarView();

		this.viewRoots = {
			LOGIN_VIEW: document.querySelector('.login-view'),
		};

		const self = this;
		self.routeSubToken = PubSub.subscribe(DISPLAY_VIEW, (topic, viewName) => {
			self.displayView(viewName);
		});
	},

	displayView: function(viewName) {
		this.viewRoots[viewName].classList.remove('display-none');
	},
};

module.exports = Router;
