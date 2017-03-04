const {
		REQUEST_AUTHENTICATION,
		REQUEST_AUTHENTICATION_SUCCESS,
		REQUEST_AUTHENTICATION_FAILURE,
		FORCE_LOG_OUT,
		REQUEST_SIGNUP,
		REQUEST_SIGNUP_SUCCESS,
		REQUEST_SIGNUP_FAILURE,
	} = require('../action-types'),
	merge = require('lodash.merge');

const initialState = {
	loggedIn: false,
	loading: false,
	error: false,
	username: null,
};

function reducer (state = initialState, action) {
	switch(action.type) {
		case REQUEST_SIGNUP:
		case REQUEST_AUTHENTICATION:
			return merge({}, state, {
				loggedIn: false,
				loading: true,
				error: false,
			});

		case REQUEST_SIGNUP_SUCCESS:
		case REQUEST_AUTHENTICATION_SUCCESS:
			return merge({}, state, {
				loggedIn: true,
				loading: false,
				username: action.username,
			});

		case REQUEST_SIGNUP_FAILURE:
		case REQUEST_AUTHENTICATION_FAILURE:
			return merge({}, state, {
				loading: false,
				loggedIn: false,
				error: true,
				username: null,
			});

		case FORCE_LOG_OUT:
			return merge({}, state, {
				loggedIn: false,
				username: null,
			});

		default:
			return state;
	}
}

module.exports = reducer;