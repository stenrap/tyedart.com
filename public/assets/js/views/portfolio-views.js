/* Global Backbone App */
var app = app || {};
app.THUMBNAME_SIZE = 265;
app.LoadedLogos = {};

$(function() {
	
	'use strict';
	
	app.ThumbnailView = Backbone.View.extend({
		
		initialize: function() {
			this.caption = this.$el.children().first();
			this.image   = this.$el.children().last();
			this.listenTo(this.model, "logosChanged", this.changeImage);
			$(".visit-link").on('click', function(event){event.stopPropagation();});
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
			var newUrl      = newLogo.get("url");
			var newFilename = newLogo.get("filename");
			
			if (newUrl) {
				newCaption += '<a href="'+newUrl+'" target="_blank" class="visit-link">website</a>';
			}
			
			this.caption.html(newCaption);
			this.image.attr("alt", newCaption);
			this.image.attr("src", "/assets/images/thumbnails/"+newFilename);
		},
		
		events: function() {
			var eventHash = {};
			eventHash["mouseenter"] = "showCaption";
			eventHash["mouseleave"] = "hideCaption";
			
			if (window.screen.availWidth > 720 && window.screen.availHeight > 520) {
				eventHash["click"] = "thumbnailClicked";
			}
			
			return eventHash;
		},
		
		thumbnailClicked: function() {
			var indexOfLogo = -1;
			var logoNumber = this.$el.attr("id");
			
			if      (logoNumber === "logo0") indexOfLogo = this.model.get("indexAtLogo0");
			else if (logoNumber === "logo1") indexOfLogo = this.model.get("indexAtLogo1");
			else if (logoNumber === "logo2") indexOfLogo = this.model.get("indexAtLogo2");
			else                             indexOfLogo = this.model.get("indexAtLogo3");
			
			this.model.setLargeLogo(indexOfLogo);
		},
		
		getEventLocation: function(event) {
			var pos = this.$el.offset();
			var relativeX = event.pageX - pos.left;
			var relativeY = event.pageY - pos.top;
			
//			console.clear();
//			console.log("top:    "+relativeY);
//			console.log("right:  "+(app.THUMBNAME_SIZE - relativeX));
//			console.log("bottom: "+(app.THUMBNAME_SIZE - relativeY));
//			console.log("left:   "+relativeX);
			
			if (relativeX < (app.THUMBNAME_SIZE / 2)) {
				if (relativeY < (app.THUMBNAME_SIZE / 2)) {
					if (relativeX < relativeY) {
						return "left";
					} else {
						return "top";
					}
				} else {
					if ((app.THUMBNAME_SIZE - relativeY) < relativeX) {
						console.log(1);
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
						console.log(2);
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
				left = "265px";
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
	
	app.LargeLogoView = Backbone.View.extend({
		
		initialize: function() {
			this.caption  = "";
			this.filename = "";
			this.logoContainerWidth  = 0;
			this.logoContainerHeight = 0;
			this.listenTo(this.model, "largeLogoChanged", this.getLargeLogo);
		},
		
		setContainerSize: function() {
			var border = 12;
			var margin = 20;
			this.logoContainerWidth  = app.LoadedLogos[this.filename].width;
			this.logoContainerHeight = app.LoadedLogos[this.filename].height;
			
			var scale = 1.0;
			
			while (this.logoContainerWidth  >= window.innerWidth - margin - border  ||
				   this.logoContainerHeight >= window.innerHeight - margin - border) {
				this.logoContainerWidth  *= scale;
				this.logoContainerHeight *= scale;
				scale -= 0.01;
				console.log("scale is now: "+scale);
				if (this.logoContainerWidth <= 500 || this.logoContainerHeight <= 500) {
					break;
				}
			}
		},
		
		animateLargeLogoIn: function() {
			this.setContainerSize();
			
			console.log("(scaled) Dimensions are: "+this.logoContainerWidth+" x "+this.logoContainerHeight);
			
			$("#large-logo-container").css("width",  this.logoContainerWidth);
			$("#large-logo-container").css("height", this.logoContainerHeight);
			$(app.LoadedLogos[this.filename]).attr("id", "large-logo");
			
			TweenLite.to($("#large-logo-container"), 0, {scale:1});
			
			TweenLite.from($("#large-logo-container"),
							0.38,
							{scale:0,
							onCompleteParams:[$("#loader-back"),
							                  $("#large-logo-container"),
							                  app.LoadedLogos[this.filename],
							                  $("#large-logo-close"),
							                  $("#large-logo-back"),
							                  this.animateLargeLogoOut],
							onComplete:function(loader, container, logo, close, back, out) {
								loader.hide();
								container.append(logo);
								close.click(out);
								back.click(out);
							}});
			
			$("#large-logo-container").show();
		},
		
		animateLargeLogoOut: function() {
			$("#large-logo-close, #large-logo-back").off('click');
			TweenLite.to($("#large-logo-container"),
					0.38,
					{scale:0,
					onCompleteParams:[$("#large-logo-back")],
					onComplete:function(back) {
						back.hide();
					}});
		},
		
		getLargeLogo: function() {
			var index     = this.model.get("indexOfLargeLogo");
			var logo      = this.collection.at(index);
			this.caption  = logo.get("caption");
			this.filename = logo.get("filename");
			var view      = this;
			
			$("#large-logo-back").show();
			$("#loader-back").show();
			
			// Load the appropriate logo if it's not already loaded...
			if ($("#large-logo").length) {
				$("#large-logo").remove();
			}
			
			if (app.LoadedLogos[this.filename]) {
				// Add the image
				console.log("(cached) Dimensions are: "+app.LoadedLogos[this.filename].width+" x "+app.LoadedLogos[this.filename].height);
				view.animateLargeLogoIn();
				return;
			}
			
			app.LoadedLogos[this.filename] = new Image();
			app.LoadedLogos[this.filename].onload = function() {
				console.log("(loaded) Dimensions are: "+this.width+" x "+this.height);
				view.animateLargeLogoIn();
			}
			app.LoadedLogos[this.filename].alt = this.caption;
			app.LoadedLogos[this.filename].src = "/assets/images/desktop/"+this.filename;
		}
		
	});
	
});