const controller = require('./igdb.controller.js'),
	router = require('express').Router();

router.get('/:searchTerm/:pageNumber', controller.search);

module.exports = router;