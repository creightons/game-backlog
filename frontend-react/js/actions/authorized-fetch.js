const Store = require('../store'),
	{ hashHistory } = require('react-router'),
	{ FORCE_LOG_OUT } = require('../action-types');

function forceLogOut() {
	return {
		type: FORCE_LOG_OUT,
	};
}

// Checks if fetch returned errors. If a bad request occurs,
// throw it so that it is visible in the console. Fetch API
// doesn't automatically throw bad requests, unfortunately.
function handleFetchError(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function handleUnauthorizedAccess(res) {
	if (res.status === 401) {
		Store.dispatch( forceLogOut() );
		hashHistory.push('/login');
	}

	return res;
}

function fetchUrl(url, options) {
	return fetch(url, options)
		.then(handleUnauthorizedAccess)
		.then(handleFetchError);
}

module.exports = {
	fetchUrl,
	forceLogOut,
};