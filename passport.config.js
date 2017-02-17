const LocalStrategy = require('passport-local').Strategy,
	User = require('./user.model');


function startPassport (passport) {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id).then(
			user => done(null, user)
		).catch(
			err => done(err)
			);
	});

	passport.use(
		'local',
		new LocalStrategy(function(username, password, done) {
			User.findOne({ username }).then(user => {
				if (!user) { return done(null, false); }
				if (!user.password) { return done(null, false); }
				return done(null, user);
			}).catch(
				err => done(err)
			);
		})
	);
}

module.exports = startPassport;