/* Global Backbone App */
var app = app || {};

$(function () {
	
	var url = document.URL;
	if (/portfolio/.test(url))      $("#portfolio-link").addClass("selected")
	else if (/quote/.test(url))     $("#quote-link").addClass("selected")
	else if (/logoology/.test(url)) $("#logoology-link").addClass("selected")
	else if (/resources/.test(url)) $("#resources-link").addClass("selected")
	else if (/contact/.test(url))   $("#contact-link").addClass("selected")
	
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
	
	
});