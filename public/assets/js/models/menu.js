/* Global Backbone App */
var app = app || {};

(function(){
	
	'use strict';
	
	app.Menu = Backbone.Model.extend({
		
		defaults: {
			visible: true
		},
		
		toggle: function() {
			this.set({visible: !this.get('visible')});
		}
		
	});
	
})();