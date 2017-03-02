// Apply fetch API to the global space
require('es6-promise').polyfill();
require('isomorphic-fetch');

const React = require('react'),
	{ render } = require('react-dom'),
	store = require('./store'),
	{ Provider } = require('react-redux'),
	Router = require('./components/router');

render(
	<Provider store={store}>
		<Router />
	</Provider>,
	document.querySelector('#app')
);
