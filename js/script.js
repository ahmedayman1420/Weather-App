// =========================== ------------- ===========================//
// ======----====== // <---->  Variables Declartion  <----> // ======----====== //
// =========================== ------------- ===========================//

var locationInput = document.getElementById('location');
var findBtn = document.getElementById('find');

var cdayInput = document.getElementById('cday');
var cdateInput = document.getElementById('cdate');

var currentWeatherContainer = document.querySelector('.current-weather-container');
var tomorrowWeatherContainer = document.querySelector('.tomorrow-weather-container');
var afterTomorrowWeatherContainer = document.querySelector('.after-tomorrow-weather-container');

const d = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const toDay = days[d.getDay()];
const currentDate = `${d.getDate()}  ${months[d.getMonth()]}`;
const tomorrow = days[(d.getDay() + 1) % 7];
const afterTomorrow = days[(d.getDay() + 2) % 7];

const initialLocation = 'Cairo';

// =========================== ------------- ===========================//
// ======----====== // <---->  End  <----> // ======----====== //
// =========================== ------------- ===========================//


// =========================== ------------- ===========================//
// ======----====== // <---->  System Functions  <----> // ======----====== //
// =========================== ------------- ===========================//


// ======----====== // <---->  Get Current Weather  <----> // ======----====== //
async function getCurrentWeather(location) {

    let data = await fectchCurrentWeather(location);
    let tomorrowData = await fectchTomorrowWeather(location);

    console.log('data', data);
    console.log('tomorrowData', tomorrowData);

    if (data && tomorrowData) {
        displayCurrent(data);
        displayTomorrow(tomorrowData);
        displayAfterTomorrow(tomorrowData);

        cdayInput.innerHTML = toDay;
        cdateInput.innerHTML = currentDate;
    }
};
getCurrentWeather(initialLocation);

// ======----====== // <---->  Fetch Current Weather  <----> // ======----====== //
async function fectchCurrentWeather(location) {
    let data = await fetch(`http://api.weatherapi.com/v1/current.json?key=25e3bb63ce7048af80b73452221902%20&q=${location}`);
    data = await data.json();
    return data;
};


// ======----====== // <---->  Fetch Tomorrow Weather  <----> // ======----====== //
async function fectchTomorrowWeather(location) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=25e3bb63ce7048af80b73452221902&q=${location}&days=3&aqi=no&alerts=no`);
    data = await data.json();
    return data;
};


// ======----====== // <---->  Display Current Weather  <----> // ======----====== //
function displayCurrent(weather) {
    let data = `
    <p id="location">${weather.location.name}</p>
    <div class="row">
        <div class="col-md-8">
            <p id="temp">${weather.current.temp_c} <sup>o</sup>C</p>
        </div>
        <div class="col-md-3 d-flex align-items-center justify-content-center">
            <img class=" w-100" src="http:${weather.current.condition.icon}" alt="">
        </div>
    </div>
    <p id="status">${weather.current.condition.text}</p>
    `;

    currentWeatherContainer.innerHTML = data;
};

// ======----====== // <---->  Display Tomorrow Weather  <----> // ======----====== //
function displayTomorrow(weather) {
    let data = `
    <div class="date text-center text-white p-2">
        <p >${tomorrow}</p>
    </div>
    <div class=" text-white text-center pb-3">
        <img class="" src="http:${weather.forecast.forecastday[1].day.condition.icons}" alt="">
        <p class="max-temp">${weather.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
        <p class="min-temp">${weather.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
        <p class="stat">${weather.forecast.forecastday[1].day.condition.text}</p>
    </div>

    `;

    tomorrowWeatherContainer.innerHTML = data;
};

// ======----====== // <---->  Display After Tomorrow Weather  <----> // ======----====== //
function displayAfterTomorrow(weather) {
    let data = `
    <div class="date text-center text-white p-2 ">
        <p >${afterTomorrow}</p>
    </div>
    <div class=" text-white text-center pb-3">
        <img class="" src="http:${weather.forecast.forecastday[2].day.condition.icons}" alt="">
        <p class="max-temp">${weather.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
        <p class="min-temp">${weather.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
        <p class="stat">${weather.forecast.forecastday[2].day.condition.text}</p>
    </div>

    `;

    afterTomorrowWeatherContainer.innerHTML = data;
};

// =========================== ------------- ===========================//
// ======----====== // <---->  End  <----> // ======----====== //
// =========================== ------------- ===========================//




// =========================== ------------- ===========================//
// ======----====== // <---->  Relate BTN With Function  <----> // ======----====== //
// =========================== ------------- ===========================//


// ======----====== // <---->  Assign Function To (Find) Btn  <----> // ======----====== //
findBtn.addEventListener('click', function() {
    getCurrentWeather(locationInput.value);
});


// ======----====== // <---->  Assign Function To (Find) Btn  <----> // ======----====== //
locationInput.addEventListener('keyup', function() {
    if (locationInput.value == '') {
        findBtn.setAttribute('disabled', 'disabled');

    } else {
        findBtn.removeAttribute('disabled');
    }
});

// =========================== ------------- ===========================//
// ======----====== // <---->  End  <----> // ======----====== //
// =========================== ------------- ===========================//