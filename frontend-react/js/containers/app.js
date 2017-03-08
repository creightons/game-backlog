const React = require('react'),
	{ connect } = require('react-redux'),
	{ checkIfLoggedIn } = require('../actions'),
	Navbar = require('./navbar');

class App extends React.Component {

	componentWillMount() {
		this.props.checkIfLoggedIn();
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
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		checkIfLoggedIn: () => dispatch( checkIfLoggedIn() ),
	};
}

const container = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

module.exports = container;