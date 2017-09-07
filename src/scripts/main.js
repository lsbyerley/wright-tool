window.cash = require('cash-dom');
//window.jQuery = require('jquery');
var Barba = require('barba.js');

require('gsap').TweenLite;
require('gsap/CSSPlugin');
require('gsap/ScrollToPlugin');

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

	});

	function attachEquipmentTabHandlers() {
		var $equipmentTabs = Array.prototype.slice.call(document.querySelectorAll('#equipment.section .tab .label'), 0);
		if ($equipmentTabs.length > 0) {
			$equipmentTabs.forEach(function($el) {
				$el.addEventListener('click', function() {

					var $label = $(this),
						$tabContent = $label.next();

					if ($label.hasClass('is-active')) {
						TweenLite.to($tabContent, 0.75, {
							maxHeight: 0,
				            ease: Power4.easeOut
				        });
						$label.removeClass('is-active');
					} else {
						var maxHeight = $tabContent[0].scrollHeight;
						TweenLite.to($tabContent, 1, {
				            maxHeight: maxHeight,
				            ease: Power4.easeOut
				        });
						$label.addClass('is-active');
					}

				})
			})
		}
	}

	function updateActiveNavItems(currentStatus) {
		$('.navbar-item').each(function() {
			if ( $(this)[0].href === currentStatus.url) {
				$(this).addClass('is-active');
				//console.log('found!')
				return;
			}
		});
		$('.foot-link').each(function() {
			if ( $(this)[0].href === currentStatus.url) {
				$(this).addClass('is-active');
				//console.log('found!')
				return;
			}
		});
	}

	// Barba.js page transitions
	// Custom about page event for Google Map
	var aboutPage = Barba.BaseView.extend({
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
	// Custom page event for equipment tabs
	var equipmentPage = Barba.BaseView.extend({
		namespace: 'equipment',
		onEnter: function() {
			attachEquipmentTabHandlers();
		}
	})
	// Don't forget to init the view!
	aboutPage.init();
	equipmentPage.init();

	Barba.Prefetch.init();
	Barba.Pjax.start();
	Barba.Dispatcher.on('linkClicked', function(HTMLElement, MouseEvent) {

	});
	Barba.Dispatcher.on('initStateChange', function(currentStatus) {
		$('.navbar-item').removeClass('is-active');
		$('.navbar .navbar-burger').removeClass('is-active');
		$('.navbar .navbar-menu').removeClass('is-active');
		$('.foot-link').removeClass('is-active');
		updateActiveNavItems(currentStatus);
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

	// CUSTOM FADE IN/OUT TRANSITION USING GSAP
	var FadeTransition = Barba.BaseTransition.extend({
	    start: function() {
	        // As soon the loading is finished and the old page is faded out, let's fade the new page
	        Promise
	            .all([this.newContainerLoading, this.fadeOut()])
	            .then(this.fadeIn.bind(this));
	    },

	    fadeOut: function() {
	        //oldContainer is the old page that is fading out of the DOM
	         var oldContainer = $(this.oldContainer);
	         return
	            TweenLite.to(oldContainer, .75, { opacity: 0 } )
	            .promise();
	    },

	    fadeIn: function() {
			// At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
			var _this = this;
			var oldContainer = $(this.oldContainer);
			var newContainer = $(this.newContainer);

			var scrollTopTween = TweenLite.to(window, .5, {scrollTo:0, onComplete:scrollDone});

			function scrollDone() {
				//console.log('scrolldone!')
			}

			oldContainer.css( { display: 'none' } );
			TweenLite.fromTo(newContainer,  0.75, { y:10, opacity:0 }, { y:0, opacity:1 });

	        _this.done(); //Do not forget to call .done() as soon your transition is finished!
	    }
	});

	// Tell Barba to use the new Transition
	Barba.Pjax.getTransition = function() {
	   // can use different transitions for different pages
	    return FadeTransition;
	};

})(window, document, window.cash);
