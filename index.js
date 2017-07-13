const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
    
    // ShadowPlay only works on windows.
    if (process.platform == 'darwin') {
        app.quit();
    }

    win = new BrowserWindow({ width: 500, height: 200, icon: "favicon.ico" })

    win.setMenu(null);


    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', () =>{
    globalShortcut.register('Alt+F11', () => {
        win.webContents.executeJavaScript("document.getElementById(\"audiobutton\").click()");
    })
    createWindow(); 
    
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
