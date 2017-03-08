const React = require('react'),
	{ connect } = require('react-redux'),
	{ hashHistory } = require('react-router'),
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

	componentWillReceiveProps(nextProps) {
		if (nextProps.isLoggedIn === true) {
			hashHistory.push('/profile');
		}
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
				<div className='login-component'>
					<h3 className='login-title'>Enter</h3>
					<div className='input-row'>
						<label className='login-label'>Username</label>
						<input
							className='login-input'
							type='text'
							value={username}
							onChange={this.changeUsername}
						/>
					</div>
					<div className='input-row'>
						<label className='login-label'>Password</label>
						<input
							className='login-input'
							type='password'
							value={password}
							onChange={this.changePassword}
						/>
					</div>
					<div className='login-button-row'>
						<button
							className='login-button'
							onClick={this.handleSignup}
						>
							Sign Up
						</button>
						<button 
							className='login-button'
							onClick={this.handleLogin}
						>
							Login
						</button>
					</div>
				</div>
				{ loading ? <div>Loading</div> : <div /> }
				{ error ? <div>An error occurred</div> : <div /> }
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		isLoggedIn: state.user.loggedIn,
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