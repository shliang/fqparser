module.exports = function(app, models) {
	app.get('/', function(req, res) {
		res.render('index');
	});
	
	app.get('/folders', function(req, res) {
		models.Folder.find({}, function(err, folders) {
			if (err) {
				console.log(err);
				res.end(err);
			} else {
				res.json(folders);
			}
		})
	});
	
	app.post('/folders', function(req, res) {
		//models.Folder.collection.insert(req.body, function(err, document) { //more efficient, but doesn't return
		models.Folder.create(req.body, function(err, document) {
			if (err) {
				console.log(err);
				res.end("Error");
			} else {
				res.json(document);
			}
		});
	});
}
