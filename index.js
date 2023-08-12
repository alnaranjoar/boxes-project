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

//little musicbox section
const littleCover = document.querySelector('.little-musicbox_img')
const littleSongName = document.querySelector('#song-name')
const littleArtist = document.querySelector('#artist')
const littlePlayBtn = document.querySelector('#little-play-button')
const littlePauseBtn = document.querySelector('#little-pause-button')

littlePlayBtn.addEventListener('click',playSong)
littlePauseBtn.addEventListener('click',pauseSong)

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
    littleCover.src = songs[songIndex].img
    songName.innerHTML = songs[songIndex].name
    littleSongName.innerHTML = songs[songIndex].name
    artist.innerHTML = songs[songIndex].artist
    littleArtist.innerHTML = songs[songIndex].artist
    audio.src = songs[songIndex].file
    songStart.innerHTML = '0:00'
    
    setTimeout(songTime,400)
}

function playSong() {
    intervalo = setInterval(songTimeUpdater,50)
    checkEnded = setInterval(automaticNextSong,50)
    audio.play()
    playButton.classList.add('hide')
    littlePlayBtn.classList.add('hide')
    pauseButton.classList.remove('hide')
    littlePauseBtn.classList.remove('hide')
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
    littlePlayBtn.classList.remove('hide')
    pauseButton.classList.add('hide')
    littlePauseBtn.classList.add('hide')
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
const months = ['January','Febrary','March','April','May','June','July','August','September','October','November','December']
const nextMonthBtn = document.querySelector('.calendar_next-month-btn')
const previousMonthBtn = document.querySelector('.calendar_previous-month-btn')
const calendarMonth = document.querySelector('.calendar_month')
const calendarYear = document.querySelector('.calendar_year')
const daysList = document.querySelector('#days-list')
const calendarInput = document.querySelector('.calendar-input')

let monthDates
let currentDay
let currentMonth
let currentYear
let prevMonthDays
let nextMonthDays

nextMonthBtn.addEventListener('click', changeToNextMonth)
previousMonthBtn.addEventListener('click', changeToPreviousMonth)

function initializeCalendar() {
    currentDate = new Date()
    currentDay = currentDate.getDate()
    currentMonth = currentDate.getMonth() + 1
    currentYear = currentDate.getFullYear()
    
    writeMonth()
   
    calendarMonth.innerHTML = months[currentMonth-1]
    calendarYear.innerHTML = currentYear

    monthDates.forEach(date => {
        if(date.innerText == currentDay) {
            date.classList.add('painted')
        }
    })
}

function updateCalendarInput() {
    let day = currentDay
    let month = currentMonth

    if (day < 10) {
        day = '0' + day
    } 

    if (month < 10) {
        month = '0' + month
    } 
    calendarInput.value = day + "/" + month + "/" + currentYear
}

function writeMonth() {
    
    let totalDays = getMonthDays(currentMonth)
    let start = startDay()
    let daysSuma
    let missingNextMonthDays
    
    daysList.innerHTML=""

    for (let i = start; i > 0; i--) {
        daysList.innerHTML += `<li class="calendar_date previous-month">${getMonthDays(currentMonth-1)-(i-1)}</li>`
    }
    
    for (let i = 1; i <= totalDays; i++) {
        i === 1 ? daysList.innerHTML += `<li class="calendar_date first-day">${i}</li>` : daysList.innerHTML += `<li class="calendar_date">${i}</li>`
    }

    daysSuma = start + totalDays
    missingNextMonthDays = (Math.ceil(daysSuma/7)*7)-daysSuma

    for (let i = 1; i <= missingNextMonthDays; i++) {
        daysList.innerHTML += `<li class="calendar_date next-month">${i}</li>`
    }

    monthDates = document.querySelectorAll('.calendar_date')
    prevMonthDays = document.querySelectorAll('.previous-month')
    nextMonthDays = document.querySelectorAll('.next-month')

    monthDates.forEach(date => {
        date.addEventListener('click',setNewDay)
    })

    prevMonthDays.forEach (day => {
        day.addEventListener('click',changeToPreviousMonth)
    })

    nextMonthDays.forEach(day => {
        day.addEventListener('click',changeToNextMonth)
    })

    changeColor()
    
}

function changeColor() {
    
    monthDates.forEach(date => {
        if((date.innerText == currentDay) && ((!date.classList.contains('previous-month')) && (!date.classList.contains('next-month')))) {
            date.classList.add('painted')
        }
    })

}

function setNewDay(event) {
    let day = event.target.innerText
    currentDay = day

    setNewDate()
}

function changeToPreviousMonth() {
    
    if (currentMonth !== 1) {
        currentMonth --
    } else {
        currentMonth = 12
        currentYear --
    }

    setNewDate()
}

function changeToNextMonth() {
    
    if (currentMonth !== 12) {
        currentMonth ++
    } else {
        currentMonth = 1
        currentYear ++
    }

    setNewDate()
}

function getMonthDays(currentMonth) {
    let totalDays = new Date (currentYear,currentMonth,0).getDate()
    return totalDays
}

function isLeap() {
    return (currentYear % 400 === 0) ? true : (currentYear % 100 === 0) ? false : currentYear % 4 === 0;
}

function startDay() {
    let monthStartDay = new Date(currentYear,currentMonth-1,1)
    return (monthStartDay.getDay())
}

function setNewDate() {
    
    currentDate = new Date(currentYear,currentMonth-1,currentDay)
    calendarMonth.innerHTML = months[currentMonth-1]
    calendarYear.innerHTML = currentYear

    updateCalendarInput()

    writeMonth()
}

window.addEventListener('load', initializeCalendar)
