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
			direction: ""    // direction from which logos should transition
		},
		
		result: function() {
			alert("Index at logo 0: "+this.get('indexAtLogo0')+"\n"+
				  "Index at logo 1: "+this.get('indexAtLogo1')+"\n"+
				  "Index at logo 2: "+this.get('indexAtLogo2')+"\n"+
				  "Index at logo 3: "+this.get('indexAtLogo3')+"\n");
		},
		
		prev: function() {
			this.set("direction", "left");
			
			var indexAtLogo0 = this.get('indexAtLogo0') - 4;
			
			if (indexAtLogo0 < 0) {
				indexAtLogo0 = app.Logos.length + indexAtLogo0;
			}
			
			var indexAtLogo1 = indexAtLogo0 + 1 < app.Logos.length ? indexAtLogo0 + 1 : 0;
			var indexAtLogo2 = indexAtLogo1 + 1 < app.Logos.length ? indexAtLogo1 + 1 : 0;
			var indexAtLogo3 = indexAtLogo2 + 1 < app.Logos.length ? indexAtLogo2 + 1 : 0;
			
			this.set("indexAtLogo0", indexAtLogo0);
			this.set("indexAtLogo1", indexAtLogo1);
			this.set("indexAtLogo2", indexAtLogo2);
			this.set("indexAtLogo3", indexAtLogo3);
			
			this.result();
		},
		
		next: function() {
			this.set("direction", "right");
			
			var indexAtLogo0 = this.get('indexAtLogo0') + 4;
			
			if (indexAtLogo0 >= app.Logos.length) {
				indexAtLogo0 = indexAtLogo0 - app.Logos.length;
			}
			
			var indexAtLogo1 = indexAtLogo0 + 1 < app.Logos.length ? indexAtLogo0 + 1 : 0;
			var indexAtLogo2 = indexAtLogo1 + 1 < app.Logos.length ? indexAtLogo1 + 1 : 0;
			var indexAtLogo3 = indexAtLogo2 + 1 < app.Logos.length ? indexAtLogo2 + 1 : 0;
			
			this.set("indexAtLogo0", indexAtLogo0);
			this.set("indexAtLogo1", indexAtLogo1);
			this.set("indexAtLogo2", indexAtLogo2);
			this.set("indexAtLogo3", indexAtLogo3);
			
			this.result();
		}
		
	});
	
	var portfolioModel = new app.PortfolioModel();
	
	new app.ThumbnailView({
		model: portfolioModel,
		el: "#logo0"
	});

	new app.ThumbnailView({
		model: portfolioModel,
		el: "#logo1"
	});

	new app.ThumbnailView({
		model: portfolioModel,
		el: "#logo2"
	});

	new app.ThumbnailView({
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
	
});