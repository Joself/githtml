function progress() {
	for (var i = 1; i < 10; i++) {
		j =	'g' + i;
		var text = document.getElementById(j).firstElementChild.innerHTML;
		width = Math.floor(getTextWidth(text, '1.875vh Varela Round'));
		document.getElementById(j).style.width = width + 'px';
	}
}

function getTextWidth(text, font) {
	var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
	var context = canvas.getContext('2d');
	context.font = font;
	var metrics = context.measureText(text);
	return metrics.width;
}