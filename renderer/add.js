const { ipcRenderer } = require('electron')
// const { $ } = require('./helper')

document.getElementById('select-music').addEventListener('click', () => {
  ipcRenderer.send('open-music-file')
})