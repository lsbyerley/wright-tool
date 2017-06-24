window.cash = require('cash-dom');
var Barba = require('barba.js');

var aboutPageMap = require('./googleMap.js');
var loadScript = require('./util/loadScript.js');

(function(window, document, $) {
	'use strict';

	window.wtinc = (window.wtinc) ? window.wtinc : {};

	// Toggles the responsive nav
	var $toggle = document.querySelector('.nav-toggle');
	var $menu = document.querySelector('.nav-menu');
	$toggle.addEventListener('click', function() {
		$toggle.classList.toggle('is-active');
		$menu.classList.toggle('is-active');
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
		if (link.hasClass('nav-item')) {
			$('.nav-item').removeClass('is-active');
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
