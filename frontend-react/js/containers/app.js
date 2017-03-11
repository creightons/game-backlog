const React = require('react'),
	{ connect } = require('react-redux'),
	{
		checkIfLoggedIn,
		getGamesBacklog,
	} = require('../actions'),
	Navbar = require('./navbar');

class App extends React.Component {

	componentWillMount() {
		this.props.checkIfLoggedIn();
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.loggedIn === true
			&& this.props.loggedIn === false
		) {
			this.props.getGamesBacklog();
		}
	}

	render() {
		return (
			<div>
				<Navbar />
				<main className='main-content'>
					{this.props.children}
				</main>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		loggedIn: state.user.loggedIn,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		checkIfLoggedIn: () => dispatch( checkIfLoggedIn() ),
		getGamesBacklog: () => dispatch( getGamesBacklog() ),
	};
}

const container = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

module.exports = container;