const {
		REQUEST_AUTHENTICATION,
		REQUEST_AUTHENTICATION_SUCCESS,
		REQUEST_AUTHENTICATION_FAILURE,
		REQUEST_SIGNUP,
		REQUEST_SIGNUP_SUCCESS,
		REQUEST_SIGNUP_FAILURE,
	} = require('../action-types'),
	{ hashHistory } = require('react-router'),
	{ fetchUrl, forceLogOut } = require('./authorized-fetch'),
	{ handleError } = require('../utils');


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

function login(username, password) {
	return (dispatch) => {
		dispatch( requestAuthentication() );

		fetchUrl('/login', {
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ username, password}),
		}).then(() => {
			dispatch( authenticationSuccess(username) );
			hashHistory.push('/profile');
		}).catch(err => {
			handleError(err);
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
		dispatch( requestSignup() );

		fetchUrl('/user', {
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ username, password }),
		}).then(() => {
			dispatch( signupSuccess(username) );
			hashHistory.push('/profile');
		}).catch(err => {
			handleError(err)
			dispatch( signupFailure() );
		});
	};
}

function logout() {
	return (dispatch) => {
		dispatch(forceLogOut());
		hashHistory.push('/');
		fetchUrl('/logout', {
			credentials: 'same-origin',
			method: 'POST',
		}).catch(err => {
			handleError(err);
		});
	};
}

function checkIfLoggedIn() {
	return (dispatch) => {
		fetchUrl('/user-is-logged-in', {
			credentials: 'same-origin',
		}).then(
			res => res.json()
		).then(loginStatus => {
			if (loginStatus.loggedIn) {
				dispatch(
					authenticationSuccess(
						loginStatus.username
					)
				);
			}
		});
	};
}

module.exports = {
	signup,
	login,
	logout,
	checkIfLoggedIn,
};