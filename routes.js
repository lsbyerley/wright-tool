
module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('pages/index');
	});

	app.get('/about', function(req, res) {
		res.render('pages/about')
	});

	app.get('/equipment', function(req, res) {
		var equipment = require('./config/equipment');
		app.locals.equipment = equipment;
		res.render('pages/equipment');
	});

	app.get('/facilities', function(req, res) {
		res.render('pages/facilities');
	});

	//Error handling
	app.use(function (err, req, res, next) {
		console.error(err.stack)
		res.status(500).render('pages/error');
	});

	//Page not found
	app.use(function (req, res, next) {
		res.status(404).render('pages/404');
	});

};
