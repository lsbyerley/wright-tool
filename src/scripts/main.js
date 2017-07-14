window.cash = require('cash-dom');
var Barba = require('barba.js');

var aboutPageMap = require('./googleMap.js');
var loadScript = require('./util/loadScript.js');

(function(window, document, $) {
	'use strict';

	window.wtinc = (window.wtinc) ? window.wtinc : {};

	document.addEventListener('DOMContentLoaded', function () {

	  // Get all "nav-burger" elements
	  var $navBurgers = Array.prototype.slice.call(document.querySelectorAll('.nav-burger'), 0);

	  // Check if there are any nav burgers
	  if ($navBurgers.length > 0) {

	    // Add a click event on each of them
	    $navBurgers.forEach(function ($el) {
	      $el.addEventListener('click', function() {

	        // Get the target from the "data-target" attribute
	        var target = $el.dataset.target;
	        var $target = document.getElementById(target);

	        // Toggle the class on both the "nav-burger" and the "nav-menu"
	        $el.classList.toggle('is-active');
	        $target.classList.toggle('is-active');

	      });
	    });
	  }

	});

	// Barba.js page transitions
	// Custom about page event for Google Map
	var Aboutpage = Barba.BaseView.extend({
		namespace: 'about',
		onEnter: function() {
			if (!window.google) {
				loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2KN3R37wRR-idz5kg6y0jhTZVS_qTQL8', function () {
					 aboutPageMap.init();
			    });
			} else {
				aboutPageMap.init();
			}
		}
	});
	// Don't forget to init the view!
	Aboutpage.init();

	Barba.Pjax.start();
	Barba.Dispatcher.on('linkClicked', function(HTMLElement, MouseEvent) {
		var link = $(HTMLElement);
		if (link.hasClass('navbar-item')) {
			$('.navbar-item').removeClass('is-active');
			link.addClass('is-active');
		}
	});
	Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {
		// For Google Analytics tracking, make sure ga() exists first.
        if ( typeof ga === 'function' ) {
            ga('set', {
                page: window.location.pathname,
                title: document.title
            });
            ga('send', 'pageview');
    	}
	});

})(window, document, window.cash);
