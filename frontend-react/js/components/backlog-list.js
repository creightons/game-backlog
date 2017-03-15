const React = require('react'),
	GameImage = require('./game-image');

function BacklogList({ games, removeGame }) {
	return (
		<div className='backlog'>
			<h3 className='backlog-title' >My Backlog</h3>
			<ul className='game-list'>
				{games.map(game => {
					// Include current game via closure
					const clickHandler = () => removeGame(game);
					return (
						<li className='game-list-item' key={game._id} >
							<GameImage url={game.cover && game.cover.url} />
							{game.name}
							<button
								className='button'
								onClick={clickHandler}
							>
								Remove
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);	
}

module.exports = BacklogList;