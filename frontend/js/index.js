// Apply fetch API to the global space
require('es6-promise').polyfill();
require('isomorphic-fetch');
const SearchView = require('./view.search');

// Setup page
new SearchView().render();