const React = require('react'),
	{ logout } = require('../actions'),
	{ connect } = require('react-redux');

function UserProfile({ username, logoutUser }) {
	function handleClick() {
		logoutUser();
	}

	return (
		<div>
			<div>Hello, {username}.</div>
			<button onClick={handleClick}>
				Logout
			</button>
		</div>
	);
}

function mapStateToProps(state, props) {
	return {
		username: state.user.username,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logoutUser: () => dispatch( logout() ),
	};
}

const container = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserProfile);

module.exports = container;