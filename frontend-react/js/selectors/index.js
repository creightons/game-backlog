function getBacklogGamesArray(state) {
	const games = state.games.games;

	let gamesArray = [];
	for (let igdbId in games) {
		if (games.hasOwnProperty(igdbId)) {
			gamesArray.push(games[igdbId]);
		}
	}

	return gamesArray;
}

module.exports = {
	getBacklogGamesArray,
};