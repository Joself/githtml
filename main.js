const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
	mainWindow = new BrowserWindow({frame: false});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('closed', function(){
		app.quit();
	});
});

var ipc = require('electron').ipcMain;
const { exec, execSync } = require('child_process');
var title = '';
var time = 0;
var played = 0;
var songStart = 0;

ipc.on('getSong', function(event){
  exec('playerctl status', (error, stdout) => {
    var d = new Date();
    curTime = d.getSeconds();

    if (`${stdout}` == 'Playing\n' && curTime > time) {
      played = Date.now() - songStart;
      event.sender.send('status', played)
      console.log(Math.floor(played / 1000));
    } else if (`${stdout}` != 'Playing\n') {
      return;
    }});

  exec('playerctl metadata xesam:title', (error, stdout) => {
    event.sender.send('title', `${stdout}`);

    if (`${stdout}` != title) {
      title = `${stdout}`
      songStart = Date.now();

      exec('playerctl metadata xesam:artist', (error, stdout) => {
        event.sender.send('artist', `${stdout}`);
      });

      exec('playerctl metadata mpris:artUrl', (error, stdout) => {
        var artUrl = `${stdout}`.substring(31);
        execSync('/home/joseph/html/calendar/dlAlbumArt.sh ' + artUrl);
        console.log('Art retrieved')
        artUrl = 'albumArt/' + artUrl;
        event.sender.send('art', artUrl);
      });

      exec('playerctl metadata mpris:length', (error, stdout) => {
        event.sender.send('total', `${stdout}`);
      });
    }
  });
});