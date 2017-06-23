// app-server.js
var express = require('express');
var hogan = require('hogan-express');
var http_module = require('http');
var bodyParser = require('body-parser');
var compression = require('compression');
var env = (process.env.NODE_ENV === 'development') ? 'development' : 'production';
var config;

var app = express();
app.engine('html', hogan);
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 8080);
app.set('partials', {
	header: 'partials/header',
	footer: 'partials/footer'
});

app.use(function (req, res, next) {

	config = require('./config/config')(req.path);

	//console.log(config);

	// Set secure http header settings from https://www.smashingmagazine.com/2017/04/secure-web-app-http-headers/
	// https://www.html5rocks.com/en/tutorials/security/content-security-policy/
	// these should be used on routes returning sensitive user information
	//res.set('Cache-Control','no-cache,no-store,max-age=0,must-revalidate');
	//res.set('Pragma','no-cache');
	//res.set('Expires','-1');
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
		//'Strict-Transport-Security','max-age=31536000; includeSubDomains; preload', //taking out for now, https not ready
		'X-XSS-Protection': '1; mode=block',
		'X-Frame-Options': 'SAMEORIGIN',
		'Content-Security-Policy': "script-src 'self' http://localhost:35729 maps.googleapis.com", // for livereload, although could just take out for development
		'X-Content-Type-Options': 'nosniff'
	});

	// Global hogan-express variables
	res.locals.year = new Date().getFullYear();
	res.locals.is_dev = (env === 'development');
	res.locals.navLinks = config.navLinks;
	res.locals.pageMeta = config.pageMeta;

	console.log(res.locals.pageMeta)

	next();
});

// App Routes
require('./routes.js')(app);

var http = http_module.Server(app)
http.listen(app.get('port'), function() {
	console.info('Server Running in '+env+' mode');
	console.info('Listening at http://localhost:%s', app.get('port'));
});
