const { app, BrowserWindow , ipcMain } = require('electron')

app.on('ready', () => { 
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true
    }
  })
  mainWindow.loadFile('index.html')
  ipcMain.on('message', (event,arg) => { 
    console.log(arg)
    event.sender.send('reply','hello from sender')
  })
})