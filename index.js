const monthDates = document.querySelectorAll('.calendar_date')
const months = ['January','Febrary','March','April','May','June','July','August','September','October','November','December']
const nextMonthBtn = document.querySelector('.calendar_next-month-btn')
const previousMonthBtn = document.querySelector('.calendar_previous-month-btn')
const calendarMonth = document.querySelector('.calendar_month')
const calendarYear = document.querySelector('.calendar_year')

let currentDay
let currentMonth
let currentYear

monthDates.forEach(date => {
    date.addEventListener('click',changeColor)
})

nextMonthBtn.addEventListener('click', changeToNextMonth)
previousMonthBtn.addEventListener('click', changeToPreviousMonth)

function initializeCalendar() {
    currentDate = new Date()
    currentDay = currentDate.getDate()
    currentMonth = currentDate.getMonth() + 1
    currentYear = currentDate.getFullYear()

    calendarMonth.innerHTML = months[currentMonth-1]
    calendarYear.innerHTML = currentYear

    monthDates.forEach(date => {
        if(date.innerText == currentDay) {
            date.classList.add('painted')
        }
    })
    //que cuando inicie el programa el calendario se cargue en el año, mes día en el que estamos.
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
    // cambiar al mes anterior al presionar el botón
}

function changeToNextMonth() {
    // cambiar al mes siguiente al presionar el botón
}

function getMonthDays() {

}

function isLeap() {
    return (currentYear % 400 === 0) ? true : (currentYear % 100 === 0) ? false : currentYear % 4 === 0;
}

function startDay() {
    let monthStartDay = new Date(currentYear,currentMonth,1)
    return (monthStartDay.getDay())
}

function lastMonth() {

}

function nextMonth(){

}

function setNewDate() {
    
}

window.addEventListener('load', initializeCalendar)