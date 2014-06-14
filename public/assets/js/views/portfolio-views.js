/* Global Backbone App */
var app = app || {};
app.THUMBNAME_SIZE = 265;

$(function() {
	
	'use strict';
	
	// TODO: Come up with a way to check whether we're on a phone (where no large version of the image will be allowed by clicking a logo/caption)...
	// TODO: Then add new code for showing the full logo in all its glory...
	
	app.ThumbnailView = Backbone.View.extend({
		
		initialize: function() {
			this.caption = this.$el.children().first();
			this.image   = this.$el.children().last();
			this.listenTo(this.model, "change", this.changeImage);
		},
		
		changeImage: function() {
			var indexOfNewLogo = -1;
			var logoNumber = this.$el.attr("id");
			
			if      (logoNumber === "logo0") indexOfNewLogo = this.model.get("indexAtLogo0");
			else if (logoNumber === "logo1") indexOfNewLogo = this.model.get("indexAtLogo1");
			else if (logoNumber === "logo2") indexOfNewLogo = this.model.get("indexAtLogo2");
			else                             indexOfNewLogo = this.model.get("indexAtLogo3");
			
			var newLogo     = this.collection.at(indexOfNewLogo);
			var newCaption  = newLogo.get("caption");
			var newFilename = newLogo.get("filename");
			
			this.caption.html(newCaption);
			this.image.attr("alt", newCaption);
			this.image.attr("src", "/assets/images/thumbnails/"+newFilename);
		},
		
		events: {
			"mouseenter": "showCaption",
			"mouseleave": "hideCaption"
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
			if      (eventLocation === "left")  TweenLite.from(this.caption, 0.38, {left:"-265px"});
			else if (eventLocation === "top")   TweenLite.from(this.caption, 0.38, {top:"-265px"});
			else if (eventLocation === "right") TweenLite.from(this.caption, 0.38, {left:"265px"});
			else                                TweenLite.from(this.caption, 0.38, {top:"265px"});
			this.caption.css("visibility", "visible");
		},
		
		hideCaption: function(event) {
			var eventLocation = this.getEventLocation(event);
			var top  = null;
			var left = null;
			if  (eventLocation === "left") {
				top  = "0px";
				left = "-265px";
			} else if (eventLocation === "top") {
				top  = "-265px";
				left = "0px";
			} else if (eventLocation === "right") {
				top  = "0px";
				left = "256px";
			} else {
				top  = "265px";
				left = "0px";
			}
			
			TweenLite.to(this.caption,
						0.38,
						{top:top,
						left:left,
						onCompleteParams:[this.caption],
						onComplete:function(caption) {
							caption.css("visibility", "hidden");
							caption.css("top", "0px");
							caption.css("left", "0px");
						}});
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