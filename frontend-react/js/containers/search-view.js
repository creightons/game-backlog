const React = require('react'),
	{ connect } = require('react-redux'),
	{
		searchNewTerm,
		searchThroughPagination,
	} = require('../actions');

class SearchView extends React.Component {
	constructor(props) {
		super(props);

		const searchTerm = this.props.currentSearchTerm;

		this.state = { searchTerm };
		this.handleChange = this.handleChange.bind(this);
		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
	}

	handleChange(e) {
		this.setState({
			searchTerm: e.target.value,
		});
	}

	handleSearchClick() {
		this.props.searchForTerm(this.state.searchTerm);
	}

	handleNextClick() {
		const {
			currentPage,
			currentSearchTerm,
			isNextEnabled,
			getPagedResults,
		} = this.props;

		if (isNextEnabled) {
			getPagedResults(
				currentSearchTerm,
				currentPage + 1
			);
		}
	}

	handlePreviousClick() {
		const {
			currentPage,
			currentSearchTerm,
			isNextEnabled,
			getPagedResults,
		} = this.props;

		if (isPreviousEnabled) {
			getPagedResults(
				currentSearchTerm,
				currentPage - 1
			);
		}
	}

	render() {
		const {
			currentResults,
			isNextEnabled,
			isPreviousEnabled,
		} = this.props;

		let resultsList,
			nextClasses = ['search-button', 'next'],
			previousClasses = ['search-button', 'previous'];

		if (!isNextEnabled) { nextClasses.push('search-button-disabled'); }
		if (!isPreviousEnabled) { previousClasses.push('search-button-disabled'); }
		
		if (currentResults.length > 0) {
			resultsList = (
				<div className='search-results'>
					{currentResults.map(result => {
						return (
							<div key={result.id}>
								<img
									width='90'
									height='90'
									src={result.cover && result.cover.url}
								/>
								<span>{result.name}</span>
							</div>
						);
					})}
				</div>
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
					<div onClick={this.handlePreviousClick} className={previousClasses.join(' ')}>
						Previous
					</div>
					<div onClick={this.handleNextClick} className={nextClasses.join(' ')}>
						Next
					</div>
				</div>								
			</div>	
		);
	}
}


function getCurrentResults(state) {
	const { currentSearchTerm, currentPage, searchResults } = state.searchResults;
	let currentResults = [];

	if (
		currentSearchTerm
		&& currentPage
		&& searchResults[currentSearchTerm]
		&& searchResults[currentSearchTerm][currentPage]
		&& Array.isArray(searchResults[currentSearchTerm][currentPage])
	) {
		currentResults = searchResults[currentSearchTerm][currentPage];
	}

	return currentResults;
}

const SEARCH_RESULT_PAGE_MAX_ENTRIES = 15; // Can only see 15 results at a time

function isNextEnabled(state) {
	const { currentPage, currentSearchTerm, searchResults } = state.searchResults;
	let isEnabled = false;

	if (
		currentSearchTerm
		&& currentPage
		&& currentPage >= 1
	) {
		const searchTermResults = searchResults[currentSearchTerm]
		const pageNumbers = Object.keys(searchTermResults)
			.map(key => parseInt(key))
			.sort();

		if (pageNumbers.length > 0) {
			const maxPage = pageNumbers[pageNumbers.length - 1];

			if (
				currentPage <= maxPage
				&& searchTermResults[currentPage].length === SEARCH_RESULT_PAGE_MAX_ENTRIES
			) {
				isEnabled = true;
			}
		}
	}

	return isEnabled;
}

function isPreviousEnabled(state) {
	const { currentPage } = state.searchResults;
	let isEnabled = false;

	if (currentPage && currentPage > 1) { isEnabled = true; }

	return isEnabled;
}

function mapStateToProps(state, props) {
	return {
		currentSearchTerm: state.searchResults.currentSearchTerm,
		currentPage: state.searchResults.currentPage,
		currentResults: getCurrentResults(state),
		isNextEnabled: isNextEnabled(state),
		isPreviousEnabled: isPreviousEnabled(state),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getPagedResults: (searchTerm, currentPage) => {
			return dispatch( searchThroughPagination(searchTerm, currentPage) );
		},
		searchForTerm: (searchTerm) => {
			return dispatch( searchNewTerm(searchTerm) );
		},
	};
}

const container = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchView);

module.exports = container;