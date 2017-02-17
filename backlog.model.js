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
	_owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

var Backlog = mongoose.model('Backlog', BacklogSchema);

module.exports = Backlog;