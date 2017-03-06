const React = require('react'),
	{ Link } = require('react-router'),
	{ connect } = require('react-redux');

const Navbar = ({ username, loggedIn }) => {
	let accountLink;
	if (loggedIn) {
		accountLink = (
			<Link to='/profile'>
				<div className='sign-in-link'>{username}</div>
			</Link>
		);
	}
	else {
		accountLink = (
			<Link to='/login'>
				<div className='sign-in-link'>Sign In</div>
			</Link>
		);
	}
	return (
		<nav className='navbar-header'>
			<div className='navbar-title'>
				<Link to='/'>
					<span className='navbar-title-text'>Game Backlogs</span>
				</Link>
			</div>
			{accountLink}
		</nav>
	);
};

function mapStateToProps(state, props) {
	return {
		username: state.user.username,
		loggedIn: state.user.loggedIn,
	};
}

function mapDispatchToProps(state, props) {
	return {};
}

const container = connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);

module.exports = container;