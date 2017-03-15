const {
		REQUEST_GAMES,
		REQUEST_GAMES_SUCCESS,
		REQUEST_GAMES_FAILURE,
		REQUEST_ADD_GAME,
		ADD_GAME_SUCCESS,
		ADD_GAME_FAILURE,
	} = require('../action-types'),
	merge = require('lodash.merge');

const initialState = {
	games: [],
	loading: false,
	error: false,	

	addGameLoading: true,
	addGameError: false,
};

function reducer(state = initialState, action) {
	switch(action.type) {

		case REQUEST_GAMES:
			return merge({}, state, {
				loading: true,
				error: false,
			});

		case REQUEST_GAMES_SUCCESS:
			return merge({}, state, {
				loading: false,
				games: action.games,
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
			return merge({}, state, {
				addGameLoading: false,
				games: [ ...state.games, action.game ],
			});

		case ADD_GAME_FAILURE:
			return merge({}, state, {
				addGameLoading: false,
				addGameError: true,
			});
			
		default:
			return state;
	}
}

module.exports = reducer;