//musicbox section
let audio = document.querySelector('.audio')
const cover = document.querySelector('.musicbox_img')
const songName = document.querySelector('.musicbox_text--primary-bold')
const artist = document.querySelector('.musicbox_text--secondary-regular')
const rangeSlider = document.querySelector("#range-slider")
const playButton= document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const songStart= document.getElementById('song-start')
const songDuration= document.getElementById('song-duration')
const backBtn = document.getElementById('back-button')
const forwardBtn = document.getElementById('forward-button')
const nextBtn = document.getElementById('next-song')
const previousBtn = document.getElementById('previous-song')
let songIndex = 0

rangeSlider.addEventListener('input',progressScript)
rangeSlider.addEventListener('input',songSliderControl)
rangeSlider.addEventListener('mousedown',sliderSongPause)
rangeSlider.addEventListener('mouseup',sliderSongPlay)
playButton.addEventListener('click',playSong)
pauseButton.addEventListener('click',pauseSong)
backBtn.addEventListener('click', rewindSong)
forwardBtn.addEventListener('click', forwardSong)
previousBtn.addEventListener('click', previousSong)
nextBtn.addEventListener('click',nextSong)

songs = [
    {
        name: 'PHOTOGRAPH',
        artist: 'Ed Sheeran',
        img: 'https://i1.sndcdn.com/artworks-000300249612-tt0oxz-t500x500.jpg',
        file: './assets/Photograph.mp3'
    },
    {
        name: 'GRAMERCY PARK',
        artist: 'Alicia Keys',
        img: 'https://i1.sndcdn.com/artworks-yYK9dMwL4tIBz4Em-pQke7Q-t500x500.jpg',
        file: './assets/Gramercy Park.mp3'
    },
    {
        name: 'SOMEONE YOU LOVED',
        artist: 'Lewis Capaldi',
        img: 'https://i1.sndcdn.com/artworks-000553030245-5ydfwj-t500x500.jpg',
        file: './assets/Someone You Loved.mp3'
    },
    {
        name: 'ANGELS LIKE YOU',
        artist: 'Miley Cyrus',
        img: 'https://i1.sndcdn.com/artworks-NQS1EKtY1n1fDUVz-zzpYlQ-t500x500.jpg',
        file: './assets/Angels Like You.mp3'
    },
]

loadSongHtml()

function loadSongHtml () {
    cover.src = songs[songIndex].img
    songName.innerHTML = songs[songIndex].name
    artist.innerHTML = songs[songIndex].artist
    audio.src = songs[songIndex].file
    songStart.innerHTML = '0:00'
    
    setTimeout(songTime,200)
}

function playSong() {
    intervalo = setInterval(songTimeUpdater,50)
    checkEnded = setInterval(automaticNextSong,50)
    audio.play()
    playButton.classList.add('hide')
    pauseButton.classList.remove('hide')
}

function songTimeUpdater() {
    let currentTime = audio.currentTime
    
    let minute = Math.floor((currentTime / 60) % 60)
    let second = Math.floor(currentTime % 60)
    second = (second < 10)? '0' + second : second

    songStart.innerHTML = minute + ':' + second
    rangeSlider.value = currentTime
    progressScript()
}

function pauseSong() {
    clearInterval(intervalo)
    audio.pause()
    playButton.classList.remove('hide')
    pauseButton.classList.add('hide')
}

function songTime() {
    
    let songDurationSecs = audio.duration
    rangeSlider.max = songDurationSecs

    let minute = Math.floor((songDurationSecs / 60) % 60)
    let second = Math.floor(songDurationSecs % 60)
    second = (second < 10)? '0' + second : second

    songDuration.innerHTML = minute + ':' + second

}

function progressScript() {
    const sliderValue = rangeSlider.value;
    rangeSlider.style.background = `linear-gradient(to right, #8643FF ${(sliderValue/rangeSlider.max)*100}%, #D8D8D8 ${(sliderValue/rangeSlider.max)*100}%)`
}

function songSliderControl() {
    audio.currentTime = rangeSlider.value
}

function sliderSongPause() {
    audio.pause()
}

function sliderSongPlay() {
    if(playButton.classList.contains('hide')) {
        audio.play()
    }
}

function rewindSong() {
    audio.currentTime -= 10
}

function forwardSong() {
    audio.currentTime += 10
}

function previousSong() {
    audio.pause()
    songIndex > 0 ? songIndex = songIndex - 1 : songIndex = 0
    loadSongHtml()
    playSong()
}

function nextSong() {
    audio.pause()
    songIndex < songs.length - 1 ? songIndex = songIndex + 1 : songIndex = songs.length - 1
    loadSongHtml()
    playSong()
}

function automaticNextSong() {
    if (audio.ended) {
        songIndex < songs.length - 1 ? songIndex = songIndex + 1 : songIndex = 0
        loadSongHtml()
        playSong()
    }
}