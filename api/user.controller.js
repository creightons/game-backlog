const User = require('./user.model');

function badReq(res) { res.status(400).send(); }

// POST /sign-up
function signUp(req, res, next) {
	const { username, password } = req.body;

	if (!username || !password) {
		return badReq(res);
	}
	
	User.findOne({ username }).then(user => {
		if (user) { return badReq(res); }

		const newUser = User({ username, password });

		return newUser.save().then(() => {
			return res.status(200).send();
		});			
	}).catch(err => {
		next(err);
	});
}

module.exports = {
	signUp,
};