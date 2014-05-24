/* Global Backbone App */
var app = app || {};

$(function () {
	
	'use strict';
	
	var menuModel = new app.Menu();
	
	new app.MenuButtonView({
		model: menuModel,
		el: "#menu"
	});
	
	new app.MenuView({
		model: menuModel,
		el: "#mobile-nav"
	});
	
	menuModel.toggle();
	
});