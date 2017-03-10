const {
		REQUEST_GAMES,
		REQUEST_GAMES_SUCCESS,
		REQUEST_GAMES_FAILURE,
	} = require('../action-types'),
	{ fetchUrl } = require('./authorized-fetch'),
	{ handleError } = require('../utils');

function requestGames() {
	return {
		type: REQUEST_GAMES,
	};
}

function requestGamesSuccess(games) {
	return {
		type: REQUEST_GAMES_SUCCESS,
		games,
	};
}

function requestGamesFailure() {
	return {
		type: REQUEST_GAMES_FAILURE,
	};
}

function getGamesBacklog() {
	return (dispatch, getState) => {
		dispatch( requestGames() );

		fetchUrl('/game', {
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(
			res => res.json()
		).then(games => {
			dispatch( requestGamesSuccess(games) );
		}).catch(err => {
			handleError(err);
			dispatch( requestGamesFailure() );
		});
	};
}

module.exports = {
	getGamesBacklog,
};