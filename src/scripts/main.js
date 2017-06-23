window.cash = require('cash-dom');
var Barba = require('barba.js');

var aboutPageMap = require('./googleMap.js');

(function(window, document, $) {
	'use strict';

	window.wtinc = (window.wtinc) ? window.wtinc : {};

	// Toggles the responsive nav
	var $toggle = $('#header .nav-toggle');
	var $menu = $('#header .nav-menu');
	$toggle.on('click', function() {
		$(this).toggleClass('is-active');
		$menu.toggleClass('is-active');
	});

	//vanilla js toggle
	/*var burger = document.querySelector('.nav-toggle');
	var menu = document.querySelector('.nav-menu');
	burger.addEventListener('click', function() {
		burger.classList.toggle('is-active');
		menu.classList.toggle('is-active');
	});*/

	// Barba.js page transitions
	// Custom about page event for Google Map
	var Aboutpage = Barba.BaseView.extend({
		namespace: 'about',
		onEnter: function() {
			// The new Container is ready and attached to the DOM.
			if (!window.google) {

			}
		},
		onEnterCompleted: function() {
		  	// The Transition has just finished.
			if (typeof aboutPageMap === "object" && typeof window.google === "object") {
				aboutPageMap.init();
			}
		},
		onLeave: function() {
		  	// A new Transition toward a new page has just started.
		},
		onLeaveCompleted: function() {
		  	// The Container has just been removed from the DOM.
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
        if ( typeof ga === "function" ) {
            ga('set', {
                page: window.location.pathname,
                title: document.title
            });
            ga('send', 'pageview');
    	}
	});

})(window, document, window.cash);
