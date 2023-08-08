const months = ['January','Febrary','March','April','May','June','July','August','September','October','November','December']
const nextMonthBtn = document.querySelector('.calendar_next-month-btn')
const previousMonthBtn = document.querySelector('.calendar_previous-month-btn')
const calendarMonth = document.querySelector('.calendar_month')
const calendarYear = document.querySelector('.calendar_year')
const daysList = document.querySelector('#days-list')

let monthDates
let currentDay
let currentMonth
let currentYear

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
    console.log(missingNextMonthDays)
    

    for (let i = 1; i <= missingNextMonthDays; i++) {
        daysList.innerHTML += `<li class="calendar_date next-month">${i}</li>`
    }

    monthDates = document.querySelectorAll('.calendar_date')

    monthDates.forEach(date => {
        date.addEventListener('click',changeColor)
    })
}

function changeColor(event) {
    event.target.classList.toggle('painted')
    let day = event.target.innerText
    monthDates.forEach(date => {
        if(date.innerText != day) {
            date.classList.remove('painted')
        }
    })
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

function lastMonth() {

}

function nextMonth(){

}

function setNewDate() {
    calendarMonth.innerHTML = months[currentMonth-1]
    calendarYear.innerHTML = currentYear

    writeMonth()
}

window.addEventListener('load', initializeCalendar)