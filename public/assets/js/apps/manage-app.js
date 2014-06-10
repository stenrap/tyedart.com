function showDialog(id, visible) {
	$(id).dialog(visible ? "open" : "close");
}

function startDrag(event, ui) {
	ui.item.startPos = ui.item.index();
}

function stopDrag(event, ui) {
	if (ui.item.startPos != ui.item.index()) {
		// TODO: Show a waiting dialog here?
		$.ajax({
			url: '/manage/'+ui.item.startPos,
			data: 'move=1&oldPlace='+ui.item.startPos+'&newPlace='+ui.item.index(),
			type: 'PUT'
		})
			.done(function() {
//				showDialog('#pleaseWait', false);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
//				showDialog('#pleaseWait', false);
//				showDialog('#serverError', true);
			});
	}
}

function initDragging() {
	$(".logo-section").sortable({
		axis: "y",
		scroll: true,
		scrollSensitivity: 100,
		start: startDrag,
		stop: stopDrag,
		tolerance: "pointer"
	});
}

/* Global Backbone App */
var app = app || {};

$(function() {
	initDragging();
	
	app.CaptionInput = Backbone.View.extend({
		
		events: {
			"keyup": "updateCaptionModel"
		},
		
		updateCaptionModel: function(event) {
			var logo = this.collection.get(this.$el.closest(".logo-draggable").data("id"));
			logo.set({caption: this.$el.val()});
		}
		
	});
	
	app.UrlInput = Backbone.View.extend({
		
		events: {
			"keyup": "updateUrlModel"
		},
		
		updateUrlModel: function(event) {
			var logo = this.collection.get(this.$el.closest(".logo-draggable").data("id"));
			logo.set({url: this.$el.val()});
		}
		
	});
	
	app.UpdateButton = Backbone.View.extend({
		
		events: {
			"click": "confirmUpdateLogo"
		},
		
		confirmUpdateLogo: function(event) {
			// WYLO...Time to get some jQuery dialogs going...
		}
		
		updateLogo: function(event) {
			
		}
		
	});
	
	$(".caption").each(function() {
		new app.CaptionInput({
			collection: app.logos,
			el: $(this)
		});
	});
	
	$(".url").each(function() {
		new app.UrlInput({
			collection: app.logos,
			el: $(this)
		});
	});
	
});