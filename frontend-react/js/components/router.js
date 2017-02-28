const {
		Router,
		Route,
		browserHistory,
	} = require('react-router'),
	React = require('react'),
	App = require('./app'),
	SearchView = require('../containers/search-view');

const SiteRouter = () => {
	return (
		<Router history={browserHistory}>
			<Route component={App}>
				<Route path='/' component={SearchView} />
			</Route>
		</Router>
	);
};

module.exports = SiteRouter;