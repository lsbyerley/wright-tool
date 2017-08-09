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
			description = "A service oriented company offering specialty tooling, precision piece work, and custom machine building for a variety of industries";

		switch (path) {
			case '/about':
				title = "About Us | " + title;
				description = "About: Wright Tool has been in operation since 1989 and is located in a 40,000 square foot facility in the Tri-Country Industrial Park in Piney Flats, Tennessee"
				break;
			case '/equipment':
				title = "Our Equipment | " + title;
				description = "Equipment: Boring, CNC Lathes, CNC Mills, EDM, Grinders, Fabrication, Manual Lathes, Lifts, Manual Mills, Saws, and Welding";
				break;
			case '/facilities':
				title = "Our Facilities | " + title;
				description = "Facilities: CNC Milling, CNC Lathes, Manual Lathe, Maunual Milling and Drilling, Grinding, and Quality Control";
				break;
		}

		return {
			title: title,
			description: description
		};
	}

	function buildNavLinks(path) {
		return [
			{ title: 'Facilities', link: '/facilities' },
			{ title: 'Equipment', link: '/equipment' },
			{ title: 'About', link: '/about' }
		];
	}

	module.exports = config;

})();
