const {
		Router,
		Route,
		hashHistory,
	} = require('react-router'),
	React = require('react'),
	App = require('../containers/app'),
	Store = require('../store'),
	SearchView = require('../containers/search-view'),
	LoginPage = require('../containers/login-page'),
	UserProfile = require('../containers/user-profile');

function SiteRouter() {
	// Make sure only an authenticated user can enter the profile
	function ensureAuthenticated(nextState, replace) {
		if (!Store.getState().user.loggedIn) {
			replace('/login');
		}
	};

	// If the user is logged in, redirect from the login page to the profile page
	function redirectIfLoggedIn(nextState, replace) {
		if (Store.getState().user.loggedIn) {
			replace('/profile');
		}
	}

	return (
		<Router history={hashHistory}>
			<Route component={App}>
				<Route path='/' component={SearchView} />
				<Route
					path='/login'
					component={LoginPage}
					onEnter={redirectIfLoggedIn}
				/>
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