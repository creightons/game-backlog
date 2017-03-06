const React = require('react'),
	{ connect } = require('react-redux'),
	{ login, signup } = require('../actions');

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { username: '', password: '' };

		this.changePassword = this.changePassword.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
	}

	changeUsername(e) {
		this.setState({ username: e.target.value });
	}

	changePassword(e) {
		this.setState({ password: e.target.value });
	}

	handleSignup() {
		const { signup } = this.props,
			{ username, password } = this.state;

			signup(username, password);
	}

	handleLogin() {
		const { login } = this.props,
			{ username, password } = this.state;
			login(username, password);
	}

	render() {
		const { username, password } = this.state,
			{ error, loading } = this.props;
		return (
			<div>
				{ loading ? <div>Loading</div> : <div /> }
				{ error ? <div>An error occurred</div> : <div /> }
				<label>Username</label>
				<input type='text' value={username} onChange={this.changeUsername} />
				<br />
				<label>Password</label>
				<input type='password' value={password} onChange={this.changePassword} />
				<br />
				<button onClick={this.handleSignup}>Sign Up</button>
				<button onClick={this.handleLogin}>Login</button>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		loading: state.user.loading,
		error: state.user.error,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		login: (username, password) => {
			dispatch(
				login(username, password)
			);				
		},
		signup: (username, password) => {
			dispatch(
				signup(username, password)
			);
		},
	};
}

const container = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);

module.exports = container;