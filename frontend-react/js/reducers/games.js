const {
		REQUEST_GAMES,
		REQUEST_GAMES_SUCCESS,
		REQUEST_GAMES_FAILURE,
		REQUEST_ADD_GAME,
		ADD_GAME_SUCCESS,
		ADD_GAME_FAILURE,
		REQUEST_REMOVE_GAME,
		REMOVE_GAME_SUCCESS,
		REMOVE_GAME_FAILURE,
	} = require('../action-types'),
	merge = require('lodash.merge');

const initialState = {
	games: {},
	loading: false,
	error: false,	

	addGameLoading: false,
	addGameError: false,

	removeGameLoading: false,
	removeGameError: false,
};

function reducer(state = initialState, action) {
	switch(action.type) {

		case REQUEST_GAMES:
			return merge({}, state, {
				loading: true,
				error: false,
			});

		case REQUEST_GAMES_SUCCESS:
			const gamesMap = {};

			action.games.forEach(game => {
				gamesMap[game.igdbId] = game;
			});
			return merge({}, state, {
				loading: false,
				games: gamesMap,
			});

		case REQUEST_GAMES_FAILURE:
			return merge({}, state, {
				loading: false,
				error: false,
			});

		case REQUEST_ADD_GAME:
			return merge({}, state, {
				addGameLoading: true,
				addGameError: false,
			});

		case ADD_GAME_SUCCESS:
			const newGameMap = {};
			newGameMap[action.game.igdbId] = action.game;
			return merge({}, state, {
				addGameLoading: false,
				games: newGameMap,
			});

		case ADD_GAME_FAILURE:
			return merge({}, state, {
				addGameLoading: false,
				addGameError: true,
			});

		case REQUEST_REMOVE_GAME:
			return merge({}, state, {	
				removeGameLoading: true,
				removeGameError: false,
			});

		case REMOVE_GAME_SUCCESS:
			const reducedGamesMap = Object.assign({}, state.games);
			
			// igdbId identifies unique game titles. _id only
			// identifies unique game records; a single title
			// could be reserved by multiple users, but each user
			// can only backlog a single title once.
			delete reducedGamesMap[action.game.igdbId];

			const totalReducedState = merge({}, state, {
				removeGameLoading: false,
			});

			totalReducedState.games = reducedGamesMap;

			return totalReducedState;

		case REMOVE_GAME_FAILURE:
			return merge({}, state, {
				removeGameLoading: false,
				removeGameError: true,
			});

		default:
			return state;
	}
}

module.exports = reducer;