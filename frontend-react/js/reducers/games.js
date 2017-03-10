const {
		REQUEST_GAMES,
		REQUEST_GAMES_SUCCESS,
		REQUEST_GAMES_FAILURE,
	} = require('../action-types'),
	merge = require('lodash.merge');

const initialState = {
	games: [],
	loading: false,
	error: false,	
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

		default:
			return state;
	}
}

module.exports = reducer;