/* Global Backbone App */
var app = app || {};

$(function() {
	
	'use strict';
	
	app.PortfolioModel = Backbone.Model.extend({
		
		defaults: {
			indexAtLogo1: 0, // index of the logo in the first (i.e. top left) position
			indexAtLogo2: 1, // top right
			indexAtLogo3: 2, // bottom left
			indexAtLogo4: 3, // bottom right
			direction: ""    // direction from which logos should transition
		},
		
		result: function() {
			alert("Index at logo 1: "+this.get('indexAtLogo1')+"\n"+
				  "Index at logo 2: "+this.get('indexAtLogo2')+"\n"+
				  "Index at logo 3: "+this.get('indexAtLogo3')+"\n"+
				  "Index at logo 4: "+this.get('indexAtLogo4')+"\n");
		},
		
		prev: function() {
			this.set("direction", "left");
			
			// WYLO...Fix this logic...you shouldn't always be subtracting 4 from app.Logos.length...just the wrap-around difference...
			
			var indexAtLogo1 = this.get('indexAtLogo1') - 4 >= 0 ? this.get('indexAtLogo1') - 4 : app.Logos.length - 4;
			var indexAtLogo2 = indexAtLogo1 + 1 < app.Logos.length ? indexAtLogo1 + 1 : 0;
			var indexAtLogo3 = indexAtLogo2 + 1 < app.Logos.length ? indexAtLogo2 + 1 : 0;
			var indexAtLogo4 = indexAtLogo3 + 1 < app.Logos.length ? indexAtLogo3 + 1 : 0;
			
			this.set("indexAtLogo1", indexAtLogo1);
			this.set("indexAtLogo2", indexAtLogo2);
			this.set("indexAtLogo3", indexAtLogo3);
			this.set("indexAtLogo4", indexAtLogo4);
			
			this.result();
		},
		
		next: function() {
			this.set("direction", "right");
			
			var indexAtLogo1 = this.get('indexAtLogo1') + 4 < app.Logos.length ? this.get('indexAtLogo1') + 4 : 0;
			var indexAtLogo2 = indexAtLogo1 + 1 < app.Logos.length ? indexAtLogo1 + 1 : 0;
			var indexAtLogo3 = indexAtLogo2 + 1 < app.Logos.length ? indexAtLogo2 + 1 : 0;
			var indexAtLogo4 = indexAtLogo3 + 1 < app.Logos.length ? indexAtLogo3 + 1 : 0;
			
			this.set("indexAtLogo1", indexAtLogo1);
			this.set("indexAtLogo2", indexAtLogo2);
			this.set("indexAtLogo3", indexAtLogo3);
			this.set("indexAtLogo4", indexAtLogo4);
			
			this.result();
		}
		
	});
	
	var portfolioModel = new app.PortfolioModel();
	
	// prev
	var PrevView = Backbone.View.extend({
		
		events: {
			"click": "doPrev"
		},
		
		doPrev: function() {
			this.model.prev();
		}
		
	});
	
	new PrevView({
		model: portfolioModel,
		el: "#portfolio-nav-prev"
	});
	
});