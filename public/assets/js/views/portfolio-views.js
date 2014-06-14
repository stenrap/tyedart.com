/* Global Backbone App */
var app = app || {};
app.THUMBNAME_SIZE = 265;

$(function() {
	
	'use strict';
	
	app.ThumbnailView = Backbone.View.extend({
		
		events: {
			"mouseover": "showCaption",
			"mouseout":  "hideCaption"
		},
		
		getEventLocation: function(event) {
			var pos = this.$el.position();
			var relativeX = event.pageX - pos.left;
			var relativeY = event.pageY - pos.top;
			
			if (relativeX < (app.THUMBNAME_SIZE / 2)) {
				if (relativeY < (app.THUMBNAME_SIZE / 2)) {
					if (relativeX < relativeY) {
						return "left";
					} else {
						return "top";
					}
				} else {
					if ((app.THUMBNAME_SIZE - relativeY) < relativeX) {
						return "bottom";
					} else {
						return "left";
					}
				}
			} else {
				if (relativeY > (app.THUMBNAME_SIZE / 2)) {
					if (relativeX > relativeY) {
						return "right";
					} else {
						return "bottom";
					}
				} else {
					if ((app.THUMBNAME_SIZE - relativeX) < relativeY) {
						return "right";
					} else {
						return "top";
					}
				}
			}
		},
		
		showCaption: function(event) {
			var eventLocation = this.getEventLocation(event);
			console.log("Came in from the "+eventLocation);
		},
		
		hideCaption: function(event) {
			var eventLocation = this.getEventLocation(event);
			console.log("Went out from the "+eventLocation);
		}
		
	});
	
	app.PrevButtonView = Backbone.View.extend({
		
		events: {
			"click": "doPrev"
		},
		
		doPrev: function() {
			this.model.prev();
		}
		
	});
	
	app.NextButtonView = Backbone.View.extend({
		
		events: {
			"click": "doNext"
		},
		
		doNext: function() {
			this.model.next();
		}
		
	});
	
});