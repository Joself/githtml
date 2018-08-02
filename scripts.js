function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var day = today.getDay();
    var date = today.getDate();
    var month = today.getMonth();
    m = checkTime(m);
    day = stringDay(day);
    month = stringMonth(month);
    document.getElementById('hr').innerHTML = h;
    document.getElementById('min').innerHTML = m;
    document.getElementById('date').innerHTML = day + ', ' + date.toString() + ' ' + month;
    songInfo();
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = '0' + i};  // add zero in front of numbers < 10
    return i;
}

function stringDay(i) {
	if 		(i == 0) {i = 'Sun'}
	else if (i == 1) {i = 'Mon'}
	else if (i == 2) {i = 'Tue'}
	else if (i == 3) {i = 'Wed'}
	else if (i == 4) {i = 'Thu'}
	else if (i == 5) {i = 'Fri'}
	else if (i == 6) {i = 'Sat'};
	return i;
}

function stringMonth(i) {
	if 		(i == 0)  {i = 'Jan'}
	else if (i == 1)  {i = 'Feb'}
	else if (i == 2)  {i = 'Mar'}
	else if (i == 3)  {i = 'Apr'}
	else if (i == 4)  {i = 'May'}
	else if (i == 5)  {i = 'Jun'}
	else if (i == 6)  {i = 'Jul'}
	else if (i == 7)  {i = 'Aug'}
	else if (i == 8)  {i = 'Sep'}
	else if (i == 9)  {i = 'Oct'}
	else if (i == 10) {i = 'Nov'}
	else if (i == 11) {i = 'Dec'};
	return i;
}

var ipc = require('electron').ipcRenderer;

function songInfo() {
    ipc.send('getSong');

	ipc.on('title', function(event, title){
        document.getElementById('songName').innerHTML = title;
    })
    
    ipc.on('artist', function(event, artist){
    	document.getElementById('artistName').innerHTML = artist;
    })

    ipc.on('art', function(event, art){
    	document.getElementById('imgVisible').src = art;
    	document.getElementById('imgBlur').src = art;
    })

    ipc.on('total', function(event, total){
        total = Math.floor(total / 1000000);
        mins = Math.floor(total / 60);
        secs = checkTime(total - mins * 60);
        document.getElementById('total').innerHTML = mins + ':' + secs;
    })

    ipc.on('status', function(event, played){
        played = Math.floor(played / 1000);
        minutes = Math.floor(played / 60);
        seconds = played - minutes * 60;
        progress = played / (mins * 60 + secs);
        document.getElementById('seekForeground').style.width = progress * 10.68 + 'vw';
        seconds = checkTime(seconds);
        document.getElementById('passed').innerHTML = minutes + ':' + seconds;
    })
};