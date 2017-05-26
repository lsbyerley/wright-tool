//window.jQuery = require('jquery');
window.cash = require('cash-dom');

(function(window, document, $) {
	'use strict';

	window.wtinc = (window.wtinc) ? window.wtinc : {};

	$(document).ready(function() {

		var $toggle = $('#header .nav-toggle');
		var $menu = $('#header .nav-menu');

		$toggle.on('click', function() {
			$(this).toggleClass('is-active');
			$menu.toggleClass('is-active');
		});

	});
	
})(window, document, window.cash);