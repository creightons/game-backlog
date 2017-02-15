const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
	igdbId: String,
	name: String,
	slug: String,
	cover: {
		url: String,
		height: Number,
		width: Number,
	},
});

const BacklogSchema = mongoose.Schema({
	games: [GameSchema],
});

var Backlog = mongoose.model('Backlog', BacklogSchema);

module.exports = Backlog;