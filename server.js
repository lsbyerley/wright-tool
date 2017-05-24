// app-server.js
var express = require('express');
var hogan = require('hogan-express');
var http_module = require('http');
var bodyParser = require('body-parser');
var compression = require('compression');
var config = {};

/*import express from 'express'
import hogan from 'hogan-express'
import http_module from 'http'
import bodyParser from 'body-parser'
import compression from 'compression'
import config from './config'*/

var options = {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*');
    // Scure http header settings from https://www.smashingmagazine.com/2017/04/secure-web-app-http-headers/
    // these first 3 should be used on specific cached files not all routes
    //res.set('Cache-Control','no-cache,no-store,max-age=0,must-revalidate');
    //res.set('Pragma','no-cache');
    //res.set('Expires','-1');
    // end
    res.set('Strict-Transport-Security','max-age=31536000; includeSubDomains; preload');
    res.set('X-XSS-Protection','1;mode=block');
    res.set('X-Frame-Options','SAMEORIGIN');
    res.set('Content-Security-Policy',"script-src 'self'");
    res.set('X-Content-Type-Options','nosniff');
  }
};

var app = express();
app.use(bodyParser.json());
app.use(compression());
app.engine('html', hogan);
app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public', options));

app.set('partials', {
  header: 'partials/header',
  footer: 'partials/footer'
});

app.use((req, res, next) => {
  if (req.url === '/favicon.ico')
    return res.end()
  // Set global variables
  res.locals.year = new Date().getFullYear()
  // Set dev
  if (process.env.NODE_ENV === 'development')
    res.locals.is_dev = true;

  res.locals.navLinks = [
    { title: 'Capabilities', link: '/capabilities', active: (req.path === '/capabilities') ? 'is-active' : '' },
    { title: 'Equipment', link: '/equipment', active: (req.path === '/equipment') ? 'is-active' : '' },
    { title: 'Facilities', link: '/facilities', active: (req.path === '/facilities') ? 'is-active' : '' }
  ];

  next();
})

require('./routes.js')(app, config);

var http = http_module.Server(app)
http.listen(app.get('port'), () => {
  console.info('Listening at http://localhost:%s', app.get('port'));
})