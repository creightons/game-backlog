// Extends methods from the prototype of a source view to another view
function extendPrototype(destView, sourceView ) {
	for (let method in sourceView.prototype) {
		destView.prototype[method] = sourceView.prototype[method];
	}
}

module.exports = {
	extendPrototype,
};