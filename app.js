'use strict';
const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow(
        {
            // Window Settings
            backgroundColor: '#252526',
            // frame: false,
            resizable: false,
            // titleBarStyle: 'hidden-inset',
            title: "Minecraft Username Checker",

            // Other
            sandbox: true,

            // Size Settings
            height: 600,
            width: 650
        });
    win.setMenu(null);

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'public/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// let client = require('electron-connect').client;
// client.create(win);

// const rl = readline.createInterface({
//     input: fs.createReadStream('userlist.txt')
// });

// rl.on('line', (line) =>{
//     request({
//         url: "https://api.mojang.com/users/profiles/minecraft/" + line,
//         json: true
//     }, function (error, response, body){
//         if(!error && response.statusCode === 204){
//             console.log("Username: %s | UUID: N/A | Paid: FALSE", line);
//         }
//     })
// })
