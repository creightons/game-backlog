const React = require('react'),
	{ logoutsss } = require('../actions'),
	{ connect } = require('react-redux');

class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		this.props.logoutUser();
	}

	render() {

		return (
			<div>
				<div>Hello, {this.props.username}.</div>
				<button onClick={this.handleClick}>
					Logout
				</button>
			</div>
		);
	}
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