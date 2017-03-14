const React = require('react'),
	GameImage = require('./game-image');

function BacklogList({ games }) {
	return (
		<div className='backlog'>
			<h3 className='backlog-title' >My Backlog</h3>
			<ul className='backlog-list'>
				{games.map(game => {
					return (
						<li className='backlog-item' key={game._id} >
							<GameImage url={game.cover && game.cover.url} />
							{game.name}
							<button className='button'>Remove</button>
						</li>
					);
				})}
			</ul>
		</div>
	);	
}

module.exports = BacklogList;