const controller = require('./igdb.controller.js'),
	router = require('express').Router();

router.get('/', controller.search);

module.exports = router;