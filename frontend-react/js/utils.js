// Print an error to the screen when they occur
function handleError(err) {
	console.error(err.stack);
}

module.exports = {
	handleError,
};