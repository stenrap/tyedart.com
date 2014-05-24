/* Global Backbone App */
var app = app || {};

(function($){
	
	'use strict';
	
	app.MenuButtonView = Backbone.View.extend({
		
		events: {
			"click" : "toggleMenu"
		},
		
		toggleMenu: function() {
			this.model.toggle();
		}
		
	});
	
	app.MenuView = Backbone.View.extend({
		
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
		},
		
		render: function() {
			if (this.model.get("visible")) {
				this.$el.removeClass("displayNone");
				this.$el.addClass("displayBlock");
			}
			else {
				this.$el.removeClass("displayBlock");
				this.$el.addClass("displayNone");
			}
		}
		
	});
	
})(jQuery);