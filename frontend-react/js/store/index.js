const { createStore, applyMiddleware } = require('redux'),
	thunkMiddleware = require('redux-thunk').default,
	reducer = require('../reducers');

const store = createStore(
	reducer,
	applyMiddleware(
		thunkMiddleware
	)
);

module.exports = store;