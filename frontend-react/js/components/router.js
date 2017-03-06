const {
		Router,
		Route,
		hashHistory,
	} = require('react-router'),
	React = require('react'),
	App = require('./app'),
	Store = require('../store'),
	SearchView = require('../containers/search-view'),
	LoginPage = require('../containers/login-page'),
	UserProfile = require('../containers/user-profile');

function SiteRouter() {
	function ensureAuthenticated(nextState, replace) {
		if (!Store.getState().user.loggedIn) {
			replace('/login');
		}
	};

	return (
		<Router history={hashHistory}>
			<Route component={App}>
				<Route path='/' component={SearchView} />
				<Route path='/login' component={LoginPage} />
				<Route
					path='/profile'
					component={UserProfile}
					onEnter={ensureAuthenticated}
				/>
			</Route>
		</Router>
	);
};

module.exports = SiteRouter;