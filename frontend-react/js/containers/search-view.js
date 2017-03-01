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
				<div className='search-results' />
				<div className='search-controls'>
					<div className='search-button search-button-disabled previous'>Previous</div>
					<div className='search-button search-button-disabled next'>Next</div>
				</div>								
			</div>	
		);
	}
}

function getCurrentResults(state) {
	const { currentSearchTerm, currentPage, searchResults } = state.searchResults;
	if (
		searchResults
		&& searchResults[currentSearchTerm]
		&& searchResutls[currentSearchTerm][currentPage]
	) {
		return searchResults[currentSearchTerm][currentPage];
	}

	return [];
}

function mapStateToProps(state, props) {
	return {
		currentSearchTerm: state.searchResults.currentSearchTerm,
		currentPage: state.searchResults.currentPage,
		searchResults: getCurrentResults(state),
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