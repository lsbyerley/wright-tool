window.cash = require('cash-dom');
//window.jQuery = require('jquery');
var Barba = require('barba.js');

var aboutPageMap = require('./googleMap.js');
var loadScript = require('./util/loadScript.js');

(function(window, document, $) {
	'use strict';

	window.wtinc = (window.wtinc) ? window.wtinc : {};

	// Toggles the responsive nav
	document.addEventListener('DOMContentLoaded', function() {

		// Get all "navbar-burger" elements
		var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
		// Check if there are any nav burgers
		if ($navbarBurgers.length > 0) {
			// Add a click event on each of them
			$navbarBurgers.forEach(function($el) {
				$el.addEventListener('click', function() {
					// Get the target from the "data-target" attribute
					var target = $el.dataset.target;
					var $target = document.getElementById(target);
					// Toggle the class on both the "navbar-burger" and the "navbar-menu"
					$el.classList.toggle('is-active');
					$target.classList.toggle('is-active');
				});
			});
		}

		var $equipmentTabs = Array.prototype.slice.call(document.querySelectorAll('#equipment.section .tab .label'), 0);
		if ($equipmentTabs.length > 0) {
			$equipmentTabs.forEach(function($el) {
				$el.addEventListener('click', function() {
					$el.classList.toggle('is-active');
				})
			})
		}

	});

	// Barba.js page transitions
	// Custom about page event for Google Map
	var Aboutpage = Barba.BaseView.extend({
		namespace: 'about',
		onEnter: function() {
			if (!window.google) {
				loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2KN3R37wRR-idz5kg6y0jhTZVS_qTQL8', function() {
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
			$('.navbar .navbar-burger').toggleClass('is-active');
			$('.navbar .navbar-menu').toggleClass('is-active');
		}
	});
	Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {
		// For Google Analytics tracking, make sure ga() exists first.
		if (typeof ga === 'function') {
			ga('set', {
				page: window.location.pathname,
				title: document.title
			});
			ga('send', 'pageview');
		}
	});

})(window, document, window.cash);
