const BaseView = function() {};

BaseView.prototype = {
	addListener: function(element, event, handler) {
		if (!this._listeners) {
			this._listeners = [];
		}

		element.addEventListener(event, handler);
		
		this._listeners.push({
			element,
			event,
			handler,
		});
	},

	removeAllListeners: function() {
		if (
			this._listeners
			&& Array.isArray(this._listeners)
			&& this._listeners.length > 0
		) {
			for (let i = 0; i < this._listeners.length; i++) {
				const { element, event, handler } = this._listeners[i];
				element.removeEventListener(event, handler);
			}
		}
	},
};


module.exports = BaseView;