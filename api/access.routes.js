const router = require('express').Router(),
	passport = require('passport');

	// Login route; sends a 401 status if authentication failed
router.post('/login', passport.authenticate('local'), (req, res) => {
	res.send(req.user.id);
});

router.post('/logout', (req, res) => {
	req.logout();
	res.status(200).send();
});

router.get('/user-is-logged-in', (req, res) => {
	let responseArgs;
	debugger;
	if (req.isAuthenticated()) {
		responseArgs = {
			loggedIn: true,
			username: req.user.username,
		};
	}
	else {
		responseArgs = { loggedIn: false };
	}

	res.status(200).send(responseArgs);
});

module.exports = router;