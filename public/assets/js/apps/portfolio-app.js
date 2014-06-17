/* Global Backbone App */
var app = app || {};

$(function() {
	
	'use strict';
	
	app.PortfolioModel = Backbone.Model.extend({
		
		defaults: {
			indexAtLogo0: 0, // index of the logo in the first (i.e. top left) position
			indexAtLogo1: 1, // top right
			indexAtLogo2: 2, // bottom left
			indexAtLogo3: 3, // bottom right
			indexOfLargeLogo: -1
		},
		
		setNewIndices: function(newIndexAtLogo0) {
			var newIndexAtLogo1 = newIndexAtLogo0 + 1 < app.Logos.length ? newIndexAtLogo0 + 1 : 0;
			var newIndexAtLogo2 = newIndexAtLogo1 + 1 < app.Logos.length ? newIndexAtLogo1 + 1 : 0;
			var newIndexAtLogo3 = newIndexAtLogo2 + 1 < app.Logos.length ? newIndexAtLogo2 + 1 : 0;
			
			this.set({indexAtLogo0:newIndexAtLogo0, indexAtLogo1:newIndexAtLogo1, indexAtLogo2:newIndexAtLogo2, indexAtLogo3:newIndexAtLogo3});
			this.trigger('logosChanged');
		},
		
		prev: function() {
			var newIndexAtLogo0 = this.get('indexAtLogo0') - 4;
			
			if (newIndexAtLogo0 < 0) {
				newIndexAtLogo0 = app.Logos.length + newIndexAtLogo0;
			}
			
			this.setNewIndices(newIndexAtLogo0);
		},
		
		next: function() {
			var newIndexAtLogo0 = this.get('indexAtLogo0') + 4;
			
			if (newIndexAtLogo0 >= app.Logos.length) {
				newIndexAtLogo0 = newIndexAtLogo0 - app.Logos.length;
			}
			
			this.setNewIndices(newIndexAtLogo0);
		},
		
		setLargeLogo: function(indexOfLogo) {
			if (this.get("indexOfLargeLogo") !== indexOfLogo) {
				this.set("indexOfLargeLogo", indexOfLogo);
				this.trigger("largeLogoChanged");
			}
		}
		
	});
	
	var portfolioModel = new app.PortfolioModel();
	
	new app.ThumbnailView({
		collection: app.Logos,
		model: portfolioModel,
		el: "#logo0"
	});

	new app.ThumbnailView({
		collection: app.Logos,
		model: portfolioModel,
		el: "#logo1"
	});

	new app.ThumbnailView({
		collection: app.Logos,
		model: portfolioModel,
		el: "#logo2"
	});

	new app.ThumbnailView({
		collection: app.Logos,
		model: portfolioModel,
		el: "#logo3"
	});
	
	new app.PrevButtonView({
		model: portfolioModel,
		el: "#portfolio-nav-prev"
	});
	
	new app.NextButtonView({
		model: portfolioModel,
		el: "#portfolio-nav-next"
	});
	
	new app.LargeLogoView({
		collection: app.Logos,
		model: portfolioModel,
		el: "#large-logo-back"
	});
	
});