const rangeSlider = document.querySelector("#range-slider")

rangeSlider.addEventListener('input',progressScript)

function progressScript() {
    const sliderValue = rangeSlider.value;
    rangeSlider.style.background = `linear-gradient(to right, #8643FF ${sliderValue}%, #D8D8D8 ${sliderValue}%)`
}

progressScript()