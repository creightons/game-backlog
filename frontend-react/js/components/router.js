const {
		Router,
		Route,
		browserHistory,
	} = require('react-router'),
	React = require('react'),
	App = require('./app');

const SiteRouter = () => {
	return (
		<Router history={browserHistory}>
			<Route path='/' component={App} />
		</Router>
	);
};

module.exports = SiteRouter;