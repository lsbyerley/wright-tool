var express = require('express');
var handlebars = require('express-handlebars');
var http_module = require('http');
var bodyParser = require('body-parser');
var compression = require('compression');
var env = (process.env.NODE_ENV === 'development') ? 'development' : 'production';
var helmet = require('helmet');
var config;

// for all dates
process.env.TZ = 'America/New_York';

var app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 8080);
app.engine('.hbs', handlebars.create({
	layoutsDir: 'views/layouts',
	partialsDir: 'views/partials',
	defaultLayout: 'default',
	helpers: new require('./server/hbsHelpers')(),
	extname: '.hbs'
}).engine)

app.use(function (req, res, next) {

	config = require('./config/config')(req.path);

	// Set secure http header settings from https://www.smashingmagazine.com/2017/04/secure-web-app-http-headers/
	// https://www.html5rocks.com/en/tutorials/security/content-security-policy/
	// these should be used on routes returning sensitive user information
	//res.set('Cache-Control','no-cache,no-store,max-age=0,must-revalidate');
	//res.set('Pragma','no-cache');
	//res.set('Expires','-1');

	var contentSecurityPolicy = (process.env.NODE_ENV === 'development') ?
	"script-src 'self' http://localhost:35729 maps.googleapis.com cdnjs.cloudflare.com www.google-analytics.com" :
	"script-src 'self' maps.googleapis.com cdnjs.cloudflare.com www.google-analytics.com";

	res.set({
		'Access-Control-Allow-Origin': '*',
		'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
		//'Strict-Transport-Security','max-age=31536000; includeSubDomains; preload', //taking out for now, https not ready
		'X-XSS-Protection': '1; mode=block',
		'X-Frame-Options': 'SAMEORIGIN',
		'Content-Security-Policy': contentSecurityPolicy, // for livereload, although could just take out for development
		'X-Content-Type-Options': 'nosniff'
	});

	// Global hogan-express variables
	var namespace = (req.path === '/') ? 'home' : req.path;
	namespace = namespace.replace('/', '');
	app.locals.namespace = namespace;
	app.locals.year = new Date().getFullYear();
	app.locals.hours = config.hours;
	app.locals.email = config.email;
	app.locals.is_dev = (env === 'development');
	app.locals.navLinks = config.navLinks;
	app.locals.reqPath = req.path;
	app.locals.pageMeta = config.pageMeta;

	next();
});

// App Routes
require('./server/routes.js')(app);

var http = http_module.Server(app)
http.listen(app.get('port'), function() {
	console.info('Server Running in '+env+' mode');
	console.info('Listening at http://localhost:%s', app.get('port'));
});
