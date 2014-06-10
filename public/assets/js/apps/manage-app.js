function showDialog(id, visible) {
	$(id).dialog(visible ? "open" : "close");
}

function showWaitDialog(message, visible) {
	$("#waitMessage").html(message);
	showDialog("#waitDialog", visible);
}

function startDrag(event, ui) {
	ui.item.startPos = ui.item.index();
}

function stopDrag(event, ui) {
	if (ui.item.startPos != ui.item.index()) {
		showWaitDialog("Updating logo position...", true);
		setTimeout(function() {
			$.ajax({
				url: '/manage/'+ui.item.startPos,
				data: 'move=1&oldPlace='+ui.item.startPos+'&newPlace='+ui.item.index(),
				type: 'PUT'
			})
				.done(function() {
					showWaitDialog("", false);
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					showWaitDialog("", false);
//					TODO: showDialog('#serverError', true); // WYLO...Make the error dialog (and show it in the other places below)...
				});
		}, 1000);
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

function initDialogs() {
	$("#waitDialog").dialog({
		autoOpen: false,
		dialogClass: "no-close",
		modal: true,
		resizable: false,
		title: "Please Wait"
	});
	
	$("#waitProgressBar").progressbar({
		value: false
	});
	
	$("#confirmDialog").dialog({
		autoOpen: false,
		dialogClass: "no-close",
		modal: true,
		resizable: false,
		title: "Please Confirm"
	});
}


/* Global Backbone App */
var app = app || {};

$(function() {
	initDragging();
	initDialogs();
	
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
			"click": "updateLogo"
		},
		
		updateLogo: function(event) {
			showWaitDialog("Updating logo caption/URL...", true);
			var id      = this.$el.closest(".logo-draggable").data("id");
			var logo    = this.collection.get(id);
			var caption = logo.get('caption');
			var url     = logo.get('url');
			setTimeout(function() {
				$.ajax({
					url: '/manage/'+id,
					data: 'update=1&caption='+caption+'&url='+url,
					type: 'PUT'
				})
					.done(function() {
						showWaitDialog("", false);
					})
					.fail(function(jqXHR, textStatus, errorThrown) {
						showWaitDialog("", false);
//						TODO: showDialog('#serverError', true);
					});
			}, 1000);
		}
		
	});
	
	app.DeleteButton = Backbone.View.extend({
		
		events: {
			"click": "deleteLogo"
		},
		
		deleteLogo: function(event) {
			var id = this.$el.closest(".logo-draggable").data("id");
			$("#confirmDialog").dialog(
				'option',
				'buttons', {
					'No': function() { showDialog("#confirmDialog", false) },
					'Yes': function() {
						showDialog("#confirmDialog", false);
						showWaitDialog("Deleting logo...", true);
						setTimeout(function() {
							$.ajax({
								url: '/manage/'+id,
								type: 'DELETE'
							})
								.done(function() {
									window.location.replace("/manage");
								})
								.fail(function(jqXHR, textStatus, errorThrown) {
									showWaitDialog("", false);
//									TODO: showDialog('#serverError', true);
								});
						}, 1000);
					}
				}
			);
			
			showDialog("#confirmDialog", true);
		},
		
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
	
	$(".update").each(function() {
		new app.UpdateButton({
			collection: app.logos,
			el: $(this)
		});
	});
	
	$(".delete").each(function() {
		new app.DeleteButton({
			collection: app.logos,
			el: $(this)
		});
	});
	
});