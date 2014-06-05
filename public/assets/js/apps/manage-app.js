function startDrag(event, ui) {
	ui.item.startPos = ui.item.index();
}

function stopDrag(event, ui) {
	if (ui.item.startPos != ui.item.index()) {
		alert("Item moved from index " + ui.item.startPos + " to index " + ui.item.index());
		// WYLO: Send the new place to the server via ajax...then add support for update/delete buttons...
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