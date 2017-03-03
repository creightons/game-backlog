const React = require('react'),
	{ Link } = require('react-router');

const Navbar = () => {
	return (
		<nav className='navbar-header'>
			<div className='navbar-title'>Game Backlogs</div>
			<Link to='/login'>
				<div className='sign-in-link'>Sign In</div>
			</Link>
		</nav>
	);
};

module.exports = Navbar;