// Apply fetch API to the global space
require('es6-promise').polyfill();
require('isomorphic-fetch');
const Router = require('./router');

// Setup page
new Router();