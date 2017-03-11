const {
		REQUEST_GAMES,
		REQUEST_GAMES_SUCCESS,
		REQUEST_GAMES_FAILURE,
		REQUEST_ADD_GAME,
		ADD_GAME_SUCCESS,
		ADD_GAME_FAILURE,
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

function requestAddGame() {
	return {
		type: REQUEST_ADD_GAME,
	};
}

function addGameSuccess(game) {
	return {
		type: ADD_GAME_SUCCESS,
		game,
	};
}

function addGameFailure() {
	return {
		type: ADD_GAME_FAILURE,
	};
}

function addGameToBacklog(game) {
	return dispatch => {
		dispatch( requestAddGame() );
		fetchUrl('/game', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(game),
		}).then(() => {
			dispatch( addGameSuccess(game) );
		}).catch(err => {
			handleError(err);
			dispatch( addGameFailure() );
		});
	};
}

module.exports = {
	getGamesBacklog,
	addGameToBacklog,
};