const rangeSlider = document.querySelector("#range-slider")
const song=document.getElementById('audio')
const playButton=document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const songStart=document.getElementById('song-start')
const songDuration=document.getElementById('song-duration')

rangeSlider.addEventListener('input',progressScript)
rangeSlider.addEventListener('input',songSliderControl)
rangeSlider.addEventListener('mousedown',sliderSongPause)
rangeSlider.addEventListener('mouseup',sliderSongPlay)
playButton.addEventListener('click',playSong)
pauseButton.addEventListener('click',pauseSong)

function playSong() {
    intervalo = setInterval(songTimeUpdater,50)
    song.play()
    playButton.classList.add('hide')
    pauseButton.classList.remove('hide')
}

function songTimeUpdater() {
    var currentTime = song.currentTime
    
    var minute = Math.floor((currentTime / 60) % 60)
    var second = Math.floor(currentTime % 60)
    second = (second < 10)? '0' + second : second

    songStart.innerHTML = minute + ':' + second
    rangeSlider.value = currentTime
    progressScript()
}

function pauseSong() {
    clearInterval(intervalo)
    song.pause()
    playButton.classList.remove('hide')
    pauseButton.classList.add('hide')
}


function songTime() {
    var songDurationSecs = song.duration
    rangeSlider.max = songDurationSecs

    var minute = Math.floor((songDurationSecs / 60) % 60)
    var second = Math.floor(songDurationSecs % 60)
    second = (second < 10)? '0' + second : second

    songDuration.innerHTML = minute + ':' + second

}

songTime()

function progressScript() {
    const sliderValue = rangeSlider.value;
    rangeSlider.style.background = `linear-gradient(to right, #8643FF ${(sliderValue/rangeSlider.max)*100}%, #D8D8D8 ${(sliderValue/rangeSlider.max)*100}%)`
}

function songSliderControl() {
    song.currentTime = rangeSlider.value
}

function sliderSongPause() {
    console.log('pauseclick')
    song.pause()
}

function sliderSongPlay() {
    song.play()
}