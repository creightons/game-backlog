const BaseView = require('./view.base'),
	PubSub = require('pubsub-js'),
	constants = require('./constants'),
	{ extendPrototype } = require('./utils'),
	{ LOGIN_VIEW } = constants.viewNames,
	{ DISPLAY_VIEW } = constants.channelTopics;

const LoginView = function() {
	this.init();
}

LoginView.prototype = {
	init: function() {
		self = this;

		self.root = document.querySelector('.login-view');

		self.displayViewToken = PubSub.subscribe(DISPLAY_VIEW, (topic, viewName) => {
			self.controlVisibility(viewName);
		})
	},

	controlVisibility: function(viewName) {
		if (viewName === LOGIN_VIEW) {
			this.root.classList.remove('display-none');
		}
		else {
			this.root.classList.add('display-none');
		}
	},
};

extendPrototype(LoginView, BaseView);

module.exports = LoginView;