
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
			data: 'oldPlace='+ui.item.startPos+'&newPlace='+ui.item.index(),
			type: 'PUT'
		})
			.done(function() {
//				showDialog('#pleaseWait', false);
				alert('Success!');
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
//				showDialog('#pleaseWait', false);
//				showDialog('#serverError', true);
				alert('Error...'+errorThrown);
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

$(function() {
	initDragging();
});