(function() {
	'use strict';

	function config(path) {
		return {
			pageMeta: buildPageMeta(path),
			navLinks: buildNavLinks(path)
		};
	}

	function buildPageMeta(path) {
		var title = "Wright Tool & Engineering Incorporated",
			description = "A service oriented company offering specialty tooling, precision piece work, and custom machine building for a variety of industries",
			namespace = "homepage"

		switch (path) {
			case '/about':
				title = "About Us | " + title;
				description = "About: Wright Tool has been in operation since 1989 and is located in a 40,000 square foot facility in the Tri-Country Industrial Park in Piney Flats, Tennessee"
				namespace = "about";
				break;
			case '/equipment':
				title = "Our Equipment | " + title;
				description = "Equipment: Boring, CNC Lathes, CNC Mills, EDM, Grinders, Fabrication, Manual Lathes, Lifts, Manual Mills, Saws, and Welding";
				namespace = "equipment";
				break;
			case '/facilities':
				title = "Our Facilities | " + title;
				description = "Facilities: CNC Milling, CNC Lathes, Manual Lathe, Maunual Milling and Drilling, Grinding, and Quality Control";
				namespace = "facilities";
				break;
		}

		return {
			title: title,
			description: description,
			namespace: namespace
		};
	}

	function buildNavLinks(path) {
		return [
			{ title: 'About Us', link: '/about', active: (path === '/about') ? 'is-active': '' },
			{ title: 'Equipment', link: '/equipment', active: (path === '/equipment') ? 'is-active' : '' },
			{ title: 'Facilities', link: '/facilities', active: (path === '/facilities') ? 'is-active' : '' }
		];
	}

	module.exports = config;

})();
