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
			case '/capabilities':
				title = "Special Project Capabilities | " + title;
				description = "Our capabilities include: Small Production Runs, Light Fabrication, Monthly Parts Contracts, Subcontract Work, Fixturing and Tooling, Castings, Machining, and Finish Processing";
				break;
			case '/equipment':
				title = "Our Equipment | " + title;
				description = "A variety of equipment including: Boring, CNC Lathes, CNC Mills, EDM, Grinders, Fabrication, Manual Lathes, Lifts, Manual Mills, Saws, and Welding";
				break;
			case '/facilities':
				title = "Our Facilities | " + title;
				description = "Our facilities in the shop include: CNC Milling, CNC Lathes, Manual Lathe, Maunual Milling and Drilling, Grinding, and Quality Control";
				break;
		}

		return {
			title: title,
			description: description
		};
	}

	function buildNavLinks(path) {
		return [
			{ title: 'Capabilities', link: '/capabilities', active: (path === '/capabilities') ? 'is-active' : '' },
			{ title: 'Equipment', link: '/equipment', active: (path === '/equipment') ? 'is-active' : '' },
			{ title: 'Facilities', link: '/facilities', active: (path === '/facilities') ? 'is-active' : '' }
		];
	}

	module.exports = config;

})();
