const {
		REQUEST_AUTHENTICATION,
		REQUEST_AUTHENTICATION_SUCCESS,
		REQUEST_AUTHENTICATION_FAILURE,
		FORCE_LOG_OUT,
		REQUEST_SIGNUP,
		REQUEST_SIGNUP_SUCCESS,
		REQUEST_SIGNUP_FAILURE,
	} = require('../action-types'),
	fetchUrl = require('../utils');


function requestAuthentication() {
	return {
		type: REQUEST_AUTHENTICATION,
	};
}

function authenticationSuccess(username) {
	return {
		type: REQUEST_AUTHENTICATION_SUCCESS,
		username,
	};
}

function authenticationFailure() {
	return {
		type: REQUEST_AUTHENTICATION_FAILURE,
	};
}

function forceLogOut() {
	return {
		type: FORCE_LOG_OUT,
	};
}

function authenticateUser(username, password) {
	return (dispatch) => {
		dispatch(requestAuthentication);

		fetchUrl('/login', {
			headers: {
				'Content-Type': 'application-json',
			},
			method: 'POST',
			body: JSON.stringify({ username, password}),
		}).then(
			res => res.json()
		).then(() => {
			dispatch( authenticationSuccess(username) );
		}).catch(err => {
			dispatch( authenticationFailure() );
		});
	};
}

function requestSignup() {
	return {
		type: REQUEST_SIGNUP,
	};
}

function signupSuccess(username) {
	return {
		type: REQUEST_SIGNUP_SUCCESS,
		username,
	};
}

function signupFailure() {
	return {
		type: REQUEST_SIGNUP_FAILURE,
	};
}

function signup(username, password) {
	return (dispatch) => {
		dispatch(requestSignup());

		fetchUrl('/signup', {
			headers: {
				'Content-type': 'application-json',
			},
			method: 'POST',
			body: JSON.stringify({ username, password }),
		}).then(
			res => res.json()
		).then(() => {
			dispatch( signupSuccess(username) );
		}).catch(err => {
			dispatch( signupFailure() );
		});
	};
}

module.exports = {
	signup,
	authenticateUser,
	forceLogOut,
};