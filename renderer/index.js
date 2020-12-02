const { ipcRenderer } = require('electron')
let musicAudio = new Audio()
let allTracks = []
let currentTrack
document.getElementById('add-music-button').addEventListener('click', () => { 
  ipcRenderer.send('add-music-window')
})

const renderListHTML = (tracks) => {
  const tracksList = document.getElementById('tracksList')
  const tracksListHTML = tracks.reduce((html,track) => { 
    html += `<li class="row music-track list-group-item d-flex justify-content-between align-items-center">
      <div class="col-10">
        <i class="fa fa-music mr-2"></i>
        <b>${track.fileName}</b>
      </div>
      <div class="col-2">
        <i class="fa fa-play mr-2" data-id="${track.id}"></i>
        <i class="fa fa-trash mr-2" data-id="${track.id}"></i>
      </div>
    </li>`
    return html
  }, '')
  const emptyTrackHTML = '<div class="alert alert-primary">没有添加任何音乐</div>'
  tracksList.innerHTML = tracks.length ? `<ul class="list-group">${tracksListHTML}</ul>` : emptyTrackHTML
}

ipcRenderer.on('getTracks', (event, tracks) => { 
  allTracks = tracks
  renderListHTML(tracks)
})

document.getElementById('tracksList').addEventListener('click', (event) => { 
  event.preventDefault()
  const { dataset, classList } = event.target
  const id = dataset && dataset.id
  if (id && classList.contains('fa-play')) { 
      currentTrack = allTracks.find(track => track.id === id)
      musicAudio.src = currentTrack.path
      musicAudio.play()
      classList.replace('fa-play','fa-pause')
  }
})