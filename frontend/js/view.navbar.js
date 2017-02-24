const BaseView = require('./view.base'),
	{ extendPrototype } = require('./utils'),
	PubSub = require('pubsub-js'),
	Controller = require('./controller');

const NavbarView = function() {
	this.init();
};

NavbarView.prototype = {
	init: function() {
		this.signInButton = document.querySelector('.sign-in-link');

		this.addListener(this.signInButton, 'click', function() {
			Controller.publishRoute('LOGIN_VIEW');
		});
	},
};

extendPrototype(NavbarView, BaseView);

module.exports = NavbarView;