const React = require('react');

function GameImage({ url }) {
	return (
		<img width='90' height='90' src={url} />
	);
}

module.exports = GameImage;