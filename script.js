const searchForm = document.querySelector('.search-form');
const searchButton = document.querySelector('.submit-button');
const error = document.querySelector('.error-msg');
const container = document.querySelector('.container')

searchForm.addEventListener('submit', submit);
searchButton.addEventListener('submit', submit);

function submit() {
    e.preventDefault();
    getWeather();
}

//handle API key and error handling 
async function getData(location){
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=a7ff76b92de774f6d574180419f69a35=${location}`,
        {mode: 'cors'}
    )
    if(response.status === 400){
        throwError();
    }else{
        error.display = 'none';
        const weatherData = await response.json();
        const receivedData = processData(weatherData);
        displayWeather(receivedData);
        reset();
    }
}

function throwError() {
    error.style.display = 'block';
    error.classList.add('slide-up')
}

//collect data needed to display 

function processData(weatherData){
    const data = {
        condition: weatherData.current.condition.text,
        feelsLike: {
            f: Math.round(weatherData.current.feelslike_f),
            c: Math.round(weatherData.current.feelslike_c),
        },
        currentTemperature: {
            f: Math.round(weatherData.current.temp_f),
            c: Math.round(weatherData.current.temp_c),
        },
        wind: Math.round(weatherData.current.wind_mph),
        humidity: weatherData.current.humidity,
        location: weatherData.location.name.toUpperCase(),
    };
    return data;
}

function showData(receivedData) {
    const weatherDetails = document.querySelector('weather-info');
    Array.from(weatherDetails).forEach((div) =>{
        if(!div.classList.contains('slide-up')){
            div.offsetWidth;
            div.classList.add('slide-up');
        }else{
            return
        }
    });
    //logic for inputting received data
    document.getElementById('condition').textContent = receivedData.condition;
    document.querySelector(
        '.weather-location').textContent = `${receivedData.location}, ${receivedData.region}`;
    document.querySelector('.degrees').textContent = receivedData.currentTemperature.f;
    document.querySelector(
        '.feels-like'
    ).textContent = `FEELS LIKE: ${receivedData.feelsLike.f}`;
    document.querySelector('.wind-info').textContent = `WIND: ${receivedData.WIND} MPH`;
    document.querySelector(
        '.humidity'
    ).textContent = `HUMIDITY: ${receivedData.humidity}`;
}


function reset() {
    form.reset();
}
//obtain user location
function getWeather() {
    const userInput = document.querySelector('input[type="text"]');
    const userLocationQuery = input.value;
    getData(userLocationQuery);
}
