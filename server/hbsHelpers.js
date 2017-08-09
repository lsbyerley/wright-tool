
module.exports = function () {

	var _helpers = {};

    _helpers.isNavItemActive = function(path, link) {
        if (path === link) { return 'is-active'; }
        return '';
    };

    return _helpers;
};
