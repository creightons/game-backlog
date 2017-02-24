// State Store for the application
const Store = {
	searchState: {
		currentSearchTerm: undefined,
		currentPage: undefined,
		// Each key in searchResults is a paged number
		searchResults: {},
	},

};

module.exports = Store;