const BaseView = require('./view.base'),
	PubSub = require('pubsub-js'),
	constants = require('./constants'),
	{ extendPrototype } = require('./utils'),
	{ SIGNIN_VIEW } = constants.viewNames,
	{ DISPLAY_VIEW } = constants.channelTopics;

const SigninView = function() {
	this.init();
}

SigninView.prototype = {
	init: function() {
		self = this;

		self.root = document.querySelector('.login-view');

		self.displayViewToken = PubSub.subscribe(DISPLAY_VIEW, (topic, viewName) => {
			self.controlVisibility(viewName);
		})
	},

	controlVisibility: function(viewName) {
		if (viewName === SIGNIN_VIEW) {
			this.root.classList.remove('display-none');
		}
		else {
			this.root.classList.add('display-none');
		}
	},
};

extendPrototype(SigninView, BaseView);

module.exports = SigninView;