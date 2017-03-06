const React = require('react'),
	Navbar = require('../containers/navbar');

const App = (props) => {
	return (
		<div>
			<Navbar />
			<main className='main-content'>
				{props.children}
			</main>
		</div>
	);
};

module.exports = App;