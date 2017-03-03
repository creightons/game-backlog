const React = require('react'),
	{ connect } = require('react-redux');

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { username: '', password: '' };

		this.changePassword = this.changePassword.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
		this.login = this.login.bind(this);
	}

	changeUsername(e) {
		this.setState({ username: e.target.value });
	}

	changePassword(e) {
		this.setState({ password: e.target.value });
	}

	login() {
		const { username, password } = this.state;

		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		}).then(
			res => res.json()
		).then(
			json => console.log('got here -> ', json)
		).catch(
			err => console.log('fetch error: ', err)
		);
	}

	render() {
		const { username, password } = this.state;
		return (
			<div>
				<label>Username</label>
				<input type='text' value={username} onChange={this.changeUsername} />
				<br />
				<label>Password</label>
				<input type='password' value={password} onChange={this.changePassword} />
				<br />
				<button onClick={this.login}>Submit</button>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

const container = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);

module.exports = container;