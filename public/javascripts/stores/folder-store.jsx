var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
	listenables: [Actions],
	getFolders: function() {
		return Api.get("folders")
			.then(function(json) {
				this.folders = json;
				this.triggerSync();
			}.bind(this));
	},
	
	postFolders: function(data) {
		return Api.post("folders", data)
			.then(function(json) {
				this.folders = json;
				this.triggerAdd();
			}.bind(this))
	},
	
	triggerSync: function() {
		this.trigger('sync', this.folders);
	},
	
	triggerAdd: function() {
		this.trigger('add', this.folders);
	}
});