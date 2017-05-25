
module.exports = function(app) {

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

	//Error handling
	app.use(function (err, req, res, next) {
		console.error(err.stack)
		res.status(500).render('pages/error.html');
	});

	//Page not found
	app.use(function (req, res, next) {
		res.status(404).render('pages/404.html');
	});

};