/* Global Backbone App */
var app = app || {};

$(function() {
	
	'use strict';
	
	$("input[name='first']").focus();
	
	var validationOptions = {
		errorPlacement: $.noop,
		highlight: function(element){
			$(element).css("border-color", "#880000");
			$(element).prev().css({"color": "#880000", "opacity": "1.0"});
		},
		unhighlight: function(element) {
			$(element).css("border-color", "#555555");
			$(element).prev().css({"color": "#ffffff", "opacity": "0.33"});
		},
		rules: {
			first: "required",
			last:  "required",
			phone: "required",
			email: {
				required: true,
				email: true
			},
			work: "required"
		}
	};
	
	$("#quote-form").validate(validationOptions);
	
});