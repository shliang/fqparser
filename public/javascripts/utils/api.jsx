var Fetch = require('whatwg-fetch');
var rootUrl = process.env.PORT ? "https://fqparser.herokuapp.com/" : "http://localhost:3000/";

module.exports = {
	get: function(url) {
		return fetch(rootUrl + url)
			.then(function(response) {
				return response.json();
			})
		},
	
	post: function(url, data) {
		return fetch(rootUrl + url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(function(response) {
			return response.json();
		});
	}
}