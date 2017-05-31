window.cash = require('cash-dom');
var Barba = require('barba.js');

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

	// Barba.js page transitions
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