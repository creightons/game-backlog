const React = require('react'),
	{ logout } = require('../actions'),
	BacklogList = require('../components/backlog-list'),
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
				<button className='button' onClick={this.handleClick}>
					Logout
				</button>
				<BacklogList games={this.props.games} />
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		username: state.user.username,
		games: state.games.games,
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