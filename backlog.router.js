const router = require('express').Router(),
	controller = require('./team.controller');

router.get('/', controller.index);

module.exports = router;