
module.exports = function(app, config) {

	app.get('/', function(req, res) {
		return res.render('index.html');
	});

	app.get('/equipment', function(req, res) {
		return res.render('pages/equipment.html');
	});

	app.get('/capabilities', function(req, res) {
		return res.render('pages/capabilities.html');
	});

	app.get('/facilities', function(req, res) {
		return res.render('pages/facilities.html');
	});

};