const React = require('react'),
	GameImage = require('./game-image');

class SearchComponent extends React.Component {
	constructor(props) {
		super(props);

		const searchTerm = this.props.currentSearchTerm;

		this.state = { searchTerm };
		this.handleChange = this.handleChange.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
	}

	handleChange(e) {
		this.setState({
			searchTerm: e.target.value,
		});
	}

	handleSearchClick() {
		this.props.searchForTerm(this.state.searchTerm);
	}

	render() {
		const {
			currentResults,
			isNextEnabled,
			isPreviousEnabled,
			nextButtonHandler,
			previousButtonHandler,
			isUserLoggedIn,
			addGame,
			backlog,
		} = this.props;

		let resultsList,
			nextClasses = ['search-button', 'next'],
			previousClasses = ['search-button', 'previous'];

		if (!isNextEnabled) { nextClasses.push('search-button-disabled'); }
		if (!isPreviousEnabled) { previousClasses.push('search-button-disabled'); }
		
		if (currentResults.length > 0) {
			resultsList = (
				<ul className='game-list'>
					{currentResults.map(result => {
						let alreadyAdded = false;

						if (backlog[ result.igdbId ]) {
							alreadyAdded = true;
						}

						return (
							<SearchResultItem
								searchResult={result}
								addGame={addGame}
								isUserLoggedIn={isUserLoggedIn}
								key={result.id}
								alreadyAdded={alreadyAdded}
							/>
						);
					})}
				</ul>
			);
		}
		
		return (
			<div className='search-view'>
				<div className='search-bar-box'>
					<input
						className='search-input'
						type='text'
						name='value'
						onChange={this.handleChange}
					/>
					<label
						className='search-bar-button'
						onClick={this.handleSearchClick}
					>
						Search
					</label>
				</div>
				{resultsList}
				<div className='search-controls'>
					<div onClick={previousButtonHandler} className={previousClasses.join(' ')}>
						Previous
					</div>
					<div onClick={nextButtonHandler} className={nextClasses.join(' ')}>
						Next
					</div>
				</div>								
			</div>	
		);
	}
}

function SearchResultItem({
	searchResult,
	addGame,
	isUserLoggedIn,
	alreadyAdded
}) {

	function handleClick() {
		addGame(searchResult);
	}

	let addButton;
	if (isUserLoggedIn) {
		if (alreadyAdded) {
			addButton = (
				<div>Already Added</div>
			);
		}
		else {
			addButton = (
				<button
					className='button add-game-button'
					onClick={handleClick}
				>
					Add Game
				</button>
			);
		}
	}

	return (
		<li className='game-list-item'>
			<GameImage url={searchResult.cover && searchResult.cover.url} />
			<span>{searchResult.name}</span>
			{addButton}
		</li>
	);
}

module.exports = SearchComponent;