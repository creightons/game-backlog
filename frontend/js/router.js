const SearchView = require('./view.search'),
	NavbarView = require('./view.navbar'),
	SigninView = require('./view.signin'),
	PubSub = require('pubsub-js'),
	constants = require('./constants'),
	{ DISPLAY_VIEW } = constants.channelTopics,
	{ SEARCH_VIEW, SIGNIN_VIEW } = constants.viewNames;

const Router = function() {
	this.init();
};

Router.prototype = {
	init: function() {
		// Initialize the priamry views for different pages
		new SearchView().render();
		new NavbarView();
		new SigninView();

		// Setup hash fragment to view name mapping
		this.hashToViewMap = {
			'#search': SEARCH_VIEW,
			'#sign-in': SIGNIN_VIEW,
		};

		// Set the initial page hash fragment
		location.hash = 'search';

		// Add listener for route changes
		const self = this;
		window.addEventListener('hashchange', function() {
			self.publishViewChange();
		});
	},

	publishViewChange: function() {
		const view = this.hashToViewMap[ location.hash ];
		PubSub.publish(DISPLAY_VIEW, view);
	},
};

module.exports = Router;
