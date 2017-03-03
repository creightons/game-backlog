const {
		Router,
		Route,
		hashHistory,
	} = require('react-router'),
	React = require('react'),
	App = require('./app'),
	SearchView = require('../containers/search-view'),
	LoginPage = require('../containers/login-page'),
	UserProfile = require('../containers/user-profile');

const SiteRouter = () => {
	return (
		<Router history={hashHistory}>
			<Route component={App}>
				<Route path='/' component={SearchView} />
				<Route path='/login' component={LoginPage} />
				<Route path='/profile' component={UserProfile} />
			</Route>
		</Router>
	);
};

module.exports = SiteRouter;