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
	_owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;