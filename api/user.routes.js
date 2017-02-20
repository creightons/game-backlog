const controller = require('./user.controller'),
	router = require('express').Router();

router.post('/signup', controller.signUp);

module.exports = router;