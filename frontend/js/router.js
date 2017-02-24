const SearchView = require('./view.search');

function Router() {
	this.init();
}

Router.prototype = {
	init: function() {
		new SearchView().render();
	}
}

module.exports = Router;
