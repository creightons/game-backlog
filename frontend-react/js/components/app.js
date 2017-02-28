const React = require('react'),
	Navbar = require('./navbar');

const App = (props) => {
	return (
		<div>
			<Navbar />
			<main>
				{props.children}
			</main>
		</div>
	);
};

module.exports = App;