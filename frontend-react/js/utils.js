// Checks if fetch returned errors. If a bad request occurs,
// throw it so that it is visible in the console. Fetch API
// doesn't automatically throw bad requests, unfortunately.
function handleFetchError(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Print an error to the screen when they occur
function handleError(err) {
	console.error(err.stack);
}

module.exports = {
	handleError,
	handleFetchError,
};