const searchForm = document.querySelector('.search-form');
const searchButton = document.querySelector('.submit-button');
const error = document.querySelector('.error-msg');
const container = document.querySelector('.container')

searchForm.addEventListener('submit', submit);
searchButton.addEventListener('submit', submit);

function submit(e) {
    e.preventDefault();
    getWeather();
    let degrees = document.querySelector('.degrees');
    degress.style.content = 'none'
}

//handle API key and error handling 
async function getData(location) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=fb67dc4a6b8726ed40bcbc7fb8b825f8`,
        {mode: 'cors',}
    );
    if(response.status === 404){
        throwError();
    }else{
        error.style.display = 'none';
        const weatherData = await response.json();
        const receivedData = processData(weatherData);
        showData(receivedData);
        reset();
    }
    return getData
}

function throwError() {
    error.style.display = 'block';
    error.classList.add('slide-up')
}

//collect data needed to display 
function processData(weatherData) {
    const myData = {
       // condition: weatherData.weather.description,
        feelsLike: weatherData.main.feels_like,
        currentTemp: weatherData.main.temp,
        wind: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        location: weatherData.name,
    }
    console.log(weatherData.weather.description)
    return myData;
}

function showData(receivedData) {
    const weatherDetails = document.querySelector('.weather-info');
    Array.from(weatherDetails).forEach((div) => {
        if(!div.classList.contains('slide-up')){
            div.offsetWidth;
            div.classList.add('slide-up');
        }
    });

    //logic for inputting received data
    document.querySelector('.condition').textContent = receivedData.condition;
    document.querySelector(
        '.weather-location').textContent = `${receivedData.location}`;
    document.querySelector('.degrees').textContent = `${receivedData.currentTemp}`;
    document.querySelector(
        '.feels-like'
    ).textContent = `FEELS LIKE: ${receivedData.feelsLike}`;
    document.querySelector('.wind-info').textContent = `WIND: ${receivedData.wind} MPH`;
    document.querySelector(
        '.humidity-info'
    ).textContent = `HUMIDITY: ${receivedData.humidity}`;
}


function reset() {
    searchForm.reset();
}
//obtain user location
function getWeather() {
    const userInput = document.querySelector('input[type="text"]').value;
    getData(userInput);
}

function changeMode() {
    let element = document.body;
    element.classList.toggle('dark-mode');
 }

const switchToggle = document.querySelector('input[type="checkbox"]')

switchToggle.addEventListener('click', (e) =>{
    e.preventDefault();
    changeMode();
})

 