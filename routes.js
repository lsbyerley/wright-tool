
module.exports = function(app) {

	app.get('/', function(req, res) {
		return res.render('home');
	});

	app.get('/about', function(req, res) {
		return res.render('about')
	});

	app.get('/equipment', function(req, res) {
		var equipment = require('./config/equipment');
		app.locals.equipment = equipment;
		return res.render('equipment');
	});

	app.get('/facilities', function(req, res) {
		return res.render('facilities');
	});

	//Error handling
	app.use(function (err, req, res, next) {
		console.error(err.stack)
		res.status(500).render('error');
	});

	//Page not found
	app.use(function (req, res, next) {
		res.status(404).render('404');
	});

};
