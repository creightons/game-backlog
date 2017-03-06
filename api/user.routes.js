const controller = require('./user.controller'),
	router = require('express').Router();

router.post('/', controller.signUp);

module.exports = router;