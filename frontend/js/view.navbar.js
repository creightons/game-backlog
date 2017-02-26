const BaseView = require('./view.base'),
	{ extendPrototype } = require('./utils'),
	PubSub = require('pubsub-js'),
	Controller = require('./controller');

const NavbarView = function() {
	this.init();
};

NavbarView.prototype = {
	init: function() {},
};

extendPrototype(NavbarView, BaseView);

module.exports = NavbarView;