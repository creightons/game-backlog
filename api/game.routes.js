const router = require('express').Router(),
	controller = require('./game.controller');

router.get('/', controller.getGames);
router.post('/', controller.addGame);
router.delete('/:id', controller.removeGame);

module.exports = router;