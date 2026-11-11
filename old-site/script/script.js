'use strict';

// Slideshow implementation \\

// References
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_auto
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

document.addEventListener('DOMContentLoaded', function() {

    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const total = slides.length;

    if(slides.length > 0) {

    function showSlides() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % total;
        slides[currentSlide].classList.add('active');
    }

    setInterval(showSlides, 7000);
    } 
});


// Dropdown text implementation \\

document.addEventListener('DOMContentLoaded', function() {

const root = document.documentElement;

const buttons = document.querySelectorAll('.accordion-label');
buttons.forEach(button => {
    button.addEventListener("click", buttonClick)
});


function buttonClick(e){

    let btn = e.target;
    let correspondingBtn = btn.nextElementSibling;

    btn.classList.toggle('open');
    correspondingBtn.classList.toggle('open');

    root.style.setProperty('--content-height',
    btn.nextElementSibling.scrollHeight + 'px');
    


    buttons.forEach(element => {
        if(element != btn && element.classList.contains('open')){
            element.classList.remove('open');
            let elementCorrespondingBtn = element.nextElementSibling;
            elementCorrespondingBtn.classList.remove('open');
        }
    });

}
});

// Dropdown text implementation \\


document.addEventListener('DOMContentLoaded', function() {

const Days = document.getElementById('days');
const Hours = document.getElementById('hours');
const Minutes = document.getElementById('minutes');
const Seconds = document.getElementById('seconds');

const targetDate = new Date("2026-04-02T00:00:00").getTime();

function timer() {
    const currentDate = new Date().getTime();
    const timeUntil = targetDate - currentDate;

    const days = Math.floor(timeUntil / 1000 / 60 / 60 / 24);
    const hours = Math.floor(timeUntil / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(timeUntil / 1000 / 60 ) % 60;
    const seconds = Math.floor(timeUntil / 1000 ) % 60;

    Days.innerText = days;
    Hours.innerText = hours;
    Minutes.innerText = minutes;
    Seconds.innerText = seconds;




}
setInterval(timer, 1000);
});



// API 
// https://open-meteo.com/en/docs?temperature_unit=fahrenheit&precipitation_unit=inch&latitude=35.2271&longitude=-80.8431&forecast_days=1&wind_speed_unit=mph&daily=temperature_2m_max,wind_speed_10m_max,uv_index_max,sunset,rain_sum
// https://open-meteo.com/en/docs



async function getWeather(){
    const weatherBox = document.querySelector('.weatherBox');
    weatherBox.classList.add('clicked');

    try{
        const apiURL = 'https://api.open-meteo.com/v1/forecast?latitude=35.2271&longitude=-80.8431&daily=temperature_2m_max,wind_speed_10m_max,uv_index_max,sunset,rain_sum&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch';
        const res = await fetch(apiURL);
        const data = await res.json();

        const temperatureData = data.daily.temperature_2m_max[0];
        const rainData = data.daily.rain_sum[0];
        const windData = data.daily.wind_speed_10m_max[0];
        const uvData = data.daily.uv_index_max[0];

        weatherBox.innerHTML = `
            <p> The max temperature is: ${temperatureData} °F</p>
            <p> Inches of rain today: ${rainData} inches</p>
            <p> Max Wind Speed: ${windData} mph</p>
            <p> UV Index: ${uvData}</p>
        `;

    }catch(error){
        weatherBox.innerHTML=`<p> Unable to retreive data, try again later or check your local weather app </p>`;
    }

}

//check weather button click
document.addEventListener('DOMContentLoaded', function() {

const checkWeatherButton = document.getElementById('checkWeatherButton');
checkWeatherButton.addEventListener('click', getWeather);
});









