const React = require('react'),
	{ logout, removeGameFromBacklog } = require('../actions'),
	BacklogList = require('../components/backlog-list'),
	{ getBacklogGamesArray } = require('../selectors'),
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
				<BacklogList
					games={this.props.games}
					removeGame={this.props.removeGame}
				/>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		username: state.user.username,
		games: getBacklogGamesArray(state),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logoutUser: () => dispatch( logout() ),
		removeGame: game => dispatch( removeGameFromBacklog(game) ),
	};
}

const container = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserProfile);

module.exports = container;